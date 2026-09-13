# CV Builder

A full-stack MERN application for building, customizing, and exporting professional resumes — with secure authentication, multiple layouts, and premium template payments.

**🔗 Live Demo:** [cv-builder-mu-ten.vercel.app](https://cv-builder-mu-ten.vercel.app)

## Features

- 🔐 Secure signup/login with email & password, plus Google OAuth 2.0
- 📝 Real-time resume editor with multiple layout options
- 📄 One-click PDF export powered by Puppeteer
- 💳 Razorpay integration for premium template purchases
- ☁️ Persistent cloud storage of user data via MongoDB Atlas

## Tech Stack

**Frontend:** React.js, Vite, Redux, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Auth:** JWT, bcrypt, Passport.js (Google OAuth 2.0)
**Other integrations:** Razorpay (payments), Puppeteer (PDF generation)
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)


## Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (for login)
- Razorpay test keys (for payments)
<!-- 
### 1. Clone the repo
```bash
git clone https://github.com/arora-tarun/CV_builder.git
cd CV_builder
```

### 2. Backend setup
```bash
cd cv_backend
npm install
```

Create a `.env` file in `cv_backend` with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret


Run the backend:
```bash
node server.js
```

### 3. Frontend setup
```bash
cd ../cv_frontend
npm install
```

Create a `.env` file in `cv_frontend` with:

VITE_API_URL=http://localhost:4000


Run the frontend:
```bash
npm run dev
``` -->

## Project Structure

CV_builder/
├── cv_frontend/ # React + Vite client
└── cv_backend/ # Express + MongoDB API server


## Author

**Tarun Arora**
[LinkedIn](https://www.linkedin.com/in/tarun--arora/) · [GitHub](https://github.com/arora-tarun)