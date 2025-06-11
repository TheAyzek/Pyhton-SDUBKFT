import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('tr')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
          i18n.language === 'tr'
            ? 'bg-yellow-400 text-black shadow-lg'
            : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
        }`}
      >
        🇹🇷 TR
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
          i18n.language === 'en'
            ? 'bg-yellow-400 text-black shadow-lg'
            : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
