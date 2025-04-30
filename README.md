# 🚀 Job-Xpert Frontend

A modern, feature-rich **React-based job portal** frontend built with performance, scalability, and user experience in mind. Designed to support job seekers and admins with elegant UI and intuitive workflows.

![React](https://img.shields.io/badge/React-v19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-yellow?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-blue?logo=tailwindcss)
![Material-UI](https://img.shields.io/badge/Material--UI-Design_System-purple?logo=mui)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧠 Overview

**Job-Xpert** is a responsive and modular frontend application designed to power a comprehensive **job portal system**. It supports multiple user roles, a secure authentication flow, and smooth navigation using modern React architecture.

---

## 🏗️ Tech Stack

| Category          | Technologies                                           |
|-------------------|--------------------------------------------------------|
| Frontend Core     | ⚛️ React (v19), Vite, TypeScript (optional)           |
| Styling           | 🎨 TailwindCSS, Material-UI, React Icons               |
| Routing           | 🔁 React Router DOM                                   |
| HTTP Requests     | 🔗 Axios                                               |
| UX Enhancements   | 🔔 React Hot Toast, 🧊 SweetAlert2                     |
| Code Quality      | ✅ ESLint                                              |

---

## 📁 Project Structure

```bash
src/
├── assets/         # 📦 Static files (images, etc.)
├── Components/     # 🧩 Reusable UI components
├── pages/          # 📄 Main application pages
│   ├── home/       # 🏠 Homepage related components
│   └── admin/      # 🛠️ Admin dashboard components
├── utils/          # 🔧 Utility functions
├── App.jsx         # 🔌 Main app logic
├── main.jsx        # 🧬 App entry point
└── auth.js         # 🔐 Authentication logic
```
## 🌐 Routing Structure

/             -> Home Page
/login        -> Login Page
/signup       -> Signup Page
/admin/*      -> Admin Dashboard
/cvdashboard  -> CV Dashboard

## 🔐 Authentication

✅ Secure Login / Signup system
🔐 Protected Routes using role-based access
🔄 Persistent login state with frontend auth logic

## ✨ Features

🪄 Modern UI with Material-UI and TailwindCSS
🧠 Hooks-first approach for clean state management
📨 CV Dashboard for job seekers
🛠️ Admin Panel for managing platform content
🍞 Toast notifications with React Hot Toast
❗ User-friendly alerts using SweetAlert2
🔁 Smooth routing with React Router DOM
📱 Fully responsive design across all devices

## 🧪 Getting Started

# ▶️ Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/job-xpert-frontend.git

# Navigate into the project
cd job-xpert-frontend

# Install dependencies
npm install

# Start the development server
npm run dev

```
## 🔨 Build for Production

```bash
npm run build
```
## 🧑‍💻 Development Methodologies

✅ Component-based architecture
🗂️ Separation of concerns with pages, components, and utils
🧼 Linting with ESLint
🔁 Hot Module Replacement (HMR) with Vite
🔍 TypeScript-ready configuration

## 🙌 Contribution Guide

# We welcome all contributions! To get started:
```bash
# Fork the repo and clone your copy
git clone https://github.com/your-username/job-xpert-frontend.git

# Create a new branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "Added a cool feature"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request 🎉
```
## 📃 License

This project is licensed under the MIT License. See LICENSE for details.

## 💬 Feedback

# We’d love to hear your feedback! Feel free to:
📧 Open issues
🛠️ Submit pull requests
🤝 Contact the team

## Made with ❤️ using React, Vite, Material-UI, and TailwindCSS.
