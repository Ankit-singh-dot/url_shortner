# Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [x] TypeScript compilation working (`npm run build`)
- [x] All environment variables documented in `env.example`
- [x] CORS configuration updated for production
- [x] Health check endpoint added
- [x] Proper error handling implemented
- [x] Logging configured for production

### 2. Database Setup
- [ ] PostgreSQL database provisioned (Railway, Supabase, Neon, etc.)
- [ ] Database connection string ready
- [ ] Prisma migrations tested locally
- [ ] Database schema deployed to production

### 3. Environment Variables
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `JWT_SECRET` - Strong secret key (32+ characters)
- [ ] `FRONTEND_URL` - Your frontend domain
- [ ] `NODE_ENV` - Set to "production"

## 🚀 Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

### Step 4: Configure Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all required environment variables

### Step 5: Deploy Database
```bash
npx prisma migrate deploy
```

## 🚂 Railway Deployment

### Step 1: Connect Repository
1. Go to Railway Dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### Step 2: Configure Environment Variables
1. Go to Variables tab
2. Add all required environment variables
3. Set `NODE_ENV=production`

### Step 3: Deploy Database
1. Add PostgreSQL service
2. Copy connection string to environment variables
3. Run migrations in Railway console

## 🔧 Post-Deployment

### 1. Test API Endpoints
```bash
# Health check
curl https://your-backend.vercel.app/health

# Test CORS
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://your-backend.vercel.app/api/auth/signup
```

### 2. Update Frontend Configuration
Update your frontend environment variables:
```env
VITE_BACKEND_URL=https://your-backend.vercel.app
```

### 3. Test Full Application
- [ ] User registration works
- [ ] User login works
- [ ] URL shortening works
- [ ] URL redirection works
- [ ] CORS allows frontend requests

## 🐛 Common Issues

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly
- Check that frontend domain is in allowed origins
- Verify credentials are being sent

### Database Connection
- Check `DATABASE_URL` format
- Ensure database is accessible from deployment platform
- Verify Prisma client is generated

### JWT Issues
- Ensure `JWT_SECRET` is set
- Check cookie settings for production
- Verify token expiration

## 📊 Monitoring

### Vercel Analytics
- Function execution time
- Error rates
- Request volume

### Database Monitoring
- Connection pool usage
- Query performance
- Migration status

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

If you encounter issues:
1. Check Vercel/Railway logs
2. Verify environment variables
3. Test database connectivity
4. Review CORS configuration 