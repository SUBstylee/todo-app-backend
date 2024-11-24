# Todo App - Instructions

This documentation will guide you through the steps to set up and run the **Todo App**, including both the frontend and backend, as well as the Prisma database setup.

---

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL](https://www.mysql.com/) or a MySQL-compatible database
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch) (to manage the database)

---

## 1. Clone the Repositories

First, clone the repositories to your local machine:

### Backend

```bash
git clone git@github.com:SUBstylee/todo-app-backend.git

cd todo-app-backend
```

Frontend

```bash
git clone git@github.com:SUBstylee/todo-app-frontend.git

cd todo-app-frontend
```

---

## 2. Backend Setup

The backend is a Node.js Express server that communicates with a MySQL database using Prisma as the ORM.

2.1 Install Dependencies

Navigate to the backend directory and install the dependencies:

```bash
cd todo-app-backend

npm install
```

2.2 Set Up Environment Variables

Create a .env file in the root of the todo-app-backend directory. This file will contain the necessary environment variables.

```bash
PORT=5001
DATABASE_URL="mysql://root:@localhost:3306/todo_app"
```

• PORT: Port number where the backend will run.

• DATABASE_URL: Connection string for your MySQL database.

2.3 Database Setup

Ensure that your MySQL server is running. Then, initialize your Prisma database.

1. If you don’t have a database already, create one:

```sql
CREATE DATABASE todo_app;
```

2. After creating the database, run the following Prisma command to set up your database schema:

```bash
npx prisma migrate dev --name init
```

This command will generate the required tables and relationships in your MySQL database.

2.4 Running the Backend

Once the backend is set up, you can start the server by running:

```bash
npm run dev
```

The backend will be running on http://localhost:5001.

---

## 3. Frontend Setup

The frontend is built using Next.js and communicates with the backend via API calls.

3.1 Install Dependencies

Navigate to the frontend directory and install the dependencies:

```bash
cd todo-app-frontend

npm install
```

3.2 Set Up Environment Variables

Create a .env.local file in the root of the todo-app-frontend directory. This file will contain the necessary environment variables for Next.js.

```
NEXT_PUBLIC_API_URL="http://localhost:5001"
```

This will point the frontend to the backend API.

3.3 Running the Frontend

Once the frontend is set up, you can run the development server:

```bash
npm run dev
```

---

## 4. Testing the App

1. Backend: You can test the backend by visiting http://localhost:5001/health. It should return a simple “Server is healthy” message.
2. Frontend: Navigate to http://localhost:3000 to interact with the Todo app. You can create tasks, mark them as complete, and edit or delete them.

---

## 5. Troubleshooting

Common Issues

• Backend not connecting to the database: Ensure your MySQL server is running and that the DATABASE_URL in your .env file is correctly configured.
• Frontend not fetching tasks: Make sure that your backend server is running and accessible from the frontend (check NEXT_PUBLIC_API_URL).

• 404 errors: If you encounter a 404 Not Found error when trying to fetch tasks, verify that the task exists in the database and that the route is correct.
