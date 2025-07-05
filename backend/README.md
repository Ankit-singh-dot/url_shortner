# URL Shortener Backend

Express.js backend for the URL shortener application with TypeScript, Prisma ORM, and JWT authentication.

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your database and JWT configuration
   ```

3. **Set up database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Build and run**
   ```bash
   npm run build
   npm run dev
   ```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Your JWT secret key
   - `FRONTEND_URL`: Your frontend domain for CORS

### Railway Deployment

1. **Connect your GitHub repository to Railway**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically on push**

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `PORT` | Server port (default: 4000) | No |
| `FRONTEND_URL` | Frontend domain for CORS | Yes |
| `NODE_ENV` | Environment (production/development) | No |

## 📁 Project Structure

```
backend/
├── src/
│   ├── controller/     # Route handlers
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Main application file
├── prisma/
│   ├── migrations/     # Database migrations
│   └── schema.prisma   # Database schema
├── dist/               # Compiled JavaScript
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vercel.json         # Vercel deployment config
└── env.example         # Environment variables template
```

## 🔧 Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run postinstall` - Generate Prisma client

## 🔒 Security

- JWT authentication with HTTP-only cookies
- Password hashing with bcrypt
- CORS configuration for production
- Environment variable validation
- SQL injection protection with Prisma

## 📊 Database

The application uses PostgreSQL with Prisma ORM. The schema includes:

- **User**: Authentication and user management
- **Url**: URL shortening and tracking

Run migrations with:
```bash
npx prisma migrate deploy
```

## 🚀 API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user
- `POST /api/url/` - Create shortened URL
- `GET /api/url/me` - Get user's URLs
- `GET /api/url/:shortCode` - Redirect to original URL
- `GET /health` - Health check endpoint 