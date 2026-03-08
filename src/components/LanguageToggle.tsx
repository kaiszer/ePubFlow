import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const isSpanish = i18n.language === 'ES';

  const toggleLanguage = () => {
    i18n.changeLanguage(isSpanish ? 'EN' : 'ES');
  };

  return (
    <button
      type="button"
      title={isSpanish ? "Switch to English" : "Cambiar a Español"}
      onClick={toggleLanguage}
      className={cn(
        "relative w-7 h-7 rounded-full overflow-hidden border-2 border-transparent transition-all p-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex hover:ring-2 hover:ring-primary/40 shadow-sm"
      )}
    >
      {isSpanish ? (
        // English Flag (Show when Spanish is active)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full object-cover">
          <clipPath id="t"><path d="M30,15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
          <path d="M0,0v30h60V0z" fill="#012169"/>
          <path d="M0,0 60,30M60,0 0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 60,30M60,0 0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6"/>
        </svg>
      ) : (
        // Spanish Flag (Show when English is active)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" className="w-full h-full object-cover">
          <rect width="750" height="500" fill="#c60b1e"/>
          <rect y="125" width="750" height="250" fill="#ffc400"/>
        </svg>
      )}
    </button>
  );
}
