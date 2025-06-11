import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DeathWatch = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 deathwatch-theme">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="hero-banner h-64 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1529981188441-8a2e6fe30103')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-red-400 glow-text mb-4">
                {t('deathwatch.title')}
              </h1>
              <p className="text-xl text-gray-200">
                {t('deathwatch.subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Core Mechanics */}
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('deathwatch.coreSystem.title')}
              </h2>
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('deathwatch.coreSystem.diceSystem')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('deathwatch.coreSystem.primary')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.success')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.degrees')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.critSuccess')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.critFailure')}</strong></li>
                </ul>
              </div>
              
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('deathwatch.coreSystem.keyConcepts')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('deathwatch.coreSystem.spaceMarines')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.deathwatchDesc')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.killTeams')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.requisition')}</strong></li>
                  <li><strong>{t('deathwatch.coreSystem.renown')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Character Creation */}
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('deathwatch.character.title')}
              </h2>
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('deathwatch.character.characteristics')}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>{t('deathwatch.character.ws')}</strong></p>
                    <p><strong>{t('deathwatch.character.bs')}</strong></p>
                    <p><strong>{t('deathwatch.character.strength')}</strong></p>
                    <p><strong>{t('deathwatch.character.toughness')}</strong></p>
                  </div>
                  <div>
                    <p><strong>{t('deathwatch.character.agility')}</strong></p>
                    <p><strong>{t('deathwatch.character.intelligence')}</strong></p>
                    <p><strong>{t('deathwatch.character.perception')}</strong></p>
                    <p><strong>{t('deathwatch.character.willpower')}</strong></p>
                    <p><strong>{t('deathwatch.character.fellowship')}</strong></p>
                  </div>
                </div>
              </div>

              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('deathwatch.character.chapterSelection')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li><strong>{t('deathwatch.character.ultramarines')}</strong></li>
                  <li><strong>{t('deathwatch.character.imperialFists')}</strong></li>
                  <li><strong>{t('deathwatch.character.bloodAngels')}</strong></li>
                  <li><strong>{t('deathwatch.character.spaceWolves')}</strong></li>
                  <li><strong>{t('deathwatch.character.darkAngels')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Trivia */}
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('deathwatch.trivia.title')}
              </h2>
              <div className="stat-block">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li>{t('deathwatch.trivia.fact1')}</li>
                  <li>{t('deathwatch.trivia.fact2')}</li>
                  <li>{t('deathwatch.trivia.fact3')}</li>
                  <li>{t('deathwatch.trivia.fact4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Combat System */}
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('deathwatch.combat.title')}
              </h2>
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('deathwatch.combat.combatFlow')}</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li><strong>{t('deathwatch.combat.initiative')}</strong></li>
                  <li><strong>{t('deathwatch.combat.actions')}</strong></li>
                  <li><strong>{t('deathwatch.combat.attackRoll')}</strong></li>
                  <li><strong>{t('deathwatch.combat.damage')}</strong></li>
                  <li><strong>{t('deathwatch.combat.armor')}</strong></li>
                </ol>
              </div>

              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('deathwatch.combat.specialRules')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('deathwatch.combat.righteousFury')}</strong></li>
                  <li><strong>{t('deathwatch.combat.fatePoints')}</strong></li>
                  <li><strong>{t('deathwatch.combat.squadMode')}</strong></li>
                  <li><strong>{t('deathwatch.combat.hordeRules')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1735016662106-32e81bdeec9f"
                alt="Warhammer 40k Miniatures"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>

            {/* History */}
            <div className="rule-section">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('deathwatch.history.title')}
              </h2>
              <div className="stat-block">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li><strong>{t('deathwatch.history.origins')}</strong></li>
                  <li><strong>{t('deathwatch.history.purpose')}</strong></li>
                  <li><strong>{t('deathwatch.history.structure')}</strong></li>
                  <li><strong>{t('deathwatch.history.legacy')}</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="fantasy-btn mr-4"
          >
            {t('common.backToHome')}
          </Link>
          <Link
            to="/pathfinder"
            className="fantasy-btn"
          >
            {t('common.next')}: Pathfinder →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeathWatch;