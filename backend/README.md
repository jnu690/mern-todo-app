# Todo App - Backend

A RESTful API built with Node.js, Express.js, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication
- bcryptjs

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- MongoDB Atlas account

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Create environment file
Create a `.env` file in the backend folder:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

### 3. Run in development
```bash
npm run dev
```

### 4. Run in production
```bash
npm start
```

Server runs on `http://localhost:5000`

## MongoDB Connection

### Using MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with read/write access
4. Whitelist your IP address
5. Get your connection string:

6. Paste it as `MONGODB_URI` in your `.env` file

### Using Local MongoDB

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| PUT | /api/auth/update | Update profile |
| PUT | /api/auth/password | Change password |

### Todo Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create a todo |
| PUT | /api/todos/:id | Update a todo |
| PATCH | /api/todos/:id/done | Toggle done status |
| DELETE | /api/todos/:id | Delete a todo |

## Project Structure
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Todo.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── app.js
│   └── index.js
├── .env.example
├── package.json
└── README.md

## Assumptions & Limitations

- Profile pictures stored as base64 strings in MongoDB
- Request size limit is 10mb to support image uploads
- JWT tokens expire after 7 days
- Email cannot be changed after registration
- Passwords must be at least 6 characters
- Each todo belongs to a specific user
- Users cannot see each other's todos