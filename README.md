# 🏛️ Campus Complaint Management System (CCMS)

A **secure, modern, and confidential web-based Campus Complaint Management System (CCMS)** designed specifically for college students to report campus-related issues and grievances digitally.

The platform enables students to submit complaints, attach supporting images, and track the progress of their complaints through different resolution stages. A dedicated Admin Dashboard allows authorized college administrators to review, manage, assign, and resolve complaints efficiently.

The system focuses on **privacy, accountability, and transparency**, ensuring that students can securely access and track **only their own complaints**, while authorized administrators can manage complaints according to their access permissions.

---

## 📸 Screenshots

Explore the different modules and interfaces of the CCMS platform:

### 🔑 Portal Login

![Login Screen](./screenshots/login.png)

Secure login interface for students and authorized administrators.

### 🎓 Student Dashboard

![Student Dashboard](./screenshots/student_dashboard.png)

A personalized dashboard where students can view their submitted complaints and monitor their current status.

### ✍️ Complaint Submission Form

![Grievance Form](./screenshots/grievance_form.png)

Students can submit detailed complaints by selecting a category, providing a description, specifying the location, and uploading supporting images.

### 🛠️ Admin Resolution Dashboard

![Admin Dashboard](./screenshots/admin_dashboard.png)

A centralized dashboard for authorized administrators to review complaints, filter issues, update statuses, and add official remarks.

---

# 🚀 Key Features

## 👤 Student Features

### 🔐 Secure Authentication

Students can securely access the platform using their registered college credentials.

### 📝 Complaint Submission

Students can submit complaints related to various campus services and facilities, including:

* 🏫 Infrastructure
* 📚 Academic Issues
* 🛏️ Hostel
* 🍽️ Canteen
* 🚌 Transportation
* 💻 Laboratory
* 📶 Wi-Fi / Internet
* 🧹 Cleanliness
* ⚡ Electrical Issues
* 💧 Water Supply
* 📌 Other Campus Issues

### 📸 Supporting Attachments

Students can upload relevant photos or supporting evidence along with their complaints.

### 🔒 Private Complaints

Complaints are confidential. Students can access **only the complaints they have submitted**, while authorized administrators can access complaints according to their assigned permissions.

### 📊 Complaint Tracking

Students can monitor the progress of their complaints through status stages such as:

**Submitted → Under Review → In Progress → Resolved**

### 🔔 Complaint Updates

Students can view updates and official remarks provided by administrators regarding their complaints.

---

## 💼 Admin & Staff Features

### 📥 Complaint Management

Authorized administrators can manage complaints through a centralized dashboard.

### 🔍 Search & Filtering

Complaints can be filtered and organized based on:

* Department
* Category
* Priority
* Status
* Date

### 🔄 Status Management

Administrators can update complaint statuses as the issue progresses:

**Submitted → Under Review → Assigned → In Progress → Resolved / Rejected**

### 💬 Official Remarks

Administrators can add remarks and updates to provide students with information about actions taken.

### 📈 Overview Metrics

The Admin Dashboard provides an overview of:

* Total Complaints
* Pending Complaints
* In Progress
* Resolved Complaints
* High-Priority Issues

---

# 🔐 Security & Privacy

The CCMS is designed with privacy and security as core principles.

* 🔒 Role-based access control
* 👤 Student-specific complaint access
* 🛡️ Protected authentication
* 🔑 Secure password hashing
* 🎫 JWT-based authentication
* 📁 Validated file uploads
* 🚫 Unauthorized complaint access prevention
* 🔐 Confidential complaint information

---

# 🛠️ Technology Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* Lucide React
* Vite

### Backend

* Node.js
* Express.js
* Multer

### Database

* MongoDB Atlas
* Mongoose ODM

### Deployment

* Frontend: Vercel
* Backend: Render

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       Student       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │  Student Dashboard  │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │  MongoDB Atlas  │       │  File Storage   │
        │  Complaint Data │       │    Attachments  │
        └─────────────────┘       └─────────────────┘
                              
                    ┌─────────────────────┐
                    │   Admin Dashboard   │
                    │ Complaint Management │
                    └─────────────────────┘
```

---

# ⚙️ Local Development Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/kirthik327/ccms-portal.git
cd ccms-portal
```

## 2️⃣ Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ Never commit your `.env` file or secret credentials to GitHub.

---

## 3️⃣ Start the Backend

```bash
cd backend
npm install
npm start
```

---

## 4️⃣ Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 Live Application

**Live Demo:**
https://ccms-portal-gules.vercel.app/

**GitHub Repository:**
https://github.com/kirthik327/ccms-portal

---

# 🎯 Project Objective

The primary objective of CCMS is to replace traditional, manual complaint-handling processes with a **centralized, secure, and transparent digital platform**.

The system helps colleges:

* Improve complaint management efficiency.
* Reduce manual paperwork.
* Provide students with better visibility into complaint progress.
* Improve accountability among responsible departments.
* Protect the confidentiality of student complaints.
* Enable administrators to identify recurring campus issues.

---

# 🔮 Future Enhancements

* 📧 Email notifications for complaint status updates.
* 🔐 Email OTP-based password recovery.
* 📱 Progressive Web App (PWA) support.
* 🤖 AI-based complaint categorization.
* 🧠 Duplicate complaint detection.
* 📍 QR-based complaint submission for campus locations.
* 📊 Advanced analytics and reporting.
* 🔔 Real-time notifications.
* 👥 Department-level administrator roles.
* 🗺️ Location-based complaint analytics.

---

# 👨‍💻 Project

**Campus Complaint Management System (CCMS)**

Built as a college project to improve the way student grievances are reported, managed, tracked, and resolved through a secure digital platform.
