# Quick Start: Deploy to Hostinger

This is a quick reference for deploying your Supabase + React project to Hostinger.

## 1️⃣ Install Dependencies

```bash
cd c:\Users\joshu\Documents\GitHub\Healthylifephil
pnpm install
```

## 2️⃣ Deploy Supabase Edge Function

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref nrzycbxdgzuyyyhorbhs

# Deploy the Edge Function
supabase functions deploy make-server-c776dae1

# Verify it's working
curl https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1/health
```

## 3️⃣ Build for Production

```bash
pnpm build
```

This creates a `dist/` folder with your production-ready files.

## 4️⃣ Upload to Hostinger

### Via File Manager (Easiest)

1. Login to Hostinger hPanel
2. Go to **File Manager**
3. Navigate to `public_html` directory
4. Delete existing files
5. Upload all files from your `dist/` folder
6. Done! ✅

### Via FTP

1. Use FileZilla or similar FTP client
2. Connect with Hostinger FTP credentials
3. Navigate to `public_html`
4. Upload all files from `dist/` folder

## 5️⃣ Configure URL Routing

The `.htaccess` file has been created in your project root. When you upload to Hostinger:

1. Make sure `.htaccess` is copied to `public_html/`
2. This enables React Router to work correctly
3. All routes will work without 404 errors

## 6️⃣ Configure Supabase

In your Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Add your Hostinger domain:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/*`
3. Save and you're done!

## 7️⃣ Test Your Deployment

1. Visit your domain
2. Test the following:
   - ✅ Home page loads
   - ✅ Navigation works
   - ✅ Registration works
   - ✅ Login works
   - ✅ Images display

## ❌ Troubleshooting

### Pages showing 404 errors
- Verify `.htaccess` was uploaded to `public_html`
- Check it's correctly configured

### Login/Register not working
- Verify Edge Function is deployed
- Check browser console for errors
- Verify domain is in Supabase URL Configuration

### Environment Variables Not Loading
- Ensure `.env.production` has correct credentials
- Rebuild with `pnpm build`
- Re-upload files

## 📝 Files Created/Modified

✅ **Dependencies Added**:
- `@supabase/supabase-js`

✅ **Configuration Files**:
- `.env.local` - Local development
- `.env.production` - Production deployment
- `.env.example` - Template

✅ **Setup Files**:
- `.htaccess` - React Router routing for Hostinger
- `vite.config.ts` - Build optimization

✅ **Supabase Files**:
- `src/utils/supabase/supabaseClient.ts` - New Supabase client
- `utils/supabase/info.tsx` - Updated to use environment variables

✅ **Documentation**:
- `SUPABASE_SETUP.md` - Complete Supabase guide
- `DEPLOYMENT.md` - Deployment instructions (already existed)
- `DEPLOYMENT_CHECKLIST.md` - Deployment checklist (already existed)

## 🚀 Ready to Deploy?

Run these commands:

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Your files are ready in the 'dist' folder!
```

Then upload the contents of `dist/` to Hostinger's `public_html/` folder.

Good luck! 🎉
