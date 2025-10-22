# 🛡️ Cyber_Auth

A simple and secure authentication system for modern web applications — built using **Node.js**, **Express**, **MongoDB**, and **React**.  
Cyber_Auth provides **user registration, login, email verification, token management**, and **Google reCAPTCHA** integration to ensure strong protection against unauthorized access and bot attacks.

✨ Features
- 🔐 **User Registration & Login** (with OTP email verification)
- 🧂 **Password Hashing** using `bcrypt`
- 🪪 **JWT Authentication** with token expiry handling
- 📩 **Email Verification** via **Mailtrap**
- 🧠 **Google reCAPTCHA v2** integration for bot prevention
- ⚙️ **Environment-based configuration** using `.env`
- 🧱 **MVC Architecture** for both frontend and backend
- 💾 **MongoDB Atlas** as a cloud database
- 🎨 **Tailwind CSS** for responsive UI
- 🌐 **CORS & secure session management**


🧰 Tech Stack
| Layer             | Technology  |
|-------------------|-------------|
| **Frontend**      | React.js, Tailwind CSS, React Context API |
| **Backend**       | Node.js, Express.js |
| **Database**      | MongoDB Atlas |
| **Security**      | bcrypt, JWT, Google reCAPTCHA |
| **Email Service** | Mailtrap (SMTP Sandbox) |
| **Architecture**  | MVC pattern (frontend & backend) |



📁 Project Structure
🖥️ Backend

/backend
├── controllers/
├── helpers/
├── mailtrap/
├── middleware/
├── models/
├── routes/
├── server.js
├── .env

💻 Frontend

/frontend
├── components/
├── contexts/
├── helpers/
├── pages/
├── routers/
├── .env
-> Both frontend and backend follow an MVC-inspired design for better maintainability and scalability.


## ⚙️ Requirements
- Git  
- Node.js **v16+**  
- MongoDB Atlas account  
- Mailtrap SMTP credentials  
- Google reCAPTCHA site & secret keys  


## 🚀 Quick Start

1️⃣ Clone the Repository
```bash
git clone https://github.com/Saimoonsengoo/Cyber_Auth.git
cd Cyber_Auth

2️⃣ Install Dependencies
🔧 Backend
| Package           | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| express           | Web framework for building RESTful APIs              |
| mongoose          | ODM (Object Data Modeling) library for MongoDB       |
| mongodb           | Official MongoDB driver for Node.js                  |
| bcrypt            | Secure password hashing and salting                  |
| jsonwebtoken      | Handles user authentication using JWT tokens         |
| cookie-parser     | Parses cookies for session handling                  |
| cors              | Enables Cross-Origin Resource Sharing                |
| dotenv            | Loads environment variables from `.env` file         |
| nodemailer        | Sends verification and notification emails           |
| mailtrap          | Testing email functionality safely in development    |
| express-validator | Validates and sanitizes incoming request data        |
| morgan            | Logs HTTP requests for debugging                     |
| nodemon           | Automatically restarts the server during development |

🎨 Frontend Dependencies
| Package              | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| react                | Core library for building user interfaces                     |
| react-dom            | Renders React components to the DOM                           |
| react-router-dom     | Handles client-side routing and navigation                    |
| axios                | Makes HTTP requests to the backend API                        |
| tailwindcss          | Utility-first CSS framework for responsive UI design          |
| @headlessui/react    | Provides unstyled, accessible UI components                   |
| @heroicons/react     | Includes SVG icons for React projects                         |
| react-icons          | Provides a large set of popular icon packs                    |
| react-hook-form      | Manages form state and validation efficiently                 |
| react-toastify       | Displays success/error notifications in the UI                |
| @vitejs/plugin-react | Enables React fast refresh and JSX support in Vite            |
| vite                 | Frontend build tool for fast development and optimized builds |


3️⃣ Setup Environment Variables
Create a .env file in both frontend and backend directories.
.env (backend)
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
PORT=5000

.env (frontend)
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_key

4️⃣ Run the Application
(Backend)
-cd backend
-npm run dev
(Frontend)
-cd frontend
-npm run dev

🧠 Frontend Overview
-React Context API manages global user authentication state.
-User data persists in localStorage for seamless session continuity.
-Conditional Rendering protects routes and pages for authenticated users only.
-Tailwind CSS provides a clean, responsive, and minimal UI design.
-Integrated Google reCAPTCHA v2 ensures security against automated logins and spam.

🧱 Backend Overview
-Built on Express.js using MVC structure for scalability.
-JWT for secure token-based authentication.
-bcrypt for hashing passwords.
-Mailtrap SMTP sends OTP verification emails.
-Middleware handles errors and verifies tokens efficiently.

🧩 Development Notes
-Keep JWT_SECRET and database credentials out of version control.
-Use .gitignore to exclude .env and other sensitive files.
-Regularly rotate secrets and tokens.
-Optional: implement rate limiting to prevent brute-force attacks.

🤝 Contributing
1.Fork this repository
2.Create your feature branch (git checkout -b feature-name)
3.Commit changes (git commit -m "Add new feature")
4.Push to your branch (git push origin feature-name)
5.Open a Pull Request

📬 Contact
Maintainer: Sai Moon Seng Oo
📧 Email: (add your academic or dev email if allowed)
🌐 GitHub: @Saimoonsengoo
