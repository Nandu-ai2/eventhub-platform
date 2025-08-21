# EventHub - Event Discovery and RSVP Platform

## Overview
EventHub is a modern full-stack web application for event discovery and RSVP management. Users can browse upcoming events, view detailed information, and manage their attendance with a seamless user experience.

## Features
- 🎉 **Event Discovery**: Browse and search upcoming events
- 📅 **Event Creation**: Create and manage your own events
- ✅ **RSVP System**: Yes/No/Maybe responses with real-time updates
- 👤 **User Authentication**: Secure login with Replit Auth
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Deployment**: Vercel
- **State Management**: TanStack Query

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Replit account (for authentication)

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd eventhub
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
REPL_ID=your_repl_id
REPLIT_DOMAINS=your_domain
```

4. Push database schema
```bash
npm run db:push
```

5. Start development server
```bash
npm run dev
```

## Deployment to Vercel

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `SESSION_SECRET` 
   - `REPL_ID`
   - `REPLIT_DOMAINS`
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Database Schema

### Users
- `id`: Primary key (UUID)
- `email`: User email
- `firstName`: First name
- `lastName`: Last name
- `profileImageUrl`: Profile picture URL
- `createdAt`, `updatedAt`: Timestamps

### Events
- `id`: Primary key (auto-increment)
- `title`: Event title
- `description`: Event description
- `date`: Event date and time
- `city`: Event location
- `imageUrl`: Event banner image
- `createdBy`: Foreign key to Users
- `createdAt`: Creation timestamp

### RSVPs
- `id`: Primary key (auto-increment)
- `userId`: Foreign key to Users
- `eventId`: Foreign key to Events
- `status`: 'yes' | 'no' | 'maybe'
- `createdAt`, `updatedAt`: Timestamps

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `GET /api/login` - Login with Replit Auth
- `GET /api/logout` - Logout

### Events
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get specific event
- `POST /api/events` - Create new event
- `GET /api/events/:id/rsvps` - Get event RSVPs

### RSVPs
- `GET /api/rsvp/:userId/:eventId` - Get user's RSVP for event
- `POST /api/rsvp` - Create/update RSVP
- `GET /api/users/:userId/rsvps` - Get user's all RSVPs

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
MIT License - see LICENSE file for details