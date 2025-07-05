# URL Shortener

A modern, full-stack URL shortening application built with React, Node.js, Express, and PostgreSQL. Features user authentication, URL shortening, and a beautiful responsive UI.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links
- **User Authentication**: Secure signup and login system with JWT tokens
- **URL Management**: View and manage all your shortened URLs
- **Real-time Redirects**: Instant redirection to original URLs
- **Copy to Clipboard**: One-click copying of shortened URLs

### User Experience
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Toast Notifications**: User-friendly feedback for all actions
- **Loading States**: Smooth loading indicators for better UX

### Technical Features
- **Secure Authentication**: Password hashing with bcrypt
- **JWT Tokens**: Stateless authentication with HTTP-only cookies
- **Database Integration**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript support in backend
- **CORS Configuration**: Secure cross-origin requests

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Zod schema validation
- **CORS**: Cross-origin resource sharing

### Frontend
- **Framework**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **HTTP Client**: Axios with credentials
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📁 Project Structure

```
url-shortner/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth.controllers.ts
│   │   │   └── url.controllers.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── url.ts
│   │   ├── types/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── Navbar.jsx
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── Allurl.jsx
│   │   │   ├── lib/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── package.json
│   │   └── vite.config.js
│   └── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/url_shortener"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=6969
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:6969`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:6969
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### POST `/api/auth/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### GET `/api/auth/me`
Get current user information (requires authentication).

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### URL Endpoints

#### POST `/api/url/`
Create a new shortened URL (requires authentication).

**Request Body:**
```json
{
  "longUrl": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "shortUrl": "/api/url/abc123"
}
```

#### GET `/api/url/me`
Get all URLs created by the current user (requires authentication).

**Response:**
```json
[
  {
    "id": "uuid",
    "shortCode": "abc123",
    "longUrl": "https://example.com/very-long-url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "userId": "user-uuid"
  }
]
```

#### GET `/api/url/:shortCode`
Redirect to the original URL using the short code.

**Response:** HTTP 302 redirect to the original URL

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  password String
  urls     Url[]
}
```

### URL Model
```prisma
model Url {
  id        String   @id @default(cuid())
  shortCode String   @unique
  longUrl   String
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}
```

## 🎨 Frontend Features

### Pages
- **Home**: Main landing page with URL shortening functionality
- **Login**: User authentication page
- **Register**: New user registration page
- **All URLs**: Dashboard to view and manage shortened URLs

### Components
- **Navbar**: Navigation component with user menu
- **UI Components**: Reusable components built with Radix UI
- **Form Components**: Input, Button, Label components

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Animations**: Gradient animations and hover effects
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Beautiful gradient themes

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: XSS protection for tokens
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries

## 🚀 Deployment

### Backend Deployment
1. Set up a PostgreSQL database (e.g., on Railway, Supabase, or AWS RDS)
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform (Railway, Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to your preferred platform (Vercel, Netlify, etc.)
3. Configure environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ankit Singh**

---

**Note**: Make sure to update the database URL and JWT secret in your environment variables before running the application.
