import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface ExampleModalProps {
  onClose: () => void;
  originalText: string;
}

/**
 * Applies the Bionic Reading highlighting effect locally for the demo logic.
 */
const BoldFirstTwoLetters = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => {
        if (word.length >= 2) {
          return (
            <span key={i}>
              <strong>{word.slice(0, 2)}</strong>{word.slice(2)}{' '}
            </span>
          );
        }
        return <span key={i}>{word} </span>;
      })}
    </>
  );
};

export default function ExampleModal({ onClose, originalText }: ExampleModalProps) {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overscroll-contain animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('exampleTitle')}</h2>
          <button 
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-full hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* E-Readers Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Kindle 1: Original */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium text-slate-700 mb-3">{t('originalText')}</h3>
            <div className="w-full aspect-[3/4] max-h-[60vh] bg-slate-200 rounded-[2rem] p-4 sm:p-6 sm:pb-12 shadow-inner border-[12px] border-slate-300 flex flex-col relative overflow-hidden">
              <div className="flex-1 bg-slate-50 rounded-md overflow-y-auto p-4 sm:p-6 text-base sm:text-lg leading-relaxed text-slate-800 font-serif shadow-sm">
                {originalText}
              </div>
              
              {/* Fake Kindle Bottom Bezel */}
              <div className="absolute bottom-3 left-0 w-full flex justify-center items-center select-none pointer-events-none">
                <span className="text-slate-400 font-bold tracking-widest text-[10px] sm:text-sm">ePubFlow</span>
              </div>
            </div>
          </div>

          {/* Kindle 2: Transformed */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium text-slate-700 mb-3">{t('transformedText')}</h3>
            <div className="w-full aspect-[3/4] max-h-[60vh] bg-slate-200 rounded-[2rem] p-4 sm:p-6 sm:pb-12 shadow-inner border-[12px] border-slate-300 flex flex-col relative overflow-hidden">
              <div className="flex-1 bg-slate-50 rounded-md overflow-y-auto p-4 sm:p-6 text-base sm:text-lg leading-relaxed text-slate-800 font-serif shadow-sm">
                <BoldFirstTwoLetters text={originalText} />
              </div>
              
              {/* Fake Kindle Bottom Bezel */}
              <div className="absolute bottom-3 left-0 w-full flex justify-center items-center select-none pointer-events-none">
                <span className="text-slate-400 font-bold tracking-widest text-[10px] sm:text-sm">ePubFlow</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
