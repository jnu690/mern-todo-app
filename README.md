# mern-todo-app
A full stack MERN todo app
# Todo App - Frontend

A modern React.js frontend for a full-stack Todo application.

## Tech Stack

- React.js v18
- Vite
- Tailwind CSS
- Axios

## Features

- User registration and login
- Password visibility toggle
- Dashboard welcome page
- Create, edit, delete todos
- Mark todos as done/undone
- Search todos by title
- Filter by All / Active / Completed
- Calendar view with today highlighted
- Completed tasks history
- User profile page:
  - Profile picture upload
  - Change name
  - Change password
- Clean purple UI theme

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- Backend server running on port 5000

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Create environment file
Create a `.env` file in the frontend folder:

### 3. Run in development
```bash
npm run dev
```

App runs on `http://localhost:5173`

### 4. Build for production
```bash
npm run build
```

## Project Structure

frontend/
├── src/
│   ├── components/
│   │   ├── AuthPage.jsx
│   │   ├── Calendar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── History.jsx
│   │   ├── Profile.jsx
│   │   ├── TodoForm.jsx
│   │   └── TodoItem.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useTodos.js
│   ├── services/
│   │   ├── authService.js
│   │   └── todoService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
├── vite.config.js
└── README.md