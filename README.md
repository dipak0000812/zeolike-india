# Zeolike MVP

A real estate platform built with React, Node.js, and Express.

## Project Structure

```
zeolike/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   └── utils/         # Helper functions
│   └── public/            # Static files
│
└── server/                # Node.js backend
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── utils/           # Helper functions
    └── server.js        # Entry point
```

## Features

- User authentication
- Property listings
- Property search and filtering
- Interactive maps
- User dashboard
- Property management

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## Tech Stack

- Frontend:
  - React
  - Tailwind CSS
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication 