import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: "/application-form", name: "Oyun Başvuru", icon: "📝" },
  ];

  const frpItems = [
    { path: "/deathwatch", name: t('navigation.deathwatch'), icon: "⚔️" },
    { path: "/pathfinder", name: t('navigation.pathfinder'), icon: "🗡️" },
    { path: "/dnd5e", name: t('navigation.dnd5e'), icon: "🐉" },
    { path: "/cyberpunk-red", name: t('navigation.cyberpunkRed'), icon: "🌃" },
    { path: "/vampire-v5", name: t('navigation.vampireV5'), icon: "🧛" },
  ];

  const [frpOpen, setFrpOpen] = useState(false);

  return (
    <nav className="fantasy-card fixed top-0 left-0 right-0 z-50 backdrop-blur-lg m-0 p-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/sdu-bkft-logo.png" alt="SDU BKFT Logo" className="w-12 h-12 rounded-full bg-white p-1" />
            <span className="text-xl font-bold text-white glow-text">
              SDU BKFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* FRP Sistemleri - Sol */}
            <div className="relative">
              <button
                onClick={() => setFrpOpen((v) => !v)}
                onBlur={() => setTimeout(() => setFrpOpen(false), 150)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 focus:outline-none"
              >
                <span className="font-medium">FRP Sistemleri</span>
                <svg className={`w-4 h-4 transition-transform ${frpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {frpOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-black bg-opacity-90 rounded-lg shadow-lg z-50">
                  {frpItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        location.pathname === item.path
                          ? "bg-white bg-opacity-20 text-yellow-300 glow-text"
                          : "text-white hover:bg-white hover:bg-opacity-10"
                      }`}
                      onClick={() => setFrpOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Orta Menü */}
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-white bg-opacity-20 text-yellow-300 glow-text"
                      : "text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Sağ Menü */}
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === "/admin"
                    ? "bg-white bg-opacity-20 text-yellow-300 glow-text"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <span className="text-lg">⚙️</span>
                <span className="font-medium">Yönetim</span>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                }`}
              />
              <span
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out translate-y-2 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out translate-y-4 ${
                  isOpen ? "-rotate-45 -translate-y-2" : "translate-y-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-2 pt-4 border-t border-white border-opacity-20">
            {/* FRP Sistemleri - Mobil */}
            <div className="relative">
              <button
                onClick={() => setFrpOpen((v) => !v)}
                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 focus:outline-none w-full justify-between"
              >
                <span className="font-medium">FRP Sistemleri</span>
                <svg className={`w-4 h-4 transition-transform ${frpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {frpOpen && (
                <div className="mt-2 w-full bg-black bg-opacity-90 rounded-lg shadow-lg z-50">
                  {frpItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => { setFrpOpen(false); setIsOpen(false); }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        location.pathname === item.path
                          ? "bg-white bg-opacity-20 text-yellow-300 glow-text"
                          : "text-white hover:bg-white hover:bg-opacity-10"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Orta Menü - Mobil */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-white bg-opacity-20 text-yellow-300 glow-text"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* Yönetim - Mobil */}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === "/admin"
                  ? "bg-white bg-opacity-20 text-yellow-300 glow-text"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <span className="text-xl">⚙️</span>
              <span className="font-medium">Yönetim</span>
            </Link>

            <div className="flex justify-center pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
