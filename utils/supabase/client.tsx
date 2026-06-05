import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "./info";
 
// Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
// Auth helper used by Register and Login pages
export const authClient = {
  /**
   * Sign up a new user.
   * 1. Creates a Supabase Auth account (email + password).
   * 2. Inserts a row into the `profiles` table with first/last name.
   */
  async signUp({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ success: boolean; error?: string }> {
    // Step 1: Create the auth user
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // These go into auth.users.raw_user_meta_data
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
      },
    });
 
    if (authError) {
      return { success: false, error: authError.message };
    }
 
    if (!data.user) {
      return { success: false, error: "User creation failed. Please try again." };
    }
 
    // Step 2: Insert into profiles table
    // This assumes you have a `profiles` table with these columns:
    //   id uuid references auth.users(id) on delete cascade,
    //   first_name text,
    //   last_name text,
    //   email text,
    //   created_at timestamptz default now()
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      first_name: firstName,
      last_name: lastName,
      email,
    });
 
    if (profileError) {
      // Auth user was created but profile insert failed — log it but don't block
      console.error("Profile insert error:", profileError.message);
      // Still consider registration successful since auth account exists
    }
 
    return { success: true };
  },
 
  /**
   * Sign in an existing user with email + password.
   */
  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
 
    if (error) {
      return { success: false, error: error.message };
    }
 
    return { success: true };
  },
 
  /**
   * Sign out the current user.
   */
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },
 
  /**
   * Get the currently logged-in user (or null).
   */
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },
};