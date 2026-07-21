# 🛍️ TRY_ON Store

### AI-Powered Virtual Try-On E-Commerce Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-109989?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)

A modern AI-powered e-commerce platform that combines a responsive shopping experience with an intelligent **Virtual Try-On** system. Built with **React**, **FastAPI**, and **Hugging Face's IDM-VTON**, the application enables users to preview clothing on themselves before making a purchase.

🌐 **Live Demo:** https://my-TRY_ON-store.vercel.app/

---

# 📖 Overview

TRY_ON Store reimagines online TRY_ON shopping by integrating AI-powered virtual fitting directly into a modern e-commerce experience.

The frontend is developed using **React** and **Vite**, providing a fast and responsive interface, while a **FastAPI** backend securely communicates with **Hugging Face's IDM-VTON** model to generate realistic virtual try-on images.

The architecture separates frontend and backend services, making deployment, scalability, and future expansion significantly easier.

---

# ✨ Key Features

## 🤖 AI Virtual Try-On

- Upload a personal photo directly from the navigation bar.
- Generate realistic virtual try-on images.
- Secure FastAPI proxy to protect API credentials.
- Automatic image validation and resizing for improved memory efficiency.
- Session-based caching with `sessionStorage` to avoid redundant AI requests.
- Optimized workflow for faster repeated try-ons.

---

## 🛒 E-Commerce Functionality

- Dynamic product catalog
- Product detail pages
- Shopping cart management
- Wishlist support
- Product search
- Category-based filtering
- Real-time pricing calculations
- Responsive navigation

---

## 🎨 User Experience

- Mobile-first responsive design
- Smooth Dark & Light Theme switching
- Custom "Sage & Warm Sand" design palette
- Skeleton loading placeholders
- Toast notifications
- Micro-interactions and hover animations
- Optimized layout with minimal cumulative layout shift (CLS)

---

# 🏗️ Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router v6
- Context API
- React Icons

## Backend

- Python
- FastAPI
- Uvicorn
- Gradio Client
- Pillow (PIL)


---

# 📂 Project Structure

## Frontend

```text
src/
│
├── assets/
├── Components/
│   ├── Navbar/
│   ├── ProductDetail/
│   ├── SkeletonCard/
│   └── ...
│
├── context/
├── pages/
├── services/
├── App.jsx
├── main.jsx
└── index.css

.env
tailwind.config.js
vite.config.js
```

## Backend

```text
backend/
│
├── main.py
├── requirements.txt
└── .env
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project locally, ensure the following are installed:

- Node.js (v16 or newer)
- Python (v3.9 or newer)
- Hugging Face Access Token

---

# Backend Setup

Navigate to the backend directory.

## 1. Create a Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python -m venv venv
source venv/bin/activate
```

---

## 2. Install Dependencies

```bash
pip install fastapi uvicorn gradio-client pillow python-multipart python-dotenv
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
HF_TOKEN=hf_your_access_token
FRONTEND_URL=http://localhost:5173
```

---

## 4. Start the Backend Server

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

# Frontend Setup

Open a second terminal.

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
VITE_BACKEND_URL=http://localhost:8000
```

For mobile device testing:

```env
VITE_BACKEND_URL=http://192.168.x.x:8000
```

Replace the IP address with your machine's local IP.

---

## Start Development Server

```bash
npm run dev
```

To expose the development server on your local network:

```bash
npm run dev -- --host
```

---


# 💡 Highlights

- ⚡ Built with modern React architecture
- 🤖 AI-powered Virtual Try-On 
- 📱 Fully responsive across all devices
- 🌙 Dark & Light Theme support
- 🚀 Optimized for performance and scalability
- 🔒 Secure backend API integration
- 🧠 Intelligent image caching and optimization

---

# 👨‍💻 Author

**Ishwik Vashishtha**

GitHub: https://github.com/IshwikVashishtha

---

# ⭐ Show Your Support

If you found this project useful, consider giving the repository a **Star ⭐**.

Your support helps increase the project's visibility and encourages future development.