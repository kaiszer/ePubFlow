import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { makeFirstLettersBold } from '../utils/textFormatting';
import { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
  intensity: number;
  onIntensityChange: (newIntensity: number) => void;
}

export default function SettingsModal({ onClose, intensity, onIntensityChange }: SettingsModalProps) {
  const { t } = useTranslation();
  
  // Local state for immediate smooth sliding, syncs up to parent when changed
  const [localIntensity, setLocalIntensity] = useState(intensity);
  
  // Highlighting test keyword
  const keywordEs = "Murciélago";
  const keywordEn = "Unoriginal";
  const keyword = t('home') === 'Home' ? keywordEn : keywordEs; // Simplistic language toggle check

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalIntensity(val);
    onIntensityChange(val);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overscroll-contain animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-300 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-slate-900 dark:text-slate-100">
          <h2 className="text-2xl font-bold">{t('settingsTitle') || "Personalización"}</h2>
          <button 
            onClick={onClose}
            aria-label="Cerrar Ajustes"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <X size={24} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Sliders and Previews */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
             <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{t('boldIntensity')}</span>
             <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">{localIntensity} {t('lettersAmt')}</span>
             </div>
          </div>

          <div className="w-full max-w-sm flex items-center gap-4">
             <span className="text-sm font-bold text-slate-400">1</span>
             <input 
               type="range" 
               min="1" 
               max="9" 
               value={localIntensity} 
               onChange={handleSliderChange}
               className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
             />
             <span className="text-sm font-bold text-slate-400">9</span>
          </div>

          <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner w-full text-center">
            <span className="text-sm text-slate-500 block mb-3">{t('livePreview')}</span>
            <div 
              className="text-4xl sm:text-5xl font-serif text-slate-800 dark:text-slate-200 transition-colors break-words"
              dangerouslySetInnerHTML={{ __html: makeFirstLettersBold(keyword, localIntensity) }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
