A full-stack MERN application for managing expenses with real-time updates powered by Socket.IO. It also includes AI-powered expense summarization using the Google Gemini API (feature implemented).

🚀 Tech Stack

Frontend

Next.js 15 (React Framework)

TypeScript

Redux Toolkit for state management

Chart.js / Recharts for data visualization

Material-UI for UI components

Backend

Node.js

Express.js

MongoDB with Mongoose

Socket.IO for real-time updates

Google Gemini API for expense summarization

CORS for API security

📌 Features

Add, edit, delete expenses

Real-time updates when new expenses are added

Filter expenses by week / month / year

Dynamic charts for visualizing expenses

AI-powered expense summary using Google Gemini API

⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-username/mern-expense-tracker.git
cd mern-expense-tracker

2️⃣ Setup environment variables

Create a .env file in both frontend and backend directories.

Backend .env

MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000

Frontend .env.local

NEXT_PUBLIC_API_URL=http://localhost:5000

3️⃣ Install dependencies

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

4️⃣ Run the application

# Start backend server
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev

App will be running at: http://localhost:3000

📝 Usage Guide

Register/Login to your account.

Add Expenses by filling in name, amount, and category.

Use the dropdown filter to view expenses for a week, month, or year.

Charts dynamically update based on your selection.

Real-time updates appear instantly for all connected clients.

AI summary of your spending patterns is generated automatically.

📡 Real-Time Updates

Implemented using Socket.IO to provide instant expense updates without refreshing.

📊 Future Improvements

Export expense data to Excel/CSV

Add multi-user group expense tracking

More advanced AI insights

💡 Developed with ❤️ using the MERN Stack & Google Gemini API.

