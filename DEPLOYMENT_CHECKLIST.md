# HealthyLifePhil Deployment Checklist

Use this checklist to ensure a smooth deployment to Hostinger.

## Pre-Deployment

- [ ] All features tested locally
- [ ] Registration working with Supabase
- [ ] Login working with Supabase
- [ ] All pages load correctly
- [ ] Images displaying properly
- [ ] Navigation and routing working

## Supabase Setup

- [ ] Supabase Edge Function deployed
  ```bash
  supabase functions deploy make-server-c776dae1
  ```
- [ ] Test Edge Function endpoints:
  - [ ] `/make-server-c776dae1/health` returns `{"status":"ok"}`
  - [ ] `/make-server-c776dae1/signup` accepts POST requests
  - [ ] `/make-server-c776dae1/login` accepts POST requests

## Build Process

- [ ] Dependencies installed
  ```bash
  pnpm install
  ```
- [ ] Production build created
  ```bash
  pnpm build
  ```
- [ ] `dist` folder generated successfully
- [ ] No build errors or warnings

## Hostinger Upload

- [ ] Logged into Hostinger hPanel
- [ ] Navigated to File Manager
- [ ] Cleared `public_html` directory
- [ ] Uploaded all files from `dist` folder
- [ ] `.htaccess` file present in `public_html`
- [ ] File permissions set correctly (644 for files, 755 for directories)

## Configuration

- [ ] `.htaccess` file configured for React Router
- [ ] Domain/subdomain pointing to correct directory
- [ ] SSL certificate installed (HTTPS enabled)

## Supabase Dashboard Configuration

- [ ] Login to Supabase dashboard
- [ ] Navigate to Authentication > URL Configuration
- [ ] Add production domain to Site URL
- [ ] Add production domain to Redirect URLs
  - Example: `https://yourdomain.com/**`
- [ ] Save settings

## Post-Deployment Testing

Visit your live website and test:

- [ ] Home page loads
- [ ] Logo and branding correct (HLP / HealthyLifePhil)
- [ ] Navigation menu works
- [ ] Sidebar opens/closes
- [ ] Category dropdown works
- [ ] Search bar functional
- [ ] Carousel auto-rotates
- [ ] Left/right arrow buttons work
- [ ] All navigation links work
- [ ] Footer displays correctly

### Registration Flow

- [ ] Navigate to `/register`
- [ ] Fill out registration form
- [ ] Submit form
- [ ] Check for success message
- [ ] Verify redirect to login page
- [ ] Check Supabase dashboard for new user

### Login Flow

- [ ] Navigate to `/login`
- [ ] Enter registered credentials
- [ ] Submit form
- [ ] Check for successful login
- [ ] Verify redirect to home page
- [ ] Check browser localStorage for token

### Authentication State

- [ ] Logged-in users see correct account state
- [ ] Logout works (if implemented)
- [ ] Session persists on page reload

## Browser Testing

Test on multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS/Android)

## Performance Check

- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] No 404 errors in Network tab

## Security Verification

- [ ] HTTPS enabled (green padlock)
- [ ] No API keys exposed in frontend code
- [ ] Supabase service role key NOT in frontend
- [ ] Only public anon key used in frontend

## Common Issues to Check

- [ ] If routes return 404, verify `.htaccess` configuration
- [ ] If images missing, check file paths in `dist/assets`
- [ ] If auth fails, verify Supabase function deployed
- [ ] If blank page, check browser console for errors

## Final Steps

- [ ] Clear browser cache and test
- [ ] Test on mobile device
- [ ] Share link with test users for feedback
- [ ] Monitor Supabase dashboard for errors
- [ ] Set up monitoring/analytics (optional)

## Rollback Plan

If deployment fails:
- [ ] Keep previous version backup
- [ ] Document what went wrong
- [ ] Restore previous `public_html` contents if needed
- [ ] Contact Hostinger support if server issues

---

**Deployment Date:** _________________

**Deployed By:** _________________

**Domain/URL:** _________________

**Notes:** 
_________________________________________
_________________________________________
_________________________________________
