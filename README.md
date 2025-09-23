# Planyk 📋

> A modern, clean, and powerful task management application built with Next.js 15

## ✨ Features

### 🎯 **Core Functionality**
- **Smart Task Management** - Create, organize, and complete tasks with an intuitive interface
- **Custom Lists** - Group tasks into personalized lists with colors and emojis
- **Real-time Updates** - Changes sync instantly across all your devices
- **Progress Tracking** - Monitor your productivity with clear progress indicators

### 🔐 **Authentication & Security**
- **Secure Authentication** - Powered by Clerk with multiple sign-in options
- **User Management** - Complete user profile and account management
- **Session Management** - Secure and persistent user sessions

### 🎨 **User Experience**
- **Light & Dark Mode** - Seamless theme switching for any environment
- **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- **Clean Interface** - Distraction-free design that keeps you focused
- **Accessibility** - Built with accessibility best practices

### ⚡ **Performance**
- **Fast Loading** - Optimized for speed with React 19 and Next.js 15
- **Offline Ready** - Work seamlessly even without internet connection
- **Database Optimization** - Efficient queries with Drizzle ORM

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React 19 with modern hooks
- **Animation:** Framer Motion
- **Icons:** Lucide React + Radix Icons

### **Backend & Database**
- **Database:** Turso (libSQL) - Distributed SQLite
- **ORM:** Drizzle ORM with TypeScript
- **Authentication:** Clerk
- **API:** Next.js API Routes

### **Development Tools**
- **Runtime:** Bun (fast JavaScript runtime)
- **Linting:** ESLint with TypeScript rules
- **Formatting:** Prettier with import sorting
- **Type Safety:** TypeScript with strict mode
- **Schema Validation:** Zod

## 🚀 Quick Start

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/planyk.git
   cd planyk
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   TURSO_DATABASE_URL=your_turso_database_url
   TURSO_AUTH_TOKEN=your_turso_auth_token
   
   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Set up the database**
   ```bash
   bun run db:push
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## 🔧 Configuration

### Database Setup (Turso)

1. Create a Turso account at [turso.tech](https://turso.tech)
2. Create a new database
3. Get your database URL and auth token
4. Add them to your `.env.local` file

### Authentication Setup (Clerk)

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Get your publishable key and secret key
4. Add them to your `.env.local` file


</p>
