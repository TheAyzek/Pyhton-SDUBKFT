import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import "./i18n";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import DeathWatch from "./components/systems/DeathWatch";
import Pathfinder from "./components/systems/Pathfinder";
import DnD5e from "./components/systems/DnD5e";
import CyberpunkRed from "./components/systems/CyberpunkRed";
import VampireV5 from "./components/systems/VampireV5";
import ApplicationForm from "./components/systems/ApplicationForm";
import AdminLogin from "./components/systems/AdminLogin";
import AdminLayout from "./components/systems/AdminLayout";
import AdminPanel from "./components/systems/AdminPanel";
import AdminDashboard from "./components/AdminDashboard";
import SpotifyPlayer from "./components/SpotifyPlayer";

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center text-white text-xl">Yükleniyor... / Loading...</div>}>
      <div className="App min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 m-0 p-0">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application-form" element={<ApplicationForm />} />
            <Route path="/deathwatch" element={<DeathWatch />} />
            <Route path="/pathfinder" element={<Pathfinder />} />
            <Route path="/dnd5e" element={<DnD5e />} />
            <Route path="/cyberpunk-red" element={<CyberpunkRed />} />
            <Route path="/vampire-v5" element={<VampireV5 />} />
            <Route path="/admin" element={<AdminLogin />} />
            
            {/* Admin Layout Routes */}
            <Route path="/admin-panel" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="panel" element={<AdminPanel />} />
            </Route>
          </Routes>
          
          {/* Spotify Player */}
          <SpotifyPlayer />
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
