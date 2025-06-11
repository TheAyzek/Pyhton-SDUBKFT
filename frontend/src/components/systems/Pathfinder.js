import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Pathfinder = () => {
  const { t } = useTranslation();
  const [modalImg, setModalImg] = useState(null);

  const openModal = (src, alt) => setModalImg({ src, alt });
  const closeModal = (e) => {
    if (e.target.id === "modal-bg") setModalImg(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 pathfinder-theme">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="hero-banner h-64 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1697851429014-8b5f5fb76313')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-600 glow-text mb-4">
                {t('pathfinder.title')}
              </h1>
              <p className="text-xl text-gray-800 font-bold">
                {t('pathfinder.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Lore Section - Moved to top */}
        <div className="rule-section mb-8 bg-black bg-opacity-30">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4">
            {t('pathfinder.title')}
          </h2>
          <div className="stat-block bg-black bg-opacity-40">
            <p className="text-gray-200 mb-4">
              {t('pathfinder.golarionText')}
            </p>
            <p className="text-gray-200 mb-4">
              {t('pathfinder.pantheonText')}
            </p>
            <p className="text-gray-200">
              {t('pathfinder.ancientCivilizationsText')}
            </p>
          </div>
        </div>

        {/* Core System */}
        <div className="rule-section mb-8 bg-black bg-opacity-30">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4">
            {t('pathfinder.coreSystem.title')}
          </h2>
          <div className="stat-block bg-black bg-opacity-40">
            <h3 className="text-xl font-bold mb-3 text-white">{t('pathfinder.coreSystem.diceSystem')}</h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li><strong>{t('pathfinder.coreSystem.primary')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.roll')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.critSuccess')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.critFailure')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.skillChecks')}</strong></li>
            </ul>
          </div>

          <div className="stat-block bg-black bg-opacity-40">
            <h3 className="text-xl font-bold mb-3 text-white">{t('pathfinder.coreSystem.keyConcepts')}</h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li><strong>{t('pathfinder.coreSystem.bab')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.savingThrows')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.ac')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.hitPoints')}</strong></li>
              <li><strong>{t('pathfinder.coreSystem.feats')}</strong></li>
            </ul>
          </div>
        </div>

        {/* Character Creation */}
        <div className="rule-section mb-8 bg-black bg-opacity-30">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4">
            {t('pathfinder.character.title')}
          </h2>
          <div className="stat-block bg-black bg-opacity-40">
            <h3 className="text-xl font-bold mb-3 text-white">{t('pathfinder.character.abilityScores')}</h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li><strong>{t('pathfinder.character.strength')}</strong></li>
              <li><strong>{t('pathfinder.character.dexterity')}</strong></li>
              <li><strong>{t('pathfinder.character.constitution')}</strong></li>
              <li><strong>{t('pathfinder.character.intelligence')}</strong></li>
              <li><strong>{t('pathfinder.character.wisdom')}</strong></li>
              <li><strong>{t('pathfinder.character.charisma')}</strong></li>
            </ul>
          </div>
        </div>

        <div>
          {/* Combat System */}
          <div className="rule-section mb-8 bg-black bg-opacity-30">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">
              {t('pathfinder.combat.title')}
            </h2>
            <div className="stat-block bg-black bg-opacity-40">
              <h3 className="text-xl font-bold mb-3 text-white">{t('pathfinder.combat.combatRound')}</h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-2">
                <li><strong>{t('pathfinder.combat.initiative')}</strong></li>
                <li><strong>{t('pathfinder.combat.actions')}</strong></li>
                <li><strong>{t('pathfinder.combat.attackRoll')}</strong></li>
                <li><strong>{t('pathfinder.combat.damage')}</strong></li>
                <li><strong>{t('pathfinder.combat.acCheck')}</strong></li>
              </ol>
            </div>

            <div className="stat-block bg-black bg-opacity-40">
              <h3 className="text-xl font-bold mb-3 text-white">{t('pathfinder.combat.specialCombat')}</h3>
              <ul className="list-disc list-inside text-gray-200 space-y-2">
                <li><strong>{t('pathfinder.combat.flanking')}</strong></li>
                <li><strong>{t('pathfinder.combat.opportunity')}</strong></li>
                <li><strong>{t('pathfinder.combat.criticalHits')}</strong></li>
                <li><strong>{t('pathfinder.combat.spellcasting')}</strong></li>
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="mb-8">
            <img
              src="/Pathfinder/page-art.jpg"
              alt="Medieval Warriors"
              className="rounded-xl shadow-2xl w-full"
            />
          </div>

          {/* History */}
          <div className="rule-section mb-8 bg-black bg-opacity-30">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">
              {t('pathfinder.history.title')}
            </h2>
            <div className="stat-block bg-black bg-opacity-40">
              <ul className="list-disc list-inside text-gray-200 space-y-2">
                <li><strong>{t('pathfinder.history.origins')}</strong></li>
                <li><strong>{t('pathfinder.history.development')}</strong></li>
                <li><strong>{t('pathfinder.history.success')}</strong></li>
                <li><strong>{t('pathfinder.history.legacy')}</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Classes */}
          <div className="rule-section bg-black bg-opacity-30">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">
              {t('pathfinder.character.coreClasses')}
            </h2>
            <div className="stat-block bg-black bg-opacity-40">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/Fighter.png" alt="Fighter" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/Fighter.png", "Fighter")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Fighter</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.fighter')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/wizard.png" alt="Wizard" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/wizard.png", "Wizard")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Wizard</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.wizard')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/Cleric.png" alt="Cleric" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/Cleric.png", "Cleric")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Cleric</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.cleric')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/rogue.png" alt="Rogue" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/rogue.png", "Rogue")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Rogue</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.rogue')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/ranger.png" alt="Ranger" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/ranger.png", "Ranger")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Ranger</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.ranger')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/barbarian.jpg" alt="Barbarian" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/barbarian.jpg", "Barbarian")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Barbarian</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.barbarian')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/bard.png" alt="Bard" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/bard.png", "Bard")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Bard</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.bard')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/sorcerer.jpg" alt="Sorcerer" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/sorcerer.jpg", "Sorcerer")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Sorcerer</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.sorcerer')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/monk.png" alt="Monk" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/monk.png", "Monk")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Monk</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.monk')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/paladin.png" alt="Paladin" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/paladin.png", "Paladin")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Paladin</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.paladin')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Class/druid.png" alt="Druid" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onClick={() => openModal("/Pathfinder/Class/druid.png", "Druid")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Druid</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.druid')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Races */}
          <div className="rule-section bg-black bg-opacity-30">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">
              {t('pathfinder.character.races')}
            </h2>
            <div className="stat-block bg-black bg-opacity-40">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/Human.jpg" alt="Human" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/Human.jpg", "Human")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Human</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.human')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/elf.png" alt="Elf" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/elf.png", "Elf")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Elf</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.elf')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/dwarf.png" alt="Dwarf" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/dwarf.png", "Dwarf")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Dwarf</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.dwarf')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/Halfling.jpg" alt="Halfling" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/Halfling.jpg", "Halfling")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Halfling</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.halfling')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/Gnome.jpg" alt="Gnome" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/Gnome.jpg", "Gnome")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Gnome</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.gnome')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/halforc.jpg" alt="Half-Orc" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/halforc.jpg", "Half-Orc")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Half-Orc</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.halfOrc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/Half-elf.jpg" alt="Half-Elf" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/Half-elf.jpg", "Half-Elf")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Half-Elf</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.halfElf')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/orc.png" alt="Orc" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/orc.png", "Orc")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Orc</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.orc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/tengu.jpg" alt="Tengu" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/tengu.jpg", "Tengu")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Tengu</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.tengu')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-black bg-opacity-20 rounded-lg">
                  <img src="/Pathfinder/Race/Vanara.jpeg" alt="Vanara" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer bg-white" onClick={() => openModal("/Pathfinder/Race/Vanara.jpeg", "Vanara")} />
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-1">Vanara</h4>
                    <p className="text-sm text-gray-200">{t('pathfinder.character.vanara')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            to="/deathwatch"
            className="fantasy-btn mr-4"
          >
            {t('common.previous')}: DeathWatch
          </Link>
          <Link
            to="/dnd5e"
            className="fantasy-btn"
          >
            {t('common.next')}: D&D 5e →
          </Link>
        </div>
      </div>

      {modalImg && (
        <div id="modal-bg" onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-yellow-600 flex items-center justify-center">
            <img src={modalImg.src} alt={modalImg.alt} className="max-h-[70vh] max-w-[80vw] rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pathfinder;
