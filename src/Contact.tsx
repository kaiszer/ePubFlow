import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500 max-w-2xl text-lg">
      <p className="text-justify mb-4">{t('contactP1')}</p>
      <p className="text-justify mb-4">
        {t('contactP2Pre')} <a href="mailto:epubflow@gmail.com" className="text-slate-500 hover:text-primary transition-colors font-medium">epubflow@gmail.com</a>{t('contactP2Post')}
      </p>
      <p className="text-justify mb-8">{t('contactP3')}</p>
      <a
        href="https://ko-fi.com/epubflow"
        target="_blank"
        rel="noreferrer"
        className="px-8 py-4 text-xs uppercase tracking-widest font-medium text-black bg-white rounded-full shadow-md hover:bg-primary-hover hover:text-white hover:-translate-y-1 transition-all duration-300 w-full max-w-[200px] text-center"
      >
        {t('contactDonateBtn')}
      </a>
    </div>
  );
}
