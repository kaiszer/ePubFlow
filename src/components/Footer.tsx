import { useTranslation } from 'react-i18next';

interface FooterProps {
  showBackBtn: boolean;
  onBackClick: () => void;
}

export default function Footer({ showBackBtn, onBackClick }: FooterProps) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ES' ? 'EN' : 'ES');
  };

  return (
    <footer className="bg-muted px-5 py-6 flex justify-between items-center relative mt-auto">
      <p className="text-muted-foreground m-0 text-sm">{t('footer')}</p>

      {showBackBtn && (
        <button
          onClick={onBackClick}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 hover:text-slate-900 text-muted-foreground transition-colors font-medium text-sm bg-transparent border-none p-0 m-0 cursor-pointer outline-none"
        >
          {t('back')}
        </button>
      )}

      <button
        onClick={toggleLanguage}
        className="font-bold cursor-pointer hover:text-primary transition-colors text-sm px-2 py-1 select-none bg-transparent border-none p-0 m-0 outline-none"
      >
        {i18n.language === 'ES' ? 'EN' : 'ES'}
      </button>
    </footer>
  );
}
