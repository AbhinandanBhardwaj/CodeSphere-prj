# CodeSphere 🚀

**CodeSphere** is a unified coding performance platform that helps developers track and manage their coding journey across multiple competitive programming platforms from a single dashboard.

## 📌 Overview

Developers often use multiple platforms such as **LeetCode, Codeforces, and GeeksforGeeks** to practice coding. CodeSphere brings these platforms together into one centralized interface, making it easier to connect coding profiles, view progress, and monitor problem-solving activity.

## ✨ Features

- 📊 Unified coding dashboard
- 🔗 Connect multiple coding platforms
- 🧩 LeetCode integration
- ⚔️ Codeforces integration
- 💻 GeeksforGeeks integration
- 👤 Coding profile management
- 📈 Track coding progress and solved problems
- 🔍 Practice coding problems
- 💾 Local profile/session management
- ⚡ Backend API using Node.js and Express

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- Axios
- CORS
- dotenv

### Development Tools
- Git & GitHub
- Nodemon
- Visual Studio Code

## 📂 Project Structure

```text
CodeSphere/
│
├── Backend/
│   ├── routes/
│   │   └── platformRoutes.js
│   ├── services/
│   │   └── codeforcesService.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── css/
│   ├── dashboard.css
│   ├── codeforces.css
│   ├── gfg.css
│   ├── leetcode.css
│   ├── login.css
│   ├── navigation.css
│   ├── problems.css
│   ├── profile.css
│   ├── style.css
│   └── variables.css
│
├── js/
│   ├── app.js
│   ├── charts.js
│   ├── codeforces.js
│   ├── dashboard.js
│   ├── data.js
│   ├── gfg.js
│   ├── leetcode.js
│   ├── login.js
│   ├── problems.js
│   ├── profile.js
│   └── sidebar.js
│
├── index.html
├── login.html
├── dashboard.html
├── problems.html
├── profile.html
├── codeforces.html
├── leetcode.html
└── gfg.html
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/AbhinandanBhardwaj/CodeSphere-prj.git
```

### 2. Open the project

```bash
cd CodeSphere-prj
```

### 3. Install backend dependencies

```bash
cd Backend
npm install
```

### 4. Start the backend server

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 5. Run the frontend

Open `index.html` in your browser or use a local development server such as **VS Code Live Server**.

## 🔌 Platform Integration

CodeSphere is designed to connect users with their coding-platform profiles and retrieve publicly available coding information.

Currently supported platforms include:

- **LeetCode**
- **Codeforces**
- **GeeksforGeeks**

The Codeforces integration uses the public Codeforces API to retrieve profile-related information without requiring the user's Codeforces password.

## 👥 Team

CodeSphere is developed as a collaborative **3-member team project**.

### Platform Integration

Responsible for:

- Coding-platform integrations
- Username/handle connections
- Fetching public platform data
- Platform-wise coding statistics
- API/request error handling
- Connected-platform status

## 🎯 Project Goal

The goal of CodeSphere is to provide developers with a **single, simple and centralized platform** for monitoring their coding journey across different competitive programming websites.

---

**CodeSphere — Keep building. Keep solving. 🚀**
