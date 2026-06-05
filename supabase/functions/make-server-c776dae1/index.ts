import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.ts";

const app = new Hono();

// Create Supabase client with service role for admin operations
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Create Supabase client for user operations
const getSupabaseClient = (authToken?: string) => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    authToken ? {
      global: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    } : undefined
  );
};

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint (public)
app.get("/health", (c) => {
  try {
    return c.json({ status: "ok" });
  } catch (error) {
    console.log("Health check error:", error);
    return c.json({ status: "ok" }, 200);
  }
});

// User signup endpoint
app.post("/signup", async (c) => {
  try {
    const { email, password, firstName, lastName } = await c.req.json();

    if (!email || !password || !firstName || !lastName) {
      return c.json({ error: "Missing required fields: email, password, firstName, lastName" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
      },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true,
    });

    if (error) {
      console.log("Signup error:", error);
      return c.json({ error: `Failed to create user: ${error.message}` }, 400);
    }

    return c.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.log("Signup exception:", error);
    return c.json({ error: `Server error during signup: ${error.message}` }, 500);
  }
});

// User login endpoint
app.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Missing required fields: email, password" }, 400);
    }

    const supabase = getSupabaseClient();

    // Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login error:", error);
      return c.json({ error: `Login failed: ${error.message}` }, 401);
    }

    if (!data.session) {
      return c.json({ error: "Login failed: No session created" }, 401);
    }

    return c.json({
      success: true,
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.user_metadata?.firstName,
        lastName: data.user.user_metadata?.lastName,
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      },
    });
  } catch (error) {
    console.log("Login exception:", error);
    return c.json({ error: `Server error during login: ${error.message}` }, 500);
  }
});

// Check authentication status
app.get("/me", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: "Unauthorized: No access token provided" }, 401);
    }

    const supabase = getSupabaseClient(accessToken);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log("Auth check error:", error);
      return c.json({ error: "Unauthorized: Invalid or expired token" }, 401);
    }

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.user_metadata?.firstName,
        lastName: user.user_metadata?.lastName,
      },
    });
  } catch (error) {
    console.log("Auth check exception:", error);
    return c.json({ error: `Server error during auth check: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);
