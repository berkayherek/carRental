🚗 Car Rental Application
Overview
This project is a full-stack car rental application built with a React frontend and an Express backend. It uses Appwrite for authentication and database management, Docker for containerization, and GitHub Actions for CI/CD automation.

📂 Folder Structure
bash
Kopyala
carRental-main/
├── backend/          # Server-side code (Express, Appwrite, Authentication, Routes)
│   ├── controllers/  # Handles business logic
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── services/     # Appwrite service integrations
│   ├── .env          # Environment variables
│   ├── package.json  # Backend dependencies
│   ├── server.js     # Main backend server
│
├── frontend/         # Client-side code (React, React Router, Axios)
│   ├── src/         
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # React Context for state management
│   │   ├── pages/       # Application pages (Home, Login, Bookings)
│   │   ├── services/    # API calls to the backend
│   │   ├── App.js       # Main React component
│   │   ├── index.js     # React entry point
│   ├── public/          # Static assets (index.html)
│   ├── package.json     # Frontend dependencies
│
├── build/           # Build output for deployment
├── config/          # Configuration files (Appwrite, environment variables)
├── docker/          # Docker setup for containerization
├── .github/workflows/ # CI/CD configuration for GitHub Actions
├── docker-compose.yml # Docker Compose configuration
├── README.md        # Project documentation (This file)
🛠️ Technologies Used
Backend (Node.js + Express.js)
Express.js - Web framework for the REST API
Appwrite - Backend-as-a-service for authentication & database
bcryptjs - Password hashing
jsonwebtoken - JWT-based authentication
CORS - Cross-Origin Resource Sharing
dotenv - Environment variable management
Frontend (React.js)
React - Component-based UI library
React Router - Client-side routing
React Context API - Global state management
Axios - HTTP requests to the backend
Database & Authentication
Appwrite - Manages user authentication, database, and storage
Deployment & DevOps
Docker - Containerization for the frontend and backend
GitHub Actions - CI/CD for automated deployment
⚙️ Backend Configuration (.env File)
The backend is configured using Appwrite for database and authentication.


🐳 Running with Docker
1️⃣ Build and Run Using Docker Compose
sh
Kopyala
docker-compose up --build
This will start both backend and frontend in Docker containers.

🛠️ API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Log in a user
POST	/api/bookings/create	Create a car booking
GET	/api/bookings/user/:id	Fetch user bookings
GET	/api/cars	Get available cars
GET	/api/offices	Get rental office locations
📦 Deployment
This project uses GitHub Actions for CI/CD to deploy automatically to Render.

🔹 Deploying Backend
The backend is deployed as a web service on Render.
It listens for changes and automatically deploys when new code is pushed.
🔹 Deploying Frontend
The frontend is deployed as a static site on Render.
It runs npm run build and serves the frontend/build/ directory.
📌 Future Improvements
✅ Add Google Maps integration for rental locations
✅ Improve error handling and validations
✅ Implement Admin Panel for managing cars & bookings

👨‍💻 Contributors
Berkay Herek (@berkayherek)
📜 License
This project is open-source and licensed under the MIT License.

💬 Need Help?
For issues, please open a GitHub Issue. 🚀

Now you’re ready to start renting cars! 🚗🔥 Happy coding! 😊
