# 🎉 Mini Event Platform

A full-stack Event Management web application built using:

- ⚙️ Django (Backend API)
- 🔐 JWT Authentication
- 🗄 MySQL (Local) / SQLite (Production temporary)
- ⚛️ React (Vite)
- 🌐 Deployed on Render (Backend) & Vercel (Frontend)

---




## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Token-based authentication
- Protected API routes
- Token stored in localStorage

---

### 📅 Event Management
Authenticated users can:

- Create events
- Upload event image
- View all events
- Delete their own events only
- See remaining seats

Each event contains:
- Title
- Description
- Date & Time
- Location
- Capacity
- Remaining seats
- Image

---

### 🎟 RSVP System

Users can:

- RSVP to an event
- Cancel RSVP
- Capacity is strictly enforced
- A user cannot RSVP twice
- Overbooking prevented

---

### 📊 Dashboard

- View events created by logged-in user
- View events joined by logged-in user

---

## 🏗 Tech Stack

### Backend
- Django
- Django REST Framework
- Simple JWT
- django-cors-headers
- Gunicorn (Production server)

### Frontend
- React (Vite)
- Axios
- React Router

### Deployment
- Backend → Render
- Frontend → Vercel

---

## 🛠 Local Setup

### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd EVENT-CREATION
