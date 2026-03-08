import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  onHomeClick: () => void;
  onContactClick: () => void;
}

export default function Header({ onHomeClick, onContactClick }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="bg-muted dark:bg-slate-900 px-5 py-3 flex justify-between items-center shadow-sm transition-colors duration-300">
      <button 
        className="text-2xl font-bold m-0 cursor-pointer bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-slate-100" 
        onClick={onHomeClick}
      >
        <h1>ePubFlow</h1>
      </button>
      
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
        <button
          onClick={onContactClick}
          className="flex items-center gap-2 text-inherit no-underline hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 m-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-slate-100"
        >
          <Mail size={20} />
          <span>{t('contact')}</span>
        </button>
      </div>
    </header>
  );
}
