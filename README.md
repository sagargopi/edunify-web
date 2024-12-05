# Edunify Web Development Assignment

## Summary

This project is a mini web application designed using Next.js (a React framework) and MySQL. It consists of two main pages:

1. **Add School**: A form to input and store school data.
2. **Show Schools**: A display page showing the list of schools in a product-like format.

The application is responsive and works seamlessly across phones and desktops.

## Features

### Page 1: Add School (addSchool.jsx)

- **Form Validation**:
  - Utilized react-hook-form for efficient form handling and validation.
  - Email input has validation for correct email format.
- **Image Upload**:
  - Allows users to upload an image of the school, stored in the `schoolImages` folder on the server.
- **Responsive Design**:
  - The form is styled to be user-friendly on both mobile and desktop devices.

### Page 2: Show Schools (showSchools.jsx)

- **E-Commerce Style Display**:
  - School details (name, address, city, and image) are displayed in a grid layout similar to an e-commerce website.
- **Responsive Design**:
  - The layout adapts gracefully to screen sizes for phones and desktops.

## Database Schema

The application uses the `schools` table in the MySQL database:

| Field    | Type   | Constraints     |
|----------|--------|-----------------|
| id       | INT    | AUTO_INCREMENT  |
| name     | TEXT   | NOT NULL        |
| address  | TEXT   | NOT NULL        |
| city     | TEXT   | NOT NULL        |
| state    | TEXT   | NOT NULL        |
| contact  | BIGINT | NOT NULL        |
| image    | TEXT   | NOT NULL        |
| email_id | TEXT   | NOT NULL        |

## Technologies Used

### Frontend:
- Next.js (React framework)
- React Hook Form for validation
- CSS Modules for styling

### Backend:
- Node.js
- MySQL for database management
- Multer for file uploads

## How to Run Locally

### Prerequisites
- Node.js installed
- MySQL database set up

### Steps

1. Clone the repository:
   ```bash
   git clone <GitHub-repo-URL>
   cd <project-folder>


### .env file
    DB_HOST=localhost
    DB_USER='username'
    DB_PASSWORD='password'
    DB_NAME='database'

## Start the development server:

npm run dev


## Key Components

### addSchool.jsx

- Implements the form for adding a new school.
- Uses react-hook-form for form handling and validation.
- Includes image upload functionality.


### showSchools.jsx

- Displays the list of schools in a grid layout.
- Fetches school data from the API.
- Implements responsive design for various screen sizes.


### api/schools.js

- Handles API routes for adding and retrieving school data.
- Connects to MySQL database using the `mysql2` library.
- Implements file upload using `multer`.


### db.js

- Sets up the database connection pool.
- Exports a function to execute SQL queries.