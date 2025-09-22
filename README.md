# Stock App

A **React-based application** for stock tracking, portfolio management, and account settings. The app interacts with a backend API for authentication, market data, and portfolio operations. Built with **React**, **Mantine UI**, and **React Router v6**.

---


## **LIVEurl**
https://not-nepse.vercel.app
---

## **Features**

* **User Authentication:** Login and signup with token-based authentication via backend API.
* **Protected Routes:** Dashboard, Market Data, Portfolio, and Settings require authentication.
* **Dynamic Navbar & SEO:** Navbar hides on login/signup pages; dynamic page titles and meta descriptions using `react-helmet-async`.
* **Portfolio Management:** Fetch and display user portfolio from backend.
* **Market Data:** Fetch and display live or mock market data via API.
* **Settings:** Update user profile information using backend API.
* **Responsive Design:** Works seamlessly on mobile and desktop devices.

---

## **Technologies**

* **Frontend:** React, Mantine, React Router v6, React Helmet Async
* **API Integration:** Fetch to communicate with backend endpoints
* **Authentication:** JWT tokens stored in `localStorage`
* **Styling:** Mantine UI components and theming

---

## **Backend Integration**

Although this project is frontend-only, it **depends on a backend API** for all dynamic data and authentication.

### **How It Works**

1. **Login / Signup:**

   * User enters credentials.
   * Frontend sends a POST request to backend API (e.g., `/api/auth/login`).
   * Backend returns a **JWT token** which is stored in `localStorage`.
   * Token is used for all subsequent API requests to protected endpoints.

2. **Protected Routes:**

   * `ProtectedRoute` component checks if a valid JWT token exists.
   * If token is missing or invalid, user is redirected to `/login`.

3. **Fetching Market Data & Portfolio:**

   * Frontend sends GET requests to backend endpoints like `/api/market` or `/api/portfolio`.
   * Response data is displayed in charts, tables, or portfolio overview.

4. **Profile Updates:**

   * Settings page sends PUT requests to backend (e.g., `/api/users/:id`) to update user profile information.


---

## **Getting Started**

### **Prerequisites**

* Node.js v18+
* npm or yarn
* Access to backend API (or mock API)

### **Installation**

```bash
# Clone the repository
git clone <your-repo-url>
cd stock-app

# Install dependencies
npm install
# or
yarn install
```

### **Running the App**

```bash
npm start
# or
yarn start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## **Available Scripts**

* `npm start` – Run frontend development server
* `npm build` – Build frontend for production
* `npm test` – Run tests

---
