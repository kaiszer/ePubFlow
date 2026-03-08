import { useTranslation } from 'react-i18next';

export function DonationButtons() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 flex flex-row gap-4 z-50">
      <a
        href="https://ko-fi.com/epubflow"
        title={t('supportMe')}
        target="_blank"
        rel="noreferrer"
        className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border-2 border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-[#29abe0] group-hover:drop-shadow-sm transition-all">
          <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.051-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.74 4.311zm8.173.2c-.23.89-.952 1.4-1.553 1.514v-5.02c.602.115 1.323.624 1.553 1.514.244.947.244 2.045 0 2.992z" />
        </svg>
      </a>

      <a
        href="https://buymeacoffee.com/epubflow"
        title={t('supportMe')}
        target="_blank"
        rel="noreferrer"
        className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border-2 border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <img src="/cup.svg" alt="Buy Me A Coffee" className="w-6 h-6 group-hover:drop-shadow-sm transition-all" />
      </a>
    </div>
  );
}
