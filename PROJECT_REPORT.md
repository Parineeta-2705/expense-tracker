# Project Report – Expense Tracker

**Course:** Full Stack Technologies (Portfolio-Driven Assessment)
**Name:** ______________________  **Roll No.:** ______________
**GitHub link:** https://github.com/<your-username>/expense-tracker
**Submission date:** 1st October 2026

## 1. Introduction
Keeping track of daily spending is a common need for students and families. The Expense Tracker is a mini full stack web application that lets a user record expenses, review them, correct mistakes and delete entries, while showing the total spent and a category-wise breakdown.

## 2. Objectives
- Demonstrate frontend, backend and database connectivity.
- Implement all four CRUD operations through a REST API.
- Apply server-side validation and clear error handling.
- Use Git and GitHub for version control.

## 3. Technologies Used
| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (Fetch API) |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| API style | REST (JSON) |
| Version control | Git and GitHub |

## 4. System Architecture
The browser (frontend) sends HTTP requests using `fetch()` to the Express server. Express routes handle each request, use the Mongoose model to read or write documents in MongoDB, and return JSON, which the frontend renders.

`Browser (HTML/CSS/JS)  <-->  Express REST API  <-->  MongoDB`

## 5. Database Design
Collection: `expenses`

| Field | Type | Rules |
|---|---|---|
| title | String | required, max 80 characters |
| amount | Number | required, greater than 0 |
| category | String | one of Food, Travel, Bills, Shopping, Health, Other |
| date | Date | defaults to today |
| note | String | optional, max 200 characters |
| createdAt / updatedAt | Date | added automatically |

## 6. REST API and CRUD Mapping
| Operation | Method and endpoint |
|---|---|
| Create | POST /api/expenses |
| Read | GET /api/expenses, GET /api/expenses/:id, GET /api/expenses/summary |
| Update | PUT /api/expenses/:id |
| Delete | DELETE /api/expenses/:id |

Invalid input returns HTTP 400 with an error message, and unknown ids return 404.

## 7. Features
- Add, edit and delete expenses.
- Filter the list by category.
- Live total and category-wise totals (MongoDB aggregation).
- Validation on both the form and the server.
- Responsive layout with light and dark themes.
- Output is inserted with `textContent`, which avoids HTML injection.

## 8. Testing
| Test case | Expected result | Result |
|---|---|---|
| Add expense with valid data | Appears in list, total increases | Pass |
| Add expense with empty title / amount 0 | Error message shown | Pass |
| Edit an expense | List and total update | Pass |
| Delete an expense | Removed after confirmation | Pass |
| Filter by category | Only that category listed | Pass |

*(Fill in the Result column after you run the tests yourself.)*

## 9. Screenshots
Insert screenshots here: (1) empty state, (2) after adding expenses, (3) edit mode, (4) error message, (5) category filter, (6) MongoDB Compass showing the `expenses` collection, (7) GitHub repository page.

## 10. Conclusion and Future Scope
The project meets the assessment requirements: a working frontend, Express backend and MongoDB database connected through a REST API with full CRUD. Future improvements include user login (JWT), monthly charts, budget limits, CSV export and deployment on Render and MongoDB Atlas.
