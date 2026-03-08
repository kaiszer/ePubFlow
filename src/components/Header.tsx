import { useTranslation } from 'react-i18next';
import { Mail, Home as HomeIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  view: 'home' | 'contact';
  onHomeClick: () => void;
  onContactClick: () => void;
}

export default function Header({ view, onHomeClick, onContactClick }: HeaderProps) {
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
          onClick={view === 'contact' ? onHomeClick : onContactClick}
          className="flex items-center justify-center p-2 rounded-full text-inherit no-underline hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          title={view === 'contact' ? t('back') : t('contact')}
          aria-label={view === 'contact' ? t('back') : t('contact')}
        >
          {view === 'contact' ? <HomeIcon size={20} /> : <Mail size={20} />}
        </button>
      </div>
    </header>
  );
}
