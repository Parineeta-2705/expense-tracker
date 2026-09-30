# Expense Tracker – Mini Full Stack Web Application

Portfolio-Driven Assessment – Full Stack Technologies

A web app to record, view, edit and delete personal expenses, with a running total and per-category breakdown.

**Stack:** HTML/CSS/JavaScript (frontend) · Node.js + Express.js (backend) · MongoDB + Mongoose (database) · REST API · Git & GitHub

## Run locally
1. Install Node.js (v18+) and MongoDB Community Server (or use a free MongoDB Atlas cluster).
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and set `MONGO_URI` if you are not using local MongoDB.
4. Start the server:
   ```
   npm start
   ```
5. Open http://localhost:3000

## REST API
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/expenses` | Create an expense |
| GET | `/api/expenses` | Read all (optional `?category=Food`) |
| GET | `/api/expenses/summary` | Total and per-category totals |
| GET | `/api/expenses/:id` | Read one expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

## Project structure
```
expense-tracker/
├── server.js            # Express app + MongoDB connection
├── models/Expense.js    # Mongoose schema
├── routes/expenses.js   # CRUD REST routes
├── public/              # Frontend (index.html, style.css, app.js)
├── .env.example
└── package.json
```

## Push to GitHub
```
git init
git add .
git commit -m "Expense Tracker: full stack CRUD app"
git branch -M main
git remote add origin https://github.com/<your-username>/expense-tracker.git
git push -u origin main
```
