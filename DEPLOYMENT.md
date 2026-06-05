# EasyChoose Deployment Guide for Hostinger

This guide will help you deploy your EasyChoose e-commerce website to Hostinger.

## Prerequisites

1. A Hostinger account with hosting plan
2. Node.js installed on your local machine
3. Supabase project (already configured)
4. Git installed

## Step 1: Build the Project

Before deploying, you need to build the project for production:

```bash
# Install dependencies (if not already installed)
pnpm install

# Build the project
pnpm build
```

This will create a `dist` folder with your production-ready files.

## Step 2: Deploy Supabase Edge Function

Your authentication system uses a Supabase Edge Function. Deploy it before deploying the frontend:

1. Install Supabase CLI (if not installed):
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link to your project:
   ```bash
   supabase link --project-ref nrzycbxdgzuyyyhorbhs
   ```

4. Deploy the function:
   ```bash
   supabase functions deploy make-server-c776dae1
   ```

## Step 3: Upload to Hostinger

### Option A: Using File Manager (Recommended for beginners)

1. Log in to your Hostinger control panel (hPanel)
2. Navigate to **File Manager**
3. Go to the `public_html` directory (or your website's root directory)
4. Delete any existing files in the directory
5. Upload all files from your `dist` folder to `public_html`
6. Make sure the file structure looks like this:
   ```
   public_html/
   ├── assets/
   ├── index.html
   └── other files...
   ```

### Option B: Using FTP

1. Get your FTP credentials from Hostinger hPanel
2. Use an FTP client like FileZilla
3. Connect to your Hostinger server
4. Navigate to `public_html`
5. Upload all files from your `dist` folder

### Option C: Using Git (Advanced)

1. In Hostinger hPanel, go to **Git**
2. Click **Create New Repository**
3. Connect your GitHub/GitLab repository
4. Set the deployment path to `public_html`
5. Configure auto-deployment on push

## Step 4: Configure URL Routing

Since this is a React Router application with client-side routing, you need to configure URL rewriting:

1. In your `public_html` directory, create or edit the `.htaccess` file
2. Add the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>
```

This ensures that all routes (like `/login`, `/register`) work correctly.

## Step 5: Verify Deployment

1. Visit your domain in a web browser
2. Test the following features:
   - Home page loads correctly
   - Navigation works
   - Registration creates new accounts
   - Login authenticates users
   - Images display properly

## Important Notes

### Supabase Configuration

- Your Supabase project ID: `nrzycbxdgzuyyyhorbhs`
- The frontend connects to: `https://nrzycbxdgzuyyyhorbhs.supabase.co`
- Edge function URL: `https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1`

### Security Considerations

⚠️ **Important Security Notes:**

1. **This is a prototype**: The current setup is designed for demonstration and prototyping. For production use with real customer data, you should:
   - Implement additional security measures
   - Set up proper email verification
   - Add rate limiting
   - Implement CAPTCHA on forms
   - Use environment variables for sensitive data
   - Set up proper CORS policies

2. **Supabase Settings**: In your Supabase dashboard:
   - Go to Authentication > URL Configuration
   - Add your Hostinger domain to the allowed redirect URLs
   - Configure email templates for verification emails

3. **Row Level Security (RLS)**: Consider enabling RLS in Supabase for additional data protection

### Troubleshooting

**Issue: Pages return 404 errors**
- Solution: Check that the `.htaccess` file is properly configured

**Issue: Login/Register not working**
- Solution: Verify Supabase Edge Function is deployed
- Check browser console for CORS errors

**Issue: Images not loading**
- Solution: Check that images are in the `dist/assets` folder
- Verify file paths are correct

**Issue: Blank page after deployment**
- Solution: Check browser console for errors
- Verify all files uploaded correctly

## Updating the Website

When you make changes to your website:

1. Make your changes locally
2. Test thoroughly
3. Run `pnpm build` to create a new production build
4. Upload the new `dist` folder contents to Hostinger
5. Clear browser cache to see changes

## Support

For Hostinger-specific issues, contact Hostinger support.
For Supabase issues, check the Supabase documentation or dashboard.

## Domain Configuration

If using a custom domain:
1. Update DNS settings in your domain registrar
2. Point A record to Hostinger's IP address
3. Wait for DNS propagation (can take 24-48 hours)
4. Update allowed URLs in Supabase dashboard
