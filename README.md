# Job Listing Application

This is a modern, responsive **Job Listing Dashboard** built with **Next.js**, **React**, **Tailwind CSS**, and **TypeScript**. The goal is to replicate a detailed job listing and description interface based on a Figma UI design. It features dynamic job data fetched directly from a remote API, clean navigation, and design precision.

---

## What We Implemented

* **Job Cards UI:** Reusable `JobCard` components styled to match the design exactly.  
* **Job Detail Page:** Built with proper layout, icons, fonts, and spacing following the reference.  
* **Ideal Candidate Block:** Correct layout and styling for candidate traits, age, and gender.  
* **Mobile Responsive:** Fully responsive layout optimised for different screen sizes.  
* **API Data Integration:** Job listings and details are dynamically fetched from the remote API endpoint (`https://akil-backend.onrender.com/opportunities/search`) using the native JavaScript `fetch` API.  
* **Dynamic Routing:** Implemented dynamic routes for detailed job pages based on job IDs fetched via `fetch`.  
* **Authentication System:** Built complete authentication flow with NextAuth — Sign Up, Sign In, and Email Verification — using API integration.

---

## 🔐 Authentication Screenshots

### 📥 Sign Up Page
A clean form for creating a new account, supporting both email and Google signup.

![Sign Up](./public/screenshots/signup.png)

---
### ✅ Email Verification Page


![Verify Email](./public/screenshots/verify-email.png)

---

### 🔐 Sign In Page
User-friendly login form with error handling.

![Sign In](./public/screenshots/signin.png)

---


## 📌 Job Listing View

![Job List](./public/screenshots/job-list.png)

---

## 📋 Job Description View

![Job Description](./public/screenshots/job-description.png)

---

## 🛠️ Tech Stack

* ⚛️ **Next.js** (React Framework)  
* 🎨 **Tailwind CSS** (Utility-first CSS)  
* 🔠 **TypeScript** (Typed JavaScript)  
* 🧩 **Radix UI** (Accessible UI components)  
* 📡 **API Integration** (Remote job listings API via `fetch`)
* 🔐 **NextAuth.js** (Authentication via credentials and Google OAuth)

---

## 🚀 How to Run This Project

1. **Clone the Repository**

```bash
git clone https://github.com/Fenet-damena/A2SV-task-8
cd job-listing-application
````

2. **Install Dependencies**

```bash
npm install
```

3. **Start the Dev Server**

```bash
npm run dev
```

4. **Open in Your Browser**

[http://localhost:3000](http://localhost:3000)

---

## 👩‍💻 Author

**Fenet Damena**

```


