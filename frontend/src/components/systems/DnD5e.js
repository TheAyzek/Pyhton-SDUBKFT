import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DnD5e = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 dnd-theme">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="hero-banner h-64 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1553986782-9f6de60b51b4')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-7xl font-bold text-red-400 glow-text mb-4">
                {t('dnd5e.title')}
              </h1>
              <p className="text-xl text-gray-200">
                {t('dnd5e.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Lore Section - Moved to top */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-red-400 mb-4">
              {t('lore.dnd5e.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="rule-section mb-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  {t('lore.dnd5e.magicWonder')}
                </h3>
                <div className="stat-block">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.dnd5e.magicWonderText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  {t('lore.dnd5e.realmsAdventure')}
                </h3>
                <div className="stat-block">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.dnd5e.realmsAdventureText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  {t('lore.dnd5e.perilousWilds')}
                </h3>
                <div className="stat-block">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.dnd5e.perilousWildsText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="rule-section mb-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  {t('lore.dnd5e.kingdomsPeril')}
                </h3>
                <div className="stat-block">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.dnd5e.kingdomsPerilText')}
                  </p>
                </div>
              </div>

              <div className="rule-section mb-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  {t('lore.dnd5e.ancientLegends')}
                </h3>
                <div className="stat-block">
                  <p className="text-gray-300 leading-relaxed">
                    {t('lore.dnd5e.ancientLegendsText')}
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
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('dnd5e.coreSystem.title')}
              </h2>
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('dnd5e.coreSystem.diceSystem')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('dnd5e.coreSystem.primary')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.advantage')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.disadvantage')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.proficiency')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.difficulty')}</strong></li>
                </ul>
              </div>
              
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('dnd5e.coreSystem.keyConcepts')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('dnd5e.coreSystem.abilityChecks')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.savingThrows')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.skills')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.inspiration')}</strong></li>
                  <li><strong>{t('dnd5e.coreSystem.rests')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Character Creation */}
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('dnd5e.character.title')}
              </h2>
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('dnd5e.character.abilityScores')}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>{t('dnd5e.character.strength')}</strong></p>
                    <p><strong>{t('dnd5e.character.dexterity')}</strong></p>
                    <p><strong>{t('dnd5e.character.constitution')}</strong></p>
                  </div>
                  <div>
                    <p><strong>{t('dnd5e.character.intelligence')}</strong></p>
                    <p><strong>{t('dnd5e.character.wisdom')}</strong></p>
                    <p><strong>{t('dnd5e.character.charisma')}</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trivia */}
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('dnd5e.trivia.title')}
              </h2>
              <div className="stat-block">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li>{t('dnd5e.trivia.fact1')}</li>
                  <li>{t('dnd5e.trivia.fact2')}</li>
                  <li>{t('dnd5e.trivia.fact3')}</li>
                  <li>{t('dnd5e.trivia.fact4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Combat System */}
            <div className="rule-section mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('dnd5e.combat.title')}
              </h2>
              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('dnd5e.combat.combatFlow')}</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li><strong>{t('dnd5e.combat.initiative')}</strong></li>
                  <li><strong>{t('dnd5e.combat.turnActions')}</strong></li>
                  <li><strong>{t('dnd5e.combat.attackRoll')}</strong></li>
                  <li><strong>{t('dnd5e.combat.armorClass')}</strong></li>
                  <li><strong>{t('dnd5e.combat.damage')}</strong></li>
                </ol>
              </div>

              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('dnd5e.combat.actionTypes')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('dnd5e.combat.action')}</strong></li>
                  <li><strong>{t('dnd5e.combat.bonusAction')}</strong></li>
                  <li><strong>{t('dnd5e.combat.reaction')}</strong></li>
                  <li><strong>{t('dnd5e.combat.movement')}</strong></li>
                </ul>
              </div>

              <div className="stat-block">
                <h3 className="text-xl font-bold mb-3">{t('dnd5e.combat.specialRules')}</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>{t('dnd5e.combat.criticalHits')}</strong></li>
                  <li><strong>{t('dnd5e.combat.deathSaves')}</strong></li>
                  <li><strong>{t('dnd5e.combat.conditions')}</strong></li>
                  <li><strong>{t('dnd5e.combat.opportunity')}</strong></li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1440711085503-89d8ec455791"
                alt="Fantasy Sword"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>

            {/* History */}
            <div className="rule-section">
              <h2 className="text-3xl font-bold text-red-400 mb-4">
                {t('dnd5e.history.title')}
              </h2>
              <div className="stat-block">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li><strong>{t('dnd5e.history.origins')}</strong></li>
                  <li><strong>{t('dnd5e.history.design')}</strong></li>
                  <li><strong>{t('dnd5e.history.success')}</strong></li>
                  <li><strong>{t('dnd5e.history.impact')}</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Classes and Races Section - Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Classes */}
          <div className="rule-section">
            <h2 className="text-3xl font-bold text-red-400 mb-4">
              {t('dnd5e.character.coreClasses')}
            </h2>
            <div className="stat-block">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Barbarian" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Barbarian</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.barbarian')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Bard" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Bard</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.bard')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Cleric" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Cleric</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.cleric')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Druid" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Druid</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.druid')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=80&h=80&fit=crop&crop=face" alt="Fighter" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Fighter</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.fighter')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Monk" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Monk</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.monk')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" alt="Paladin" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Paladin</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.paladin')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" alt="Ranger" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Ranger</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.ranger')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Rogue" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Rogue</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.rogue')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Sorcerer" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Sorcerer</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.sorcerer')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Warlock" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Warlock</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.warlock')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=face" alt="Wizard" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Wizard</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.wizard')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Races */}
          <div className="rule-section">
            <h2 className="text-3xl font-bold text-red-400 mb-4">
              {t('dnd5e.character.races')}
            </h2>
            <div className="stat-block">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Human" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Human</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.human')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Elf" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Elf</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.elf')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" alt="Dwarf" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Dwarf</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.dwarf')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Halfling" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Halfling</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.halfling')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Dragonborn" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Dragonborn</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.dragonborn')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Gnome" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Gnome</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.gnome')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Half-Elf" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Half-Elf</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.halfElf')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Half-Orc" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Half-Orc</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.halfOrc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="Tiefling" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Tiefling</h4>
                    <p className="text-sm text-gray-300">{t('dnd5e.character.tiefling')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            to="/pathfinder"
            className="fantasy-btn mr-4"
          >
            {t('common.previous')}: Pathfinder
          </Link>
          <Link
            to="/cyberpunk-red"
            className="fantasy-btn"
          >
            {t('common.next')}: Cyberpunk RED →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DnD5e;
