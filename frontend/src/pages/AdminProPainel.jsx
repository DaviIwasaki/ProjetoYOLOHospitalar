import React from "react";
import "../styles/AdminProPainel.css"; 
import logo from "../assets/yolo-hospitalar-logo.png"; 

const AdminProPainel = () => {
  // Dados simulados
  const users = [
    { id: 1, name: "Dr. Sofia Garcia", role: "Chief Medical Officer", status: "Active" },
    { id: 2, name: "Nurse Elena Rodriguez", role: "Head Nurse", status: "Active" },
    { id: 3, name: "Admin. Marco Silva", role: "System Administrator", status: "Active" },
    { id: 4, name: "Dr. Albert Wesker", role: "Virologist", status: "Inactive" },
  ];

  return (
    // 1. CONTAINER 
    <div className="admin-wrapper">
      
      {/* 2. HEADER */}
      <header className="admin-header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="admin-logo" />
          <h1 className="admin-title">YOLO Hospitalar</h1>
        </div>
        <button className="btn-export">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export Data
        </button>
      </header>

      {/* 3. CONTEÚDO ROLÁVEL */}
      <main className="admin-content">
        
        {/* Card: New User */}
        <section className="card-section">
          <h2 className="card-title">New User</h2>
          <p className="card-desc">Register new staff members to the system.</p>
          <button className="btn-primary-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 8}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New User
          </button>
        </section>

        {/* Card: Active Users */}
        <section className="card-section no-padding">
          <div className="list-header-text">
            <h2 className="card-title">Active Users</h2>
            <p className="card-desc">Current staff with active access.</p>
          </div>

          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-avatar-placeholder">
                  {user.name.charAt(0)}
                </div>
                
                <div className="user-info">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-role">{user.role}</p>
                </div>

                <div className="user-actions">
                  <span className="badge-active">Active</span>
                  
                  {/* Edit Button */}
                  <button className="icon-action">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>

                  {/* Delete Button */}
                  <button className="icon-action">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 4. FOOTER FIXO  */}
      <footer className="admin-footer">
        <div className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span className="nav-text">Users</span>
        </div>
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          <span className="nav-text">Permissions</span>
        </div>
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span className="nav-text">Stock</span>
        </div>
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          <span className="nav-text">Integration</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminProPainel;