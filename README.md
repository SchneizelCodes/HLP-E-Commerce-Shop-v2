# HealthyLifePhil E-Commerce Platform

https://hlpshop.vercel.app

## Tech Stack

- **Frontend**: React 18.3.1 + TypeScript
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4.1
- **Backend**: Supabase (Auth + Database)
- **Build Tool**: Vite 6.3
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (or npm/yarn)
- Supabase account

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
# (Note: The dev server is managed by Figma Make in this environment)
```

### Building for Production

```bash
# Create production build
pnpm build
```

This generates a `dist` folder ready for deployment.

## Project Structure

```
healthylifephil/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Layout.tsx          # Header, Footer, Sidebar
│   │   │   └── figma/
│   │   │       └── ImageWithFallback.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Home page with carousel
│   │   │   ├── Login.tsx           # Login page
│   │   │   └── Register.tsx        # Registration page
│   │   ├── App.tsx                 # Main app component
│   │   └── routes.tsx              # Route configuration
│   ├── utils/
│   │   └── supabase/
│   │       ├── client.ts           # Supabase auth client
│   │       └── info.tsx            # Project config (auto-generated)
│   ├── imports/                    # Product images
│   └── styles/                     # CSS files
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx           # Edge function with auth endpoints
│           └── kv_store.tsx        # Key-value store (auto-generated)
├── public/
│   └── .htaccess                   # Apache config for routing
└── DEPLOYMENT.md                   # Deployment guide
```

## Authentication System

The app uses Supabase for authentication:

### Register New User
- Endpoint: `POST /make-server-c776dae1/signup`
- Creates user account with email, password, first name, last name
- Auto-confirms email (email server not configured)

### Login
- Endpoint: `POST /make-server-c776dae1/login`
- Returns access token and user data
- Token stored in localStorage

### Protected Routes
- Uses access token in Authorization header
- Session persists across page reloads

## Deployment

### Quick Deployment to Hostinger

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Deploy Supabase Edge Function:**
   ```bash
   supabase login
   supabase link --project-ref nrzycbxdgzuyyyhorbhs
   supabase functions deploy make-server-c776dae1
   ```

3. **Upload to Hostinger:**
   - Upload all files from `dist/` folder to `public_html/`
   - Ensure `.htaccess` is uploaded for routing

4. **Configure Supabase:**
   - Add your domain to allowed URLs in Supabase dashboard
   - Authentication > URL Configuration

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Environment

- **Supabase Project ID**: `nrzycbxdgzuyyyhorbhs`
- **API Base URL**: `https://nrzycbxdgzuyyyhorbhs.supabase.co/functions/v1/make-server-c776dae1`

## Key Features Explained

### Carousel
- Auto-rotates every 5 seconds
- Manual navigation with arrow buttons
- Smooth fade transitions

### Search
- Real-time product search
- Dropdown results
- Filters by product name

### Categories
- Massage Chair
- Mechanical Pony

### Responsive Design
- Mobile-first approach
- Sidebar navigation on mobile
- Adaptive layouts

## Security Notes

⚠️ **Important**: This application is designed for prototyping and demonstration purposes. For production use with real customer data:

- Implement additional security measures
- Set up email verification
- Add rate limiting
- Implement CAPTCHA
- Enable Row Level Security (RLS) in Supabase
- Use environment variables for sensitive data
- Set up proper CORS policies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS/Android)

## Troubleshooting

**Issue: Login/Register not working**
- Verify Supabase Edge Function is deployed
- Check browser console for errors
- Verify network requests in DevTools

**Issue: Routes return 404**
- Ensure `.htaccess` is properly configured
- Check that all `dist` files are uploaded

**Issue: Images not loading**
- Verify images are in `dist/assets/` folder
- Check file paths and names

## Contributing

This is a prototype project. For production use, consider:
- Adding unit tests
- Implementing error boundaries
- Adding loading states
- Implementing proper error handling
- Setting up monitoring and analytics

## License

Private project - All rights reserved

## Support

For issues related to:
- **Hosting**: Contact Hostinger support
- **Backend**: Check Supabase documentation
- **Code**: Review deployment guides

---

**Project**: HealthyLifePhil  
**Version**: 0.0.1  
**Last Updated**: June 2026
