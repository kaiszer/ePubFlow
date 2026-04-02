import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { makeFirstLettersBold } from '../utils/textFormatting';
import { useAppStore } from '../features/store/useAppStore';

interface ExampleModalProps {
  onClose: () => void;
  originalText: string;
}



export default function ExampleModal({ onClose, originalText }: ExampleModalProps) {
  const { t } = useTranslation();
  const { boldIntensity } = useAppStore();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overscroll-contain animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-300 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6 text-slate-900 dark:text-slate-100">
          <h2 className="text-2xl font-bold">{t('exampleTitle')}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <X size={24} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* E-Reader Container */}
        <div className="flex justify-center">
          <div className="w-full aspect-[3/4] max-h-[70vh] bg-slate-200 dark:bg-slate-800 rounded-[2rem] p-4 sm:p-6 sm:pb-12 shadow-inner border-[12px] border-slate-300 dark:border-slate-700 flex flex-col relative overflow-hidden transition-colors">
            <div
              className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-md overflow-y-auto p-4 sm:p-6 text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-serif shadow-sm transition-colors text-justify"
              dangerouslySetInnerHTML={{ __html: makeFirstLettersBold(originalText, boldIntensity) }}
            />
            {/* Fake Kindle Bottom Bezel */}
            <div className="absolute bottom-3 left-0 w-full flex justify-center items-center select-none pointer-events-none">
              <span className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[10px] sm:text-sm transition-colors">ePubFlow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
