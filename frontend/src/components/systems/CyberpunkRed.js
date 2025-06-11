import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CyberpunkRed = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 cyberpunk-theme">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="hero-banner h-64 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/3700369/pexels-photo-3700369.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 glow-text mb-4">
                {t('cyberpunk.title')}
              </h1>
              <p className="text-xl text-white">
                {t('cyberpunk.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Lore Section - Moved to top */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">
              {t('lore.cyberpunk.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-cyan-400">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  {t('lore.cyberpunk.fourthWar')}
                </h3>
                <div className="stat-block bg-black bg-opacity-70">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.cyberpunk.fourthWarText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-magenta-400">
                <h3 className="text-2xl font-bold text-magenta-400 mb-4">
                  {t('lore.cyberpunk.nightCity')}
                </h3>
                <div className="stat-block bg-black bg-opacity-70">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.cyberpunk.nightCityText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-yellow-400">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  {t('lore.cyberpunk.corporateOrder')}
                </h3>
                <div className="stat-block bg-black bg-opacity-70">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.cyberpunk.corporateOrderText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-red-400">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  {t('lore.cyberpunk.netrunners')}
                </h3>
                <div className="stat-block bg-black bg-opacity-70">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.cyberpunk.netrunnersText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-green-500 mb-4">
                  {t('lore.cyberpunk.edgeRunners')}
                </h3>
                <div className="stat-block bg-black bg-opacity-70">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.cyberpunk.edgeRunnersText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-purple-400">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">
                  {t('lore.cyberpunk.technologyHumanity')}
                </h3>
                <div className="stat-block bg-black bg-opacity-70">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.cyberpunk.technologyHumanityText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Core Mechanics */}
            <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-cyan-400">
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                {t('cyberpunk.coreSystem.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-70">
                <h3 className="text-xl font-bold mb-3 text-white">{t('cyberpunk.coreSystem.diceSystem')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('cyberpunk.coreSystem.primary')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.roll')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.critSuccess')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.critFailure')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.difficulty')}</strong></li>
                </ul>
              </div>
              
              <div className="stat-block bg-black bg-opacity-70">
                <h3 className="text-xl font-bold mb-3 text-white">{t('cyberpunk.coreSystem.keyConcepts')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('cyberpunk.coreSystem.style')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.attitude')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.edge')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.cybernetics')}</strong></li>
                  <li><strong>{t('cyberpunk.coreSystem.net')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Character Creation */}
            <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-magenta-400">
              <h2 className="text-3xl font-bold text-magenta-400 mb-4">
                {t('cyberpunk.character.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-70">
                <h3 className="text-xl font-bold mb-3 text-white">{t('cyberpunk.character.stats')}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>{t('cyberpunk.character.int')}</strong></p>
                    <p><strong>{t('cyberpunk.character.ref')}</strong></p>
                    <p><strong>{t('cyberpunk.character.tech')}</strong></p>
                    <p><strong>{t('cyberpunk.character.cool')}</strong></p>
                  </div>
                  <div>
                    <p><strong>{t('cyberpunk.character.attr')}</strong></p>
                    <p><strong>{t('cyberpunk.character.luck')}</strong></p>
                    <p><strong>{t('cyberpunk.character.ma')}</strong></p>
                    <p><strong>{t('cyberpunk.character.body')}</strong></p>
                    <p><strong>{t('cyberpunk.character.emp')}</strong></p>
                  </div>
                </div>
              </div>

              <div className="stat-block bg-black bg-opacity-70">
                <h3 className="text-xl font-bold mb-3 text-white">{t('cyberpunk.character.roles')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Solo" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Solo</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.solo')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Netrunner" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Netrunner</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.netrunner')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Tech" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Tech</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.tech')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Medtech" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Medtech</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.medtech')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Media" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Media</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.media')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" alt="Exec" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Exec</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.exec')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Lawman" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Lawman</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.lawman')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Fixer" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Fixer</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.fixer')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Nomad" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">Nomad</h4>
                      <p className="text-sm text-gray-300">{t('cyberpunk.character.nomad')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trivia */}
            <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-yellow-400">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                {t('cyberpunk.trivia.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-70">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li>{t('cyberpunk.trivia.fact1')}</li>
                  <li>{t('cyberpunk.trivia.fact2')}</li>
                  <li>{t('cyberpunk.trivia.fact3')}</li>
                  <li>{t('cyberpunk.trivia.fact4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Combat System */}
            <div className="rule-section mb-8 bg-black bg-opacity-50 border-l-4 border-red-400">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('cyberpunk.combat.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-70">
                <h3 className="text-xl font-bold mb-3 text-white">{t('cyberpunk.combat.combatFlow')}</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li><strong>{t('cyberpunk.combat.initiative')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.actions')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.attackRoll')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.damage')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.location')}</strong></li>
                </ol>
              </div>

              <div className="stat-block bg-black bg-opacity-70">
                <h3 className="text-xl font-bold mb-3 text-white">{t('cyberpunk.combat.damageHealth')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('cyberpunk.combat.hitPoints')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.wounded')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.mortally')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.armorSP')}</strong></li>
                  <li><strong>{t('cyberpunk.combat.critical')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16"
                alt="Cyberpunk City"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>

            {/* History */}
            <div className="rule-section bg-black bg-opacity-50 border-l-4 border-green-500">
              <h2 className="text-3xl font-bold text-green-500 mb-4">
                {t('cyberpunk.history.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-70">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li><strong>{t('cyberpunk.history.origins')}</strong></li>
                  <li><strong>{t('cyberpunk.history.evolution')}</strong></li>
                  <li><strong>{t('cyberpunk.history.red')}</strong></li>
                  <li><strong>{t('cyberpunk.history.influence')}</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            to="/dnd5e"
            className="fantasy-btn mr-4"
          >
            {t('common.previous')}: D&D 5e
          </Link>
          <Link
            to="/vampire-v5"
            className="fantasy-btn"
          >
            {t('common.next')}: Vampire V5 →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkRed;
