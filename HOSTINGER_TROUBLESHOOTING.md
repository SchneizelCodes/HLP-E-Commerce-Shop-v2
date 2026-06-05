# Hostinger 403 Forbidden Error - Troubleshooting Guide

If you're seeing **403 Forbidden** error when accessing your domain, follow these steps:

## 🔧 Step 1: Check File Permissions (Most Common Issue)

1. Log into **Hostinger hPanel**
2. Go to **File Manager**
3. Navigate to **public_html**
4. Check file permissions:
   - **Files**: Should be `644`
   - **Directories**: Should be `755`

### To Fix Permissions:

1. Right-click on `public_html` folder
2. Select **Properties** or **Change Permissions**
3. For all files inside, set to `644`
4. For all directories, set to `755`
5. Check the box **Apply to all files and directories**
6. Click **Change**

⚠️ **If you see an error about "chmod"**, this means permissions cannot be changed via File Manager. Try via terminal/SSH or skip to Step 2.

---

## 🔧 Step 2: Check .htaccess Configuration

1. Verify `.htaccess` is present in `public_html`
2. If missing, upload it from your `dist/.htaccess`

### Test with Basic .htaccess (If still getting 403):

If the issue persists, temporarily try this minimal .htaccess:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

Save this as `.htaccess` and upload to `public_html`.

---

## 🔧 Step 3: Verify index.html is Accessible

1. Try accessing your domain with the file directly:
   - `https://yourdomain.com/index.html` (should work)
   - `https://yourdomain.com/` (should show home page)

2. If `index.html` returns 403:
   - The file permissions are incorrect (go back to Step 1)
   - Or the PHP version has restrictions (go to Step 4)

---

## 🔧 Step 4: Check PHP Configuration (Hostinger Specific)

Some Hostinger plans restrict certain file types or PHP access:

1. Go to **hPanel** → **Website** → **PHP Settings**
2. Check your PHP version (should be 7.4 or higher)
3. If you see restrictions on `.html` files, contact Hostinger support

---

## 🔧 Step 5: Clear Browser Cache

Sometimes the 403 error is cached:

1. **Hard refresh** your browser:
   - Windows: `Ctrl + Shift + Delete`
   - Mac: `Cmd + Shift + Delete`
2. Or use **Incognito/Private** mode to test

---

## 🔧 Step 6: Enable Mod_Rewrite Module

If your .htaccess still doesn't work:

1. Go to **hPanel** → **Website** → **.htaccess Editor**
2. Create a new .htaccess with this content:

```apache
# Enable rewrite
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# Rewrite to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

3. Save and test

---

## 📋 Complete Troubleshooting Checklist

- [ ] Verified `.htaccess` is in `public_html`
- [ ] Set file permissions to `644`
- [ ] Set directory permissions to `755`
- [ ] Can access `yourdomain.com/index.html` directly
- [ ] Cleared browser cache
- [ ] Tested with incognito/private mode
- [ ] Checked `.htaccess` has no syntax errors
- [ ] PHP version is 7.4 or higher
- [ ] Mod_rewrite is enabled

---

## 🆘 Still Getting 403? Advanced Troubleshooting

### Check if Rewrite Module is Enabled:

Add this to your `.htaccess`:

```apache
# Diagnostics
<IfModule mod_rewrite.c>
  # This should NOT return 403 if mod_rewrite is working
</IfModule>
```

### Check htaccess Syntax:

Validate your `.htaccess` using an [Apache .htaccess validator online](https://www.htaccesscheck.com/)

### Try Alternative .htaccess:

If the above doesn't work, try this alternative configuration:

```apache
Options +FollowSymLinks
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Contact Hostinger Support:

If nothing works, contact **Hostinger Support** and mention:
- You have a React SPA application
- You're getting 403 Forbidden
- You need `.htaccess` mod_rewrite enabled
- Your domain: `yourdomain.com`

They can enable server-level rewrites if needed.

---

## ✅ When It's Working

You should see:
- ✅ Home page loads without 403 error
- ✅ Navigation (like `/login`, `/register`) works
- ✅ Images display correctly
- ✅ No console errors in browser DevTools

---

## 🆘 If Login/Register Not Working

Even if the homepage works, authentication might fail if:

1. **Supabase Domain Not Configured**:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Authentication → URL Configuration
   - Add your domain:
     - Site URL: `https://yourdomain.com`
     - Redirect URLs: `https://yourdomain.com/*`

2. **CORS Error** (check browser console):
   - Ensure Supabase Edge Function is deployed
   - Verify function URL is correct in your build

3. **Network Error** (check browser console):
   - Try accessing Edge Function directly:
   ```
   https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1/health
   ```

---

## 📞 Need More Help?

Contact these resources:
- **Hostinger Support**: https://support.hostinger.com
- **Supabase Docs**: https://supabase.com/docs
- **Apache .htaccess Guide**: https://httpd.apache.org/docs/current/mod/mod_rewrite.html

---

**Last Updated**: June 5, 2026
