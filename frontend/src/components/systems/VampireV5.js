import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VampireV5 = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 vampire-theme">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="hero-banner h-64 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.pexels.com/photos/6056490/pexels-photo-6056490.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-red-500 glow-text mb-4">
                {t('vampire.title')}
              </h1>
              <p className="text-xl text-gray-200">
                {t('vampire.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Lore Section - Moved to top */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-red-500 mb-4">
              {t('lore.vampire.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-red-500 mb-4">
                  {t('lore.vampire.hiddenWorld')}
                </h3>
                <div className="stat-block bg-black bg-opacity-80">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.vampire.hiddenWorldText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-purple-500">
                <h3 className="text-2xl font-bold text-purple-500 mb-4">
                  {t('lore.vampire.camarilla')}
                </h3>
                <div className="stat-block bg-black bg-opacity-80">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.vampire.camarillaText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-yellow-500">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  {t('lore.vampire.anarchMovement')}
                </h3>
                <div className="stat-block bg-black bg-opacity-80">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.vampire.anarchMovementText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-green-500 mb-4">
                  {t('lore.vampire.masquerade')}
                </h3>
                <div className="stat-block bg-black bg-opacity-80">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.vampire.masqueradeText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-blue-500 mb-4">
                  {t('lore.vampire.beastWithin')}
                </h3>
                <div className="stat-block bg-black bg-opacity-80">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.vampire.beastWithinText')}
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
            <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-red-500">
              <h2 className="text-3xl font-bold text-red-500 mb-4">
                {t('vampire.coreSystem.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-80">
                <h3 className="text-xl font-bold mb-3 text-white">{t('vampire.coreSystem.diceSystem')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('vampire.coreSystem.dicePool')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.success')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.critical')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.messyCrit')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.bestialFailure')}</strong></li>
                </ul>
              </div>
              
              <div className="stat-block bg-black bg-opacity-80">
                <h3 className="text-xl font-bold mb-3 text-white">{t('vampire.coreSystem.hunger')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('vampire.coreSystem.hungerDice')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.hungerLevels')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.compulsion')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.feeding')}</strong></li>
                  <li><strong>{t('vampire.coreSystem.beast')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Character Creation */}
            <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-purple-500">
              <h2 className="text-3xl font-bold text-purple-500 mb-4">
                {t('vampire.character.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-80">
                <h3 className="text-xl font-bold mb-3 text-white">{t('vampire.character.attributes')}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-bold text-red-400">{t('vampire.character.physical')}</p>
                    <p><strong>{t('vampire.character.strength')}</strong></p>
                    <p><strong>{t('vampire.character.dexterity')}</strong></p>
                    <p><strong>{t('vampire.character.stamina')}</strong></p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400">{t('vampire.character.social')}</p>
                    <p><strong>{t('vampire.character.charisma')}</strong></p>
                    <p><strong>{t('vampire.character.manipulation')}</strong></p>
                    <p><strong>{t('vampire.character.composure')}</strong></p>
                  </div>
                  <div>
                    <p className="font-bold text-green-400">{t('vampire.character.mental')}</p>
                    <p><strong>{t('vampire.character.intelligence')}</strong></p>
                    <p><strong>{t('vampire.character.wits')}</strong></p>
                    <p><strong>{t('vampire.character.resolve')}</strong></p>
                  </div>
                </div>
              </div>

              <div className="stat-block bg-black bg-opacity-80">
                <h3 className="text-xl font-bold mb-3 text-white">{t('vampire.character.clans')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Brujah" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Brujah</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.brujah')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Gangrel" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Gangrel</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.gangrel')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Malkavian" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Malkavian</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.malkavian')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Nosferatu" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Nosferatu</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.nosferatu')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Toreador" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Toreador</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.toreador')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Tremere" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Tremere</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.tremere')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" alt="Ventrue" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Ventrue</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.ventrue')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Banu Haqim" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Banu Haqim</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.banuHaqim')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Hecata" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Hecata</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.hecata')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="The Ministry" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">The Ministry</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.ministry')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Ravnos" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Ravnos</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.ravnos')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Salubri" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Salubri</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.salubri')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-40 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Tzimisce" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Tzimisce</h4>
                      <p className="text-sm text-gray-300">{t('vampire.character.tzimisce')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trivia */}
            <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-yellow-500">
              <h2 className="text-3xl font-bold text-yellow-500 mb-4">
                {t('vampire.trivia.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-80">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li>{t('vampire.trivia.fact1')}</li>
                  <li>{t('vampire.trivia.fact2')}</li>
                  <li>{t('vampire.trivia.fact3')}</li>
                  <li>{t('vampire.trivia.fact4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Combat System */}
            <div className="rule-section mb-8 bg-black bg-opacity-70 border-l-4 border-yellow-500">
              <h2 className="text-3xl font-bold text-yellow-500 mb-4">
                {t('vampire.combat.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-80">
                <h3 className="text-xl font-bold mb-3 text-white">{t('vampire.combat.combatFlow')}</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li><strong>{t('vampire.combat.initiative')}</strong></li>
                  <li><strong>{t('vampire.combat.declare')}</strong></li>
                  <li><strong>{t('vampire.combat.roll')}</strong></li>
                  <li><strong>{t('vampire.combat.damage')}</strong></li>
                  <li><strong>{t('vampire.combat.frenzy')}</strong></li>
                </ol>
              </div>

              <div className="stat-block bg-black bg-opacity-80">
                <h3 className="text-xl font-bold mb-3 text-white">{t('vampire.combat.damageTypes')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('vampire.combat.superficial')}</strong></li>
                  <li><strong>{t('vampire.combat.aggravated')}</strong></li>
                  <li><strong>{t('vampire.combat.willpower')}</strong></li>
                  <li><strong>{t('vampire.combat.staking')}</strong></li>
                </ul>
              </div>

              <div className="stat-block bg-black bg-opacity-80">
                <h3 className="text-xl font-bold mb-3 text-white">{t('vampire.combat.frenzyTypes')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('vampire.combat.fury')}</strong></li>
                  <li><strong>{t('vampire.combat.terror')}</strong></li>
                  <li><strong>{t('vampire.combat.hunger')}</strong></li>
                  <li><strong>{t('vampire.combat.compulsion')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="mb-8">
              <img
                src="https://images.pexels.com/photos/1170070/pexels-photo-1170070.jpeg"
                alt="Gothic Interior"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>

            {/* History */}
            <div className="rule-section bg-black bg-opacity-70 border-l-4 border-green-500">
              <h2 className="text-3xl font-bold text-green-500 mb-4">
                {t('vampire.history.title')}
              </h2>
              <div className="stat-block bg-black bg-opacity-80">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li><strong>{t('vampire.history.origins')}</strong></li>
                  <li><strong>{t('vampire.history.editions')}</strong></li>
                  <li><strong>{t('vampire.history.influence')}</strong></li>
                  <li><strong>{t('vampire.history.modern')}</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            to="/cyberpunk-red"
            className="fantasy-btn mr-4"
          >
            {t('common.previous')}: Cyberpunk RED
          </Link>
          <Link
            to="/"
            className="fantasy-btn"
          >
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VampireV5;
