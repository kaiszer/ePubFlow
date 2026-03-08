import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500 max-w-2xl text-lg">
      <p className="text-justify mb-4">{t('contactP1')}</p>
      <p className="text-justify mb-4">
        {t('contactP2Pre')} <a href="mailto:epubflow@gmail.com" className="text-slate-500 hover:text-primary transition-colors font-medium">epubflow@gmail.com</a>{t('contactP2Post')}
      </p>
    </div>
  );
}
