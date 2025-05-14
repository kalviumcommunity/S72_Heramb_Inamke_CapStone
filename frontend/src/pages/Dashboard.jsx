import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import useAuth from "../../useAuth";
import "../styles/DashboardStyles.css";
import { getGuestsByWedding, updateGuest, deleteGuest } from "../api";

const Dashboard = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("overview");
  const [guests, setGuests] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [weddingDate, setWeddingDate] = useState(null);
  const daysLeft = weddingDate ? Math.ceil((weddingDate - new Date()) / (1000 * 60 * 60 * 24)) : null;
  const [totalBudget, setTotalBudget] = useState(25000);
  const [spentBudget, setSpentBudget] = useState(12450);
  const [guestCount, setGuestCount] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [currentGuest, setCurrentGuest] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    status: "",
    partySize: 1,
  });
  const [pendingTasks, setPendingTasks] = useState(12);
  const [completedTasks, setCompletedTasks] = useState(34);

  useEffect(() => {
    if (user) {
      fetchGuests();
    }
  }, [user]);

  const fetchGuests = async () => {
    try {
      // Assuming wedding ID is available in user context or elsewhere
      const weddingId = "66718a9c776a750978e6f776";
      const guestsData = await getGuestsByWedding(weddingId);
      setGuests(guestsData);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  const handleOpenUpdateModal = (guest) => {
    setCurrentGuest(guest);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentGuest({});
  };

  const handleUpdateGuest = async () => {
    try {
      await updateGuest(currentGuest._id, currentGuest);
      handleCloseUpdateModal();
      fetchGuests();
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  };

  const handleDeleteGuest = async (guestId) => {
    await deleteGuest(guestId);
    fetchGuests();
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleWeddingDateChange = (event) => {
    setWeddingDate(new Date(event.target.value));
  };

  const handleTotalBudgetChange = (event) => {
    const newTotalBudget = Number(event.target.value);
    setTotalBudget(newTotalBudget);
    if (newTotalBudget === 0) {
      setSpentBudget(0);
    }
  };

  const handleGuestCountChange = (event) => {
    setGuestCount(Number(event.target.value));
  };

  const handlePendingTasksChange = (event) => {
    setPendingTasks(Number(event.target.value));
  };

  const handleCompletedTasksChange = (event) => {
    setCompletedTasks(Number(event.target.value));
  };

  return (
    <div className="dashboard-container">
      {/* Decorative elements */}
      <div className="decorative-flower flower-top-left">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#d88c8c" d="M50,0 C60,30 70,40 100,50 C70,60 60,70 50,100 C40,70 30,60 0,50 C30,40 40,30 50,0 Z" />
        </svg>
      </div>
      <div className="decorative-flower flower-bottom-right">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#d88c8c" d="M50,0 C60,30 70,40 100,50 C70,60 60,70 50,100 C40,70 30,60 0,50 C30,40 40,30 50,0 Z" />
        </svg>
      </div>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo">Eternal Love</div>
          <div className="user-info">
            <img 
              src={user?.photoURL || "https://ui-avatars.com/api/?size=40&name=User"} 
              alt="User" 
              className="user-avatar" 
            />
            <span className="user-name">{user?.displayName || "Couple"}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeModule === "overview" ? "active" : ""}`}
            onClick={() => setActiveModule("overview")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard Overview
          </button>

          <button
            className={`nav-item ${activeModule === "budget" ? "active" : ""}`}
            onClick={() => setActiveModule("budget")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Budget Tracker
          </button>

          <button
            className={`nav-item ${activeModule === "guests" ? "active" : ""}`}
            onClick={() => setActiveModule("guests")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Guest List Manager
          </button>

          <button
            className={`nav-item ${activeModule === "vendors" ? "active" : ""}`}
            onClick={() => setActiveModule("vendors")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Vendor Directory
          </button>

          <button
            className={`nav-item ${activeModule === "destination" ? "active" : ""}`}
            onClick={() => setActiveModule("destination")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Destination Wedding
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleSignOut} className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="module-title">
            {activeModule === "overview" && "Couple Dashboard"}
            {activeModule === "budget" && "Budget Tracker"}
            {activeModule === "guests" && "Guest List Manager"}
            {activeModule === "vendors" && "Vendor Directory"}
            {activeModule === "destination" && "Destination Wedding Module"}
          </h1>
          <div className="countdown-timer">
            <div className="countdown-value">{daysLeft}</div>
            <div className="countdown-label">Days until your wedding</div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h2>Wedding Date</h2>
              <input
                type="date"
                value={weddingDate ? weddingDate.toISOString().split('T')[0] : ""}
                onChange={handleWeddingDateChange}
                className="wedding-date-input"
                placeholder="Add your wedding date"
              />
              <p className="wedding-date-placeholder">Please add your wedding date</p>
            </div>
            <div className="dashboard-card">
              <h2>Budget Overview</h2>
              <input
                type="number"
                value={totalBudget}
                onChange={handleTotalBudgetChange}
                className="budget-input"
                placeholder="Set your total budget"
              />
              <p>Total Budget: ${totalBudget}</p>
              <p>Spent: ${spentBudget}</p>
              <p>Remaining: ${totalBudget - spentBudget}</p>
            </div>
            <div className="dashboard-card">
              <h2>Guest Overview</h2>
              <input
                type="number"
                value={guestCount}
                onChange={handleGuestCountChange}
                className="guest-input"
                placeholder="Set your total guests"
              />
              <p>Total Guests: {guestCount}</p>
              <p>Confirmed: {confirmedGuests}</p>
            </div>
            <div className="dashboard-card">
              <h2>Task Overview</h2>
              <input
                type="number"
                value={pendingTasks}
                onChange={handlePendingTasksChange}
                className="task-input"
                placeholder="Set pending tasks"
              />
              <input
                type="number"
                value={completedTasks}
                onChange={handleCompletedTasksChange}
                className="task-input"
                placeholder="Set completed tasks"
              />
              <p>Pending Tasks: {pendingTasks}</p>
              <p>Completed Tasks: {completedTasks}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 