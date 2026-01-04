# 🤖 Agentic AI Ticket Management System

An **AI-powered, event-driven ticket management system** that automatically analyzes, prioritizes, and assigns support tickets to the most suitable moderators using **Agentic AI workflows**.

This project demonstrates how AI, automation, and background processing can be combined to build a scalable and intelligent backend system.

---

## 🚀 Overview

The **Agentic AI Ticket Management System** automates the complete ticket lifecycle:

- Understands ticket content using AI
- Assigns priority and category automatically
- Matches tickets to moderators based on skills
- Sends automated email notifications
- Processes heavy tasks asynchronously using background jobs

---

## ✨ Key Features

### 🧠 AI-Powered Ticket Processing
- Automatic ticket categorization
- Smart priority assignment (Low / Medium / High)
- AI-generated helpful notes for moderators
- Required skill extraction from ticket content

### 👨‍💻 Smart Moderator Assignment
- Skill-based moderator matching
- Regex-based flexible skill routing
- Automatic fallback to Admin if no moderator matches

### 🔐 User Management
- Role-based access control:
  - User
  - Moderator
  - Admin
- Skill management for moderators
- Secure authentication using JWT

### ⚙️ Background Processing
- Event-driven architecture using **Inngest**
- Asynchronous ticket analysis and assignment
- Automated email notifications

---

## 🔄 Ticket Workflow

1. User creates a support ticket  
2. Ticket is saved instantly in the database  
3. An Inngest event is triggered in the background  
4. AI analyzes the ticket content  
5. Priority, skills, and notes are generated  
6. Best moderator is automatically assigned  
7. Email notification is sent to the moderator  

All heavy processing happens asynchronously, ensuring fast API responses.

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Background Jobs:** Inngest  
- **AI Integration:** Google Gemini API  
- **Email Service:** Nodemailer (Mailtrap)  
- **Development Tools:** Nodemon  

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` – Register a new user
- `POST /login` – Login and receive JWT
- `POST /logout` – Logout user
- `GET /users` – Get all users (Admin only)
- `POST /update-user` – Update role and skills (Admin only)

### Tickets (`/api/tickets`)
- `POST /` – Create a new ticket
- `GET /` – Get tickets (role-based access)
- `GET /:id` – Get ticket details

### Background Jobs
- `POST /api/inngest` – Inngest event handler

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and configure the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key

MAIL_HOST=smtp.mailtrap.io
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password


---

## 🎯 Why This Project?

- Demonstrates **Agentic AI workflows**
- Uses real-world **event-driven architecture**
- Showcases scalable backend design
- Integrates AI meaningfully, not just as a wrapper
- Ideal for demonstrating backend + automation skills

---

## 🚧 Future Enhancements
- Ticket SLA and escalation system
- Analytics dashboard
- Multi-language ticket analysis
- Reminder and follow-up automation
- Admin insights and reporting

---

## 📌 Conclusion

The **Agentic AI Ticket Management System** shows how modern backend systems can leverage AI and automation to deliver intelligent, scalable, and maintainable solutions.

⭐ If you find this project useful, consider giving it a star!



