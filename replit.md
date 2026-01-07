# Facebook Messenger Bot with Gemini AI

## Overview

This project is a Facebook Messenger chatbot that uses Google's Gemini AI for automated responses and image recognition. The application consists of a React frontend for status monitoring and a Node.js backend that runs the bot process. The bot connects to Facebook Messenger using session cookies (fbstate) and can respond to commands and analyze images sent by users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth UI transitions
- **Build Tool**: Vite with React plugin

The frontend serves primarily as an informational dashboard to display the bot's status. The main functionality runs on the backend.

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript compiled with tsx
- **Bot Framework**: @dongdev/fca-unofficial for Facebook Messenger API integration
- **AI Integration**: Google Generative AI (@google/generative-ai) for Gemini Vision capabilities
- **Process Management**: Bot runs as a child process spawned from the main server

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Generated to `./migrations` directory
- **Current Schema**: Basic users table with id, username, and password fields
- **In-Memory Fallback**: MemStorage class for development without database

### Authentication Flow
- **Facebook Bot Auth**: Uses session cookies stored in `bot/account.txt` (fbstate format)
- **Cookie Extraction**: Requires c3c-fbstate browser extension to export cookies from logged-in Facebook session
- **User Auth**: Basic username/password schema prepared but not fully implemented

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/ui/  # shadcn components
│       ├── pages/          # Route components
│       └── hooks/          # Custom React hooks
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   └── storage.ts    # Data storage interface
├── bot/              # Messenger bot module
│   ├── index.js      # Bot entry point
│   ├── account.txt   # Facebook session cookies
│   └── commands/     # Bot command handlers
├── shared/           # Shared code between client/server
│   └── schema.ts     # Database schema
└── migrations/       # Drizzle migrations
```

## External Dependencies

### Third-Party Services
- **Google Gemini AI**: Image recognition and AI responses (requires `GEMINI_API_KEY` secret)
- **Facebook Messenger**: Bot communication via unofficial API

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database schema management and migrations

### Key npm Packages
- `@dongdev/fca-unofficial`: Facebook Chat API client
- `@google/generative-ai`: Gemini AI SDK
- `drizzle-orm` / `drizzle-kit`: Database ORM and tooling
- `express`: HTTP server framework
- `@tanstack/react-query`: Frontend data fetching
- `framer-motion`: Animation library

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: Google AI Studio API key

### Configuration Files
- `appstate.json` / `bot/account.txt`: Facebook session cookies (fbstate)
- `fca-config.json`: Facebook Chat API configuration with MQTT settings