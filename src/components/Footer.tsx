import { useTranslation } from 'react-i18next';
import { DonationButtons } from './DonationButtons';

interface FooterProps {
  showBackBtn: boolean;
  onBackClick: () => void;
}

export default function Footer({ showBackBtn, onBackClick }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="w-full flex items-center justify-between p-4 bg-transparent mt-auto relative z-50">
      <div className="flex-1" />
      
      {showBackBtn && (
        <button
          onClick={onBackClick}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 hover:text-slate-900 dark:hover:text-slate-200 text-slate-500 dark:text-slate-400 transition-colors font-medium text-sm bg-transparent border-none p-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {t('back')}
        </button>
      )}

      <div className="flex-1 flex justify-end">
        <DonationButtons />
      </div>
    </footer>
  );
}
