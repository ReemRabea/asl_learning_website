# Gesture - ASL Learning Platform

Gesture is a modern web application designed to help users learn American Sign Language (ASL) through interactive lessons and real-time hand gesture recognition.

## 🚀 Features

- **Interactive Learning Path**: Four levels covering the Alphabet, Numbers, Words, and Sentences.
- **Real-time Detection**: Uses MediaPipe and TensorFlow.js to recognize ASL signs through your webcam.
- **User Authentication**: Secure signup and login system using JWT and Bcrypt.
- **Progress Tracking**: Persists your learning journey, points, and level completions in an SQLite database.
- **Profile Dashboard**: View your stats, streaks, and account details in a beautiful glassmorphism interface.

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS, JavaScript (ES6+), TensorFlow.js, MediaPipe Hands.
- **Backend**: Node.js, Express.
- **Database**: SQLite3 (Serverless local database).
- **Authentication**: JWT (JSON Web Tokens).

## 🏃 How to Run the Project

Follow these steps to get the project running locally on your machine.

### 1. Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed (v16 or higher recommended).

### 2. Setting Up the Backend
1. Open your terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder (if not already present) and add:
   ```env
   PORT=5000
   DB_PATH=./database.sqlite
   JWT_SECRET=your_secret_key_here
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### 3. Setting Up the Frontend
1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Since the frontend is built with vanilla HTML/JS, you can serve it using any static file server. The recommended way is using `npx`:
   ```bash
   npx serve -l 3000
   ```
3. Open your browser and go to `http://localhost:3000/index.html`.

## 📁 Project Structure

```text
ASLproject/
├── backend/            # Express server & SQLite logic
│   ├── db.js           # Database initialization
│   ├── index.js        # Main API routes
│   └── database.sqlite # Local database file
├── frontend/           # Web application UI
│   ├── JS/             # Logic for auth, profile, and webcam
│   ├── assets/         # Images and model assets
│   ├── css/            # Modern styling
│   └── index.html      # Landing page
├── models/             # Machine Learning scripts & datasets
│   ├── Alphabet/
│   ├── Digits/
│   └── Words/
├── requirements.txt    # Python dependencies for ML models
└── README.md           # Project documentation
```

### 4. Machine Learning Models (Optional)
> **Note on Model Files:** Massive files like `.pickle`, `.h5`, `.keras`, and `.task` have been excluded from this repository due to GitHub file size limits. **This does not affect the website!** The application runs flawlessly using lightweight TensorFlow.js models (`.json` and `.bin`) which are included in the `frontend` directory. The Python scripts are provided to demonstrate the original training process.

If you want to view the training code for the ASL machine learning models:
1. Install the Python requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Navigate to the specific model folder (e.g., `models/Words`) and explore the Python scripts.

## 🤟 Happy Learning!
Gesture is built to make learning ASL accessible and fun for everyone.
