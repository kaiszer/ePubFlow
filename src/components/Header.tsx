import { useTranslation } from 'react-i18next';
import { Mail, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <Button 
        variant="ghost" 
        className="text-2xl font-bold p-0 hover:bg-transparent"
        onClick={onHomeClick}
      >
        <h1>ePubFlow</h1>
      </Button>
      
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={view === 'contact' ? onHomeClick : onContactClick}
          title={view === 'contact' ? t('back') : t('contact')}
          aria-label={view === 'contact' ? t('back') : t('contact')}
        >
          {view === 'contact' ? <HomeIcon size={20} /> : <Mail size={20} />}
        </Button>
      </div>
    </header>
  );
}
