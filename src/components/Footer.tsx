import { useTranslation } from 'react-i18next';

interface FooterProps {
  showBackBtn: boolean;
  onBackClick: () => void;
}

export default function Footer({ showBackBtn, onBackClick }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted dark:bg-slate-900 px-5 py-6 flex justify-between items-center relative mt-auto transition-colors duration-300">
      <p className="text-muted-foreground dark:text-slate-400 m-0 text-sm">{t('footer')}</p>

      {showBackBtn && (
        <button
          onClick={onBackClick}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 hover:text-slate-900 dark:hover:text-slate-200 text-muted-foreground dark:text-slate-400 transition-colors font-medium text-sm bg-transparent border-none p-0 m-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {t('back')}
        </button>
      )}
    </footer>
  );
}
