# 🎉 WedWise - Your Smart Wedding Planning Companion

## 💍 Overview
Planning a wedding can be overwhelming, but WedWise is here to make it effortless! Our all-in-one digital wedding planner helps couples manage everything—from setting budgets and booking venues to organizing guest lists and choosing vendors. Plus, if you're dreaming of a destination wedding, we've got curated options and travel suggestions just for you! 💕

## ✨ Key Features

### Frontend
#### 📌 Couple Dashboard
- A personalized dashboard displaying key wedding tasks, budget, and milestones.
- A countdown timer to your big day!

#### 💰 Budget Tracker
- An interactive tool to set and track your wedding budget across categories (venue, food, travel, etc.).

#### 📋 Guest List Manager
- Easily add, edit, and organize your guest list.
- Manage RSVPs in real-time (Attending / Not Attending / Undecided).

#### 🔎 Vendor Directory
- Browse and book vendors for venues, catering, photography, and more.
- Filter vendors by location, price, and reviews to find the perfect match.

#### ✈️ Destination Wedding Module
- Discover stunning destinations with pre-curated wedding packages.
- Get travel and accommodation suggestions for your guests.

### Backend
#### 🔐 User Authentication
- Secure login/signup for couples and vendors using JWT authentication.

#### ✅ Task Management System
- Create and track tasks like "Book Venue" or "Send Invitations."

#### 🏢 Vendor Management
- Vendor profiles with availability calendars and booking requests.

#### 💵 Budgeting APIs
- Seamlessly manage wedding budgets and expenses.

#### 🌍 Destination Suggestions
- Preloaded database of beautiful wedding destinations with images, descriptions, and packages.

### Database
- **Users** (id, name, email, role: couple/vendor)
- **Vendors** (id, name, type, location, price range)
- **Tasks** (id, title, status, due_date)
- **Expenses** (id, category, amount)
- **Destinations** (id, name, packages, details)

## 🚀 Advanced Features (Optional)
- **👨‍👩‍👧 Collaboration:** Invite family & friends to help with planning.
- **🧠 AI-Powered Recommendations:** Get personalized vendor & destination suggestions.
- **💳 Secure Payments:** Book vendors with Stripe or PayPal.
- **📊 Progress Tracker:** A checklist to keep track of wedding planning progress.
- **📱 Mobile App:** Plan on the go with an intuitive mobile version.

## 🛠 Tech Stack
- **Frontend:** React.js / Angular + Material-UI
- **Backend:** Node.js + Express.js / Python Django
- **Database:** MongoDB / PostgreSQL
- **Deployment:** AWS / GCP
- **Testing:** Jest for unit and integration testing
- **Extras:** Firebase (real-time RSVP updates), Twilio (SMS reminders)

## 🎯 Why WedWise?
- **Stress-Free Planning:** Keep everything in one place.
- **Scalable:** Start simple, add more features later.
- **Destination Wedding Perks:** Stand out with curated destination wedding support.

## 🧪 Testing with Jest
The project uses Jest for comprehensive testing across both frontend and backend:

### Backend Testing
- Unit tests for controllers and services
- Integration tests for API endpoints
- Database interaction tests
- Authentication flow tests

### Frontend Testing
- Component unit tests
- Integration tests for user flows
- API integration tests
- State management tests

### Running Tests
```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- Backend: API endpoints, controllers, and services
- Frontend: Components, hooks, and utilities
- Integration: End-to-end user flows

---

# 📅 Development Roadmap (MVP)

### **Phase 1: Planning & Design (1 Week)**
- Outline MVP features: authentication, dashboard, guest list, task management, vendor directory.
- Wireframe key pages using Figma/Adobe XD.
- Finalize tech stack: React, Node.js, MongoDB.

### **Phase 2: Authentication System (1 Week)**
- **Backend:** Set up JWT-based authentication.
- **Frontend:** Build signup/login pages with validation.

### **Phase 3: Couple Dashboard (1 Week)**
- **Frontend:** Display a countdown, links to key sections, and a warm welcome message.
- **Backend:** API to fetch user-specific data.

### **Phase 4: Guest List Manager (2 Weeks)**
- **Frontend:** Manage guests in a simple table format with CSV export.
- **Backend:** CRUD APIs for guest management.

### **Phase 5: Vendor Directory (2 Weeks)**
- **Frontend:** Vendor listings with search & filters.
- **Backend:** Vendor management APIs.

### **Phase 6: Task Management System (1 Week)**
- **Frontend:** Create & track tasks in a checklist format.
- **Backend:** CRUD APIs for tasks.

### **Phase 7: Final Touches & Deployment (1 Week)**
- Test all features thoroughly.
- Deploy frontend (Vercel/Netlify), backend (Render/Heroku), and database (MongoDB Atlas).

---

# 📌 Wireframe Concepts
- **Dashboard:** Simple layout with a countdown and links to guest list & task manager.
- **Guest List Manager:** Table format with guest details and RSVP status.
- **Vendor Directory:** Grid layout with search & filter options.

---

# 🚀 MVP Highlights
### 🎯 Core Features
- **Secure Authentication:** Couples & vendors can create accounts and log in.
- **Couple Dashboard:** An easy-to-use planning hub.
- **Guest List Management:** Organize and track RSVPs.
- **Vendor Directory:** Search & filter wedding service providers.
- **Task Manager:** Keep track of wedding to-dos.

### 🛠 Tech Stack for MVP
- **Frontend:** React.js / Vue.js + Bootstrap / Tailwind.
- **Backend:** Node.js + Express + MongoDB.
- **Authentication:** JWT for secure logins.
- **Deployment:** Vercel/Netlify (frontend) & Render/Heroku (backend).

### 💡 Why This MVP?
- **Essential Planning Tools:** Helps couples start planning right away.
- **Vendor Listings:** Bridges couples with service providers.
- **Scalability:** Future enhancements include budgeting, payments, and AI recommendations.

### 🎯 Future Upgrades
- **Budget Tracker**
- **Destination Wedding Module**
- **Task & RSVP Notifications**
- **Vendor Booking & Payments**

# Deployed Link:
 - Backend :- https://wedwise-capstone.onrender.com/
 - Frontend :- https://wedwise.vercel.app/

## 🚀 Quick Start with Docker

The easiest way to run WedWise is using Docker. Make sure you have Docker and Docker Compose installed on your system.

### Prerequisites
- Docker
- Docker Compose
- MongoDB (local or Atlas)

### Environment Setup
1. Create a `.env` file in the root directory with the following variables:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/wedwise

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Backend Configuration
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173

# Frontend Configuration
VITE_API_URL=http://localhost:5000
```

### Running with Docker
1. Build and start the containers:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Docker Commands
```bash
# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Restart containers
docker-compose restart

# Rebuild specific service
docker-compose up --build backend  # or frontend
```

### Docker Architecture
The application is containerized into two main services:

1. **Backend Service**
   - Node.js/Express API
   - Port: 5000
   - Features:
     - Hot-reloading for development
     - Health checks
     - MongoDB connection
     - JWT authentication

2. **Frontend Service**
   - React/Vite application
   - Port: 5173
   - Features:
     - Hot-reloading
     - Connected to backend API
     - Development mode enabled

### Docker Features
- Multi-stage builds for optimized images
- Non-root users for security
- Volume mounts for development
- Health checks for monitoring
- Network isolation
- Environment variable management