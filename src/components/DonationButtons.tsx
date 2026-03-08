import { useTranslation } from 'react-i18next';

export function DonationButtons() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row gap-4">
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:drop-shadow-sm transition-all text-[#FFDD00]">
          <path d="M6.68604 15H17.3146M6.51465 13H17.4861M7.74316 7H16.2571M7.74316 7C7.13829 7 6.8358 7 6.61279 7.12093C6.41686 7.22718 6.26205 7.3963 6.17292 7.60059C6.07151 7.83303 6.0973 8.13407 6.14893 8.73633L6.94921 18.073C7.0377 19.1053 7.08203 19.6225 7.31149 20.0132C7.51358 20.3572 7.81426 20.6327 8.17432 20.8047C8.58318 21 9.10126 21 10.1377 21H13.8628C14.8992 21 15.4174 21 15.8263 20.8047C16.1864 20.6327 16.4869 20.3572 16.689 20.0132C16.9185 19.6225 16.9628 19.1056 17.0513 18.073L17.8517 8.73471C17.9033 8.13312 17.929 7.8329 17.8276 7.60059C17.7385 7.3963 17.5838 7.22718 17.3878 7.12093C17.1648 7 16.862 7 16.2571 7M7.74316 7H6.7499C5.85031 7 5.40023 7 5.13867 6.81152C4.90778 6.64515 4.75884 6.38816 4.72894 6.10515C4.69504 5.78431 4.91871 5.3929 5.36568 4.6107L5.36621 4.60977C5.70039 4.02496 5.86748 3.73255 6.10197 3.51953C6.31161 3.32909 6.55925 3.18544 6.82861 3.09791C7.12991 3 7.46658 3 8.14014 3H15.8604C16.5339 3 16.8707 3 17.172 3.09791C17.4413 3.18544 17.6888 3.32909 17.8984 3.51953C18.1329 3.73255 18.3 4.02496 18.6342 4.60977C19.0813 5.39224 19.3053 5.78425 19.2714 6.10515C19.2415 6.38816 19.0925 6.64515 18.8616 6.81152C18.6001 7 18.1497 7 17.2501 7H16.2571" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}
