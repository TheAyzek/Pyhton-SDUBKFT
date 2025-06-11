import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

// API URL'ini environment'a göre ayarla
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5000/api"
  : "https://sdu-bkft-backend.vercel.app/api";

const AdminLayout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminUser = localStorage.getItem("adminLoggedInUser");
    if (token && adminUser) {
      setLoggedIn(true);
      setUsername(adminUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedInUser");
    localStorage.removeItem("adminLoggedIn");
    setLoggedIn(false);
    setUsername("");
    window.location.href = "/admin";
  };

  if (!loggedIn) {
    return <div>Yetkilendirme gerekli...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      {/* Admin Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-300">SDU BKFT Admin Panel</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Hoş geldin, {username}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                Ana Sayfa
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Sub Navigation - Fixed */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-gray-700 border-b border-gray-600 shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 py-4">
            <Link 
              to="/admin-panel/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/admin-panel/dashboard" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-gray-600"
              }`}
            >
              📊 Dashboard
            </Link>
            <Link 
              to="/admin-panel/panel"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/admin-panel/panel" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-gray-600"
              }`}
            >
              ⚙️ Yönetim Paneli
            </Link>
          </nav>
        </div>
      </div>

      {/* Content Area - Adjusted for fixed header */}
      <div className="container mx-auto px-4 py-8" style={{ marginTop: '120px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout; 