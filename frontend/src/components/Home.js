import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ApplicationForm from "./systems/ApplicationForm";

// API URL'ini port 5000'e değiştiriyorum
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:8000"
  : "https://pyhton-sdubkft.onrender.com";

const Home = () => {
  const { t } = useTranslation();

  const systemThemes = {
    dark: "deathwatch-theme",
    fantasy: "pathfinder-theme",
    "classic-fantasy": "dnd-theme",
    cyberpunk: "cyberpunk-theme",
    gothic: "vampire-theme",
  };

  const systemRoutes = {
    deathwatch: "/deathwatch",
    pathfinder: "/pathfinder",
    dnd5e: "/dnd5e",
    "cyberpunk-red": "/cyberpunk-red",
    "vampire-v5": "/vampire-v5",
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      {/* Hero Section */}
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div
            className="hero-banner h-96 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center z-10">
              <div className="flex flex-col items-center justify-center mb-4">
                <img src="/sdu-bkft-logo.png" alt="SDU BKFT Logo" className="w-24 h-24 rounded-full bg-white p-2 mb-2" />
                <h1 className="text-3xl md:text-5xl font-bold text-white glow-text">
                  Süleyman Demirel Üniversitesi Bilim Kurgu ve Fantazya Topluluğu
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-4xl">⚔️</div>
                <div className="text-4xl">🐉</div>
                <div className="text-4xl">🌟</div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white glow-text mb-4">
            {t('home.welcomeTitle')}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            {t('home.welcomeDescription')}
          </p>
        </div>

        {/* Featured Image */}
        <div className="text-center mb-16">
          <img
            src="https://images.pexels.com/photos/7018123/pexels-photo-7018123.jpeg"
            alt="RPG Gaming Setup"
            className="rounded-xl shadow-2xl mx-auto max-w-2xl w-full"
          />
        </div>

        {/* Instagram Widget Section */}
        <div className="mb-16 flex flex-col items-center">
          <h3 className="text-3xl font-bold text-white glow-text text-center mb-8">
            Instagram'da Bizi Takip Edin
          </h3>
          <div className="w-full max-w-4xl">
            <iframe
              src="https://www.instagram.com/sdubkft/embed"
              title="SDU BKFT Instagram"
              width="100%"
              height="800"
              frameBorder="0"
              scrolling="no"
              allowtransparency="true"
              className="rounded-xl shadow-2xl bg-white w-full"
              style={{ minHeight: '700px' }}
            ></iframe>
          </div>
        </div>

        {/* Community Features */}
        <div className="fantasy-card p-8 rounded-xl">
          <h3 className="text-3xl font-bold text-white glow-text text-center mb-8">
            {t('home.featuresTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-lg font-bold text-white mb-2">{t('home.coreMechanics')}</h4>
              <p className="text-gray-300 text-sm">
                {t('home.coreMechanicsDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👤</div>
              <h4 className="text-lg font-bold text-white mb-2">{t('home.characterCreation')}</h4>
              <p className="text-gray-300 text-sm">
                {t('home.characterCreationDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚔️</div>
              <h4 className="text-lg font-bold text-white mb-2">{t('home.combatSystems')}</h4>
              <p className="text-gray-300 text-sm">
                {t('home.combatSystemsDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h4 className="text-lg font-bold text-white mb-2">{t('home.keyConcepts')}</h4>
              <p className="text-gray-300 text-sm">
                {t('home.keyConceptsDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
