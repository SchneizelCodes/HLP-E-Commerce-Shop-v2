# Supabase Setup Guide

This document explains how to properly configure and use Supabase with your project for both local development and Hostinger deployment.

## Overview

Your project uses Supabase for:
- User authentication (Registration & Login)
- Edge Functions for backend logic
- Potential future database operations

## Current Setup

### Supabase Project Details
- **Project ID**: `nrzycbxdgzuyyyhorbhs`
- **Project URL**: `https://nrzycbxdgzuyyyhorbhs.supabase.co`
- **Region**: Check your Supabase dashboard for the region

### Authentication Flow
The project uses custom authentication through Supabase Edge Functions:
1. User submits credentials (email, password, name)
2. Frontend calls the `make-server-c776dae1` Edge Function
3. Edge Function handles user registration/login
4. Session tokens are stored in localStorage
5. Authenticated requests include the access token

## Environment Configuration

### Local Development

Your project uses environment variables for Supabase configuration. The file `.env.local` is already created with credentials.

**File**: `.env.local`
```
VITE_SUPABASE_URL=https://nrzycbxdgzuyyyhorbhs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_FUNCTION_URL=https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1
```

**Note**: `.env.local` is added to `.gitignore` and should NOT be committed to version control.

### Production (Hostinger)

The `.env.production` file contains the production Supabase configuration. During the build process (`pnpm build`), Vite will use this file.

**File**: `.env.production`
```
VITE_SUPABASE_URL=https://nrzycbxdgzuyyyhorbhs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_FUNCTION_URL=https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1
```

## Using Supabase in Your Application

### Authentication Client (Recommended)

The authentication is handled through `src/utils/supabase/client.ts` which provides these methods:

```typescript
import { authClient } from '@/utils/supabase/client';

// Sign up
const result = await authClient.signUp({
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe'
});

// Login
const result = await authClient.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
const user = authClient.getStoredUser();

// Check if authenticated
const isAuth = authClient.isAuthenticated();

// Logout
authClient.logout();
```

### Direct Supabase Client (For Advanced Use)

For direct database operations, use the Supabase client in `src/utils/supabase/supabaseClient.ts`:

```typescript
import { supabase } from '@/utils/supabase/supabaseClient';

// Example: Query data
const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

## Deploying Supabase Edge Functions

Before deploying to Hostinger, ensure your Supabase Edge Function is deployed:

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Authenticate with Supabase

```bash
supabase login
```

### 3. Link to Your Project

```bash
supabase link --project-ref nrzycbxdgzuyyyhorbhs
```

### 4. Deploy the Edge Function

```bash
supabase functions deploy make-server-c776dae1
```

### 5. Verify Deployment

Test the health check endpoint:
```bash
curl https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1/health
```

Expected response:
```json
{"status":"ok"}
```

## Security Considerations

### 1. Anon Key vs Service Role Key

- **Anon Key** (used in frontend): Limited permissions, safe to expose
- **Service Role Key**: Full admin access, NEVER expose in frontend

### 2. URL Configuration in Supabase

You must add your Hostinger domain to allowed URLs in Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Add your Hostinger domain to:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/*`

### 3. CORS Settings

Supabase automatically handles CORS for Edge Functions. If you encounter CORS errors:

1. Check the Edge Function has proper CORS headers
2. Check Supabase project settings for allowed origins
3. Review browser console for detailed error messages

### 4. Token Management

The authentication system stores tokens in localStorage:
- `access_token`: Short-lived JWT for authenticated requests
- `refresh_token`: Used to refresh access token when expired
- `user`: Cached user information

**Security Notes**:
- Tokens persist across browser sessions
- Implement token refresh logic for long sessions
- Clear tokens on logout

## Troubleshooting

### Issue: "Supabase URL or Key is missing"

**Solution**: 
- Check `.env.local` file exists with correct values
- Ensure Vite is running in development mode
- Try restarting `pnpm dev`

### Issue: CORS Errors

**Solution**:
- Verify Supabase project URL in environment variables
- Check the Edge Function has CORS middleware enabled
- Check your domain is added to Supabase URL Configuration

### Issue: Authentication Fails

**Solution**:
- Check if Edge Function is deployed: `supabase functions deploy make-server-c776dae1`
- Verify Edge Function endpoint in `.env.local`
- Check browser console for specific error messages
- Check Supabase Edge Function logs in the dashboard

### Issue: Token Expires After Deployment

**Solution**:
- This is expected if using short token expiration
- Implement token refresh logic
- Consider increasing token expiration in Edge Function

## Production Deployment Checklist

Before deploying to Hostinger:

- [ ] Edge Function is deployed (`supabase functions deploy make-server-c776dae1`)
- [ ] Edge Function health check passes
- [ ] `.env.production` has correct Supabase credentials
- [ ] Project builds successfully (`pnpm build`)
- [ ] All files from `dist/` folder are uploaded to Hostinger
- [ ] `.htaccess` file is in `public_html/` directory
- [ ] Domain is added to Supabase URL Configuration
- [ ] Test registration and login on production domain
- [ ] Browser console shows no authentication errors

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase Authentication](https://supabase.com/docs/guides/auth)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

## Next Steps

1. Install dependencies: `pnpm install`
2. Start development: `pnpm dev`
3. Test authentication locally
4. Deploy to Hostinger (see DEPLOYMENT.md)
