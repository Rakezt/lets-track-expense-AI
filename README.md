# 💰 **Lets-Track-Expense-AI** 🚀



> **Track smarter, save better, and analyze faster — now with AI-powered insights!**
>
> Lets-track-expense-AI is a modern, AI-powered expense tracking application designed for real-time financial monitoring and smarter money management.
With Socket.IO integration, every expense you add, update, or delete is reflected instantly across all connected devices — no refresh needed.

💡 Whether you're splitting bills, managing personal budgets, or tracking business expenses, lets-track-expense-AI keeps your finances organized, fast, and intelligent.

✨ Key Highlights
📊 Real-Time Updates – Instant expense synchronization using Socket.IO.

🤖 AI-Powered Insights – Get smart suggestions & expense summaries (coming soon 🚀).

📈 Interactive Charts – Visualize your spending patterns with dynamic graphs.

🌙 Dark Mode – Eye-friendly design for day & night tracking.

🔒 Secure – Built with authentication and backend best practices.

⚡ Fast & Responsive – Works seamlessly on desktop and mobile.



---

## 🛠 **Tech Stack**

### **Frontend** 🎨

* **Next.js** (React Framework)
* **TypeScript**
* **Redux Toolkit** for state management
* **Chart.js / Recharts** for data visualization
* **Socket.IO Client** for real-time updates
* **Material-UI** for professional UI components

### **Backend** ⚙️

* **Node.js** + **Express.js**
* **MongoDB** with Mongoose ODM
* **Socket.IO Server** for instant expense updates
* **Google Gemini API** for AI expense summarization ✨

---

## 📦 **Features**

* ✅ **User Authentication & Registration**
* ✅ **Add, Edit, Delete Expenses**
* ✅ **Real-time Expense Updates** (via Socket.IO)
* ✅ **Range Filtering** (Week / Month / Year)
* ✅ **AI Summarization** of expenses *(via Google Gemini API)*
* ✅ **Responsive & Modern UI**

---

## 📖 **Installation & Setup**

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/yourusername/lets-track-expense-AI.git
cd lets-track-expense-AI
```

### 2️⃣ **Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
node index.js
```

### 3️⃣ **Frontend Setup**

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

---

## 🚀 **Usage Guide**

1. **Register/Login** to your account
2. **Add expenses** with name, amount, and category
3. **View real-time updates** when expenses are added or modified
4. **Filter expenses** by week/month/year
5. **Get AI-powered summaries** of your spending trends

---

## 📡 **Real-Time Updates**

We use **Socket.IO** to ensure instant syncing of expense data between clients.

---

## 🤖 **AI Summarization**

The **Google Gemini API** is integrated to analyze and summarize your expense patterns, giving you clear insights into your spending habits.

---

## 📸 **Screenshots**

| Dashboard                                                                                              | Expense Chart                                                                                           |
| :----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img width="400" height="250" alt="Dashboard" src="https://github.com/user-attachments/assets/720c1dbb-1afc-4830-a995-7d4abcf858c2" /> | <img width="400" height="250" alt="Expense Chart" src="https://github.com/user-attachments/assets/1653b7a9-86c2-478f-bb10-99d5c4600720" /> |
| Add Expense                                                                                             | Dark Mode                                                                                               |
| <img width="400" height="250" alt="Add Expense" src="https://github.com/user-attachments/assets/562c0e07-1de4-47d4-a8cb-07db31269040" /> | <img width="400" height="250" alt="Dark Mode" src="https://github.com/user-attachments/assets/7bacede3-c635-4e36-94fb-d78c4e657768" /> |


---

🔥 **Lets-Track-Expense-AI** — *Because your wallet deserves intelligence!*
