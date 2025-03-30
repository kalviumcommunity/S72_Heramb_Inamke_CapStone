import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import useAuth from "../../useAuth";
import "../styles/DashboardStyles.css";

const Dashboard = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("overview");

  // Placeholder data for demonstration
  const weddingDate = new Date(2024, 5, 15); // June 15, 2024
  const daysLeft = Math.ceil((weddingDate - new Date()) / (1000 * 60 * 60 * 24));
  const totalBudget = 25000;
  const spentBudget = 12450;
  const guestCount = 120;
  const confirmedGuests = 78;
  const pendingTasks = 12;
  const completedTasks = 34;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
              src={user?.photoURL || "https://via.placeholder.com/40"} 
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
          {/* Overview Module */}
          {activeModule === "overview" && (
            <div className="overview-module">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon budget-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">Budget</h3>
                    <div className="stat-value">${spentBudget.toLocaleString()}</div>
                    <div className="stat-subtitle">of ${totalBudget.toLocaleString()}</div>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${(spentBudget / totalBudget) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon guests-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">Guests</h3>
                    <div className="stat-value">{confirmedGuests}</div>
                    <div className="stat-subtitle">of {guestCount} invited</div>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${(confirmedGuests / guestCount) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon tasks-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">Tasks</h3>
                    <div className="stat-value">{completedTasks}</div>
                    <div className="stat-subtitle">of {completedTasks + pendingTasks} completed</div>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${(completedTasks / (completedTasks + pendingTasks)) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="recent-activity">
                <h2 className="section-title">Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">Booked Floral Arrangements</div>
                      <div className="activity-time">2 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">5 New Guest RSVPs</div>
                      <div className="activity-time">Yesterday</div>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">Updated Catering Budget</div>
                      <div className="activity-time">2 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Budget Tracker Module */}
          {activeModule === "budget" && (
            <div className="budget-module">
              <div className="budget-summary">
                <div className="budget-card total-budget">
                  <h3 className="budget-card-title">Total Budget</h3>
                  <div className="budget-card-value">${totalBudget.toLocaleString()}</div>
                </div>
                
                <div className="budget-card spent-budget">
                  <h3 className="budget-card-title">Spent</h3>
                  <div className="budget-card-value">${spentBudget.toLocaleString()}</div>
                </div>
                
                <div className="budget-card remaining-budget">
                  <h3 className="budget-card-title">Remaining</h3>
                  <div className="budget-card-value">${(totalBudget - spentBudget).toLocaleString()}</div>
                </div>
              </div>
              
              <div className="budget-breakdown">
                <h2 className="section-title">Budget Breakdown</h2>
                <div className="budget-categories">
                  <div className="budget-category">
                    <div className="category-header">
                      <h3 className="category-name">Venue</h3>
                      <div className="category-amount">$8,000</div>
                    </div>
                    <div className="category-progress">
                      <div className="progress-bar">
                        <div className="progress" style={{ width: '80%' }}></div>
                      </div>
                      <div className="category-status">$6,400 of $8,000</div>
                    </div>
                  </div>
                  
                  <div className="budget-category">
                    <div className="category-header">
                      <h3 className="category-name">Catering</h3>
                      <div className="category-amount">$6,000</div>
                    </div>
                    <div className="category-progress">
                      <div className="progress-bar">
                        <div className="progress" style={{ width: '50%' }}></div>
                      </div>
                      <div className="category-status">$3,000 of $6,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Guest List Manager Module */}
          {activeModule === "guests" && (
            <div className="guests-module">
              <div className="guest-stats">
                <div className="guest-stat-card">
                  <div className="guest-stat-value">{guestCount}</div>
                  <div className="guest-stat-label">Total Invited</div>
                </div>
                
                <div className="guest-stat-card">
                  <div className="guest-stat-value">{confirmedGuests}</div>
                  <div className="guest-stat-label">Confirmed</div>
                </div>
                
                <div className="guest-stat-card">
                  <div className="guest-stat-value">{guestCount - confirmedGuests - 15}</div>
                  <div className="guest-stat-label">Pending</div>
                </div>
                
                <div className="guest-stat-card">
                  <div className="guest-stat-value">15</div>
                  <div className="guest-stat-label">Declined</div>
                </div>
              </div>
              
              <div className="guest-list-container">
                <div className="guest-list-header">
                  <h2 className="section-title">Guest List</h2>
                  <div className="guest-list-actions">
                    <input type="text" placeholder="Search guests..." className="guest-search" />
                    <button className="add-guest-button">Add Guest</button>
                  </div>
                </div>
                
                <table className="guest-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Party Size</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John & Sarah Smith</td>
                      <td>john.smith@example.com</td>
                      <td>(555) 123-4567</td>
                      <td><span className="status-confirmed">Confirmed</span></td>
                      <td>2</td>
                      <td className="guest-actions">
                        <button className="action-button edit-button">Edit</button>
                        <button className="action-button delete-button">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Vendor Directory Module */}
          {activeModule === "vendors" && (
            <div className="vendors-module">
              <div className="vendor-categories">
                <button className="vendor-category active">All Vendors</button>
                <button className="vendor-category">Venues</button>
                <button className="vendor-category">Catering</button>
                <button className="vendor-category">Photography</button>
                <button className="vendor-category">Florists</button>
              </div>
              
              <div className="vendor-search">
                <input type="text" placeholder="Search vendors..." className="vendor-search-input" />
                <button className="vendor-search-button">Search</button>
              </div>
              
              <div className="vendor-grid">
                <div className="vendor-card">
                  <div className="vendor-image">
                    <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Elegant Events Venue" />
                  </div>
                  <div className="vendor-info">
                    <h3 className="vendor-name">Elegant Events Venue</h3>
                    <div className="vendor-category-tag">Venue</div>
                    <div className="vendor-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-count">(48 reviews)</span>
                    </div>
                    <p className="vendor-description">A beautiful waterfront venue with stunning views and elegant ballrooms.</p>
                    <button className="vendor-contact-button">Contact</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Destination Wedding Module */}
          {activeModule === "destination" && (
            <div className="destination-module">
              <div className="destination-header">
                <h2 className="section-title">Popular Wedding Destinations</h2>
                <p className="destination-subtitle">Explore beautiful locations for your dream destination wedding</p>
              </div>
              
              <div className="destination-grid">
                <div className="destination-card">
                  <div className="destination-image">
                    <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80" alt="Santorini, Greece" />
                  </div>
                  <div className="destination-info">
                    <h3 className="destination-name">Santorini, Greece</h3>
                    <p className="destination-description">Stunning white buildings, blue domes, and breathtaking sunsets over the Aegean Sea.</p>
                    <div className="destination-details">
                      <div className="detail-item">
                        <span className="detail-label">Best Season:</span>
                        <span className="detail-value">May-October</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Avg. Cost:</span>
                        <span className="detail-value">$$$</span>
                      </div>
                    </div>
                    <button className="destination-explore-button">Explore Packages</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 