# Claims Management System

A full-stack web application for managing claims with a multi-step form process.

## Features

- Multi-step claim submission form
- File upload support
- Real-time validation
- Responsive design
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Install MySQL if not already installed
2. Start MySQL service
3. Create database and tables:
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Run the database script
   source backend/database.sql
   ```

### 2. Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`

4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/claims` - Create a new claim
- `GET /api/claims` - Get all claims
- `GET /api/claims/:id` - Get a specific claim
- `PUT /api/claims/:id` - Update a claim
- `DELETE /api/claims/:id` - Delete a claim
- `POST /api/claims/upload` - Upload documents

## Project Structure

```
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/           # Express backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Technologies Used

- Frontend:
  - React
  - Tailwind CSS
  - Context API
  - Axios

- Backend:
  - Express.js
  - MySQL
  - Multer (for file uploads)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 