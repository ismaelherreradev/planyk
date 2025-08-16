# Planyk 📋

> A modern, clean, and powerful task management application built with Next.js 15

Planyk is a feature-rich todo application that helps you organize your work and life efficiently. With its intuitive interface, smart organization features, and real-time synchronization, staying productive has never been easier.

![Planyk Demo](https://via.placeholder.com/800x400/6366f1/ffffff?text=Planyk+Task+Management)

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

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Fix ESLint errors |
| `bun run format` | Format code with Prettier |
| `bun run format:check` | Check code formatting |
| `bun run db:generate` | Generate database migrations |
| `bun run db:migrate` | Run database migrations |
| `bun run db:push` | Push schema changes to database |
| `bun run db:studio` | Open Drizzle Studio |

## 🗂️ Project Structure

```
planyk/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (landing)/         # Landing page
│   ├── (planyk)/          # Main application
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── config/               # Configuration files
├── contexts/             # React contexts
├── db/                   # Database schema and utilities
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

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

## 🎨 Customization

### Themes
Planyk supports both light and dark themes. The theme preference is automatically saved and synced across devices.

### Colors & Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Components use CSS variables for consistent theming

### Database Schema
- Schema is defined in `db/schema.ts`
- Use Drizzle Kit to manage migrations
- Run `bun run db:studio` to explore your data

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

### Other Platforms

Planyk can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Docker
- Self-hosted

## 📚 API Reference

### Database Models

#### Lists
- `id` - Unique identifier
- `userId` - Owner of the list
- `title` - List name
- `listType` - Color or emoji type
- `color` - Color value
- `emoji` - Emoji character

#### Tasks
- `id` - Unique identifier
- `listId` - Parent list
- `title` - Task description
- `status` - pending | finished | deleted
- `dateTime` - Due date/time

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [Clerk](https://clerk.com) for seamless authentication
- [Turso](https://turso.tech) for the lightning-fast database
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Drizzle](https://orm.drizzle.team) for the excellent ORM

## 📞 Support

- 📧 Email: support@planyk.com
- 💬 Discord: [Join our community](https://discord.gg/planyk)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/planyk/issues)

---

<p align="center">
  <strong>Made with ❤️ by the Planyk team</strong>
</p>