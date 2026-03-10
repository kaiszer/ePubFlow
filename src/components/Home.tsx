import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Download, CheckCircle2, Eye, FileUp, Settings } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { processEpub, extractEpubCoverAndStore } from '../lib/epubProcessor';
import { cn } from '../lib/utils';
import { Button } from '@/components/ui/button';
import { useAppStore } from '../features/store/useAppStore';
import ExampleModal from './ExampleModal';
import SettingsModal from './SettingsModal';
import mobyEsText from '../assets/texts/moby_es.txt?raw';
import mobyEnText from '../assets/texts/moby_en.txt?raw';


interface HomeProps {
  downloadUrl: string | null;
  outputFilename: string | null;
  setDownloadUrl: (url: string | null) => void;
  setOutputFilename: (name: string | null) => void;
}

export default function Home({ downloadUrl, outputFilename, setDownloadUrl, setOutputFilename }: HomeProps) {
  const { t, i18n } = useTranslation();
  
  const { 
    file, setFile, 
    isProcessing, setIsProcessing,
    isModalOpen, setIsModalOpen,
    isSettingsOpen, setIsSettingsOpen,
    boldIntensity,
    coverUrl
  } = useAppStore();

  const demoText = i18n.language === 'ES' ? mobyEsText : mobyEnText;

  useEffect(() => {
    if (!downloadUrl) {
      setFile(null); // Reset file strictly when tracking download URL drops
    }
  }, [downloadUrl]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      extractEpubCoverAndStore(acceptedFiles[0]); // Fire and forget cover metadata
    }
  }, [setFile]);

  const onDropRejected = useCallback(() => {
    toast.error(t('invalidFileType'));
  }, [t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'application/epub+zip': ['.epub']
    },
    maxFiles: 1
  });

  const handleFlow = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const resultBlob = await processEpub(file, boldIntensity);
      const url = URL.createObjectURL(resultBlob);

      const parts = file.name.split('.');
      const ext = parts.pop();
      const newName = `${parts.join('.')}_flow.${ext}`;

      setOutputFilename(newName);
      setDownloadUrl(url);
      toast.success(t('uploadSuccess'));
    } catch (error) {
      console.error("DEBUG handleFlow Error Trapped:");
      console.error(error);
      if (error instanceof Error) {
        console.error(error.message);
        console.error(error.stack);
      }
      toast.error(t('errorProcessing'));
    } finally {
      setIsProcessing(false);
    }
  };

  if (downloadUrl) {
    return (
      <div className="flex flex-col items-center animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold mb-8">{t('downloadReady')}</h2>
        <a
          href={downloadUrl}
          download={outputFilename || 'formatted.epub'}
          className="flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-medium text-black bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-primary-hover hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Download size={16} />
          {t('downloadBtn')}
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="text-justify space-y-4 mb-8 text-slate-800 dark:text-slate-200 transition-colors">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="flex-1"
          >
            <Eye size={18} className="mr-2" />
            {t('seeExample')}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings size={18} className="mr-2" />
            {t('settingsTitle') || "Ajustes"}
          </Button>
      </div>

      <div className="flex flex-col items-center gap-4 w-full px-4">
        <div 
          {...getRootProps()} 
          className={cn(
            "w-full max-w-lg p-10 sm:p-14 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer",
            isDragActive 
              ? "border-primary bg-primary/10 dark:bg-primary/20" 
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm",
            isProcessing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          )}
        >
          <input {...getInputProps()} />
          
          <div className={cn(
            "p-4 rounded-full transition-colors duration-300",
            isDragActive ? "bg-primary/20 text-primary dark:bg-primary/30" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
            isProcessing && "hidden"
          )}>
            <FileUp size={36} />
          </div>
          
          <div className={cn("text-center", isProcessing && "hidden")}>
            <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200">
              {t('dragHere')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {t('orClick')}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 uppercase tracking-wider font-semibold">
              {t('epubOnly')}
            </p>
          </div>
        </div>

        {(file && !isProcessing) && (
             <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mt-2">
                 <CheckCircle2 size={16} className="text-primary" />
                 {t('fileSelected')} {file.name}
             </div>
        )}

        {(file || isProcessing) && coverUrl && (
             <div className="mt-4 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <img 
                  src={coverUrl} 
                  alt="Book Cover" 
                  className="w-32 h-48 object-cover rounded-md shadow-lg mb-4 border border-slate-200 dark:border-slate-800"
                />
             </div>
        )}

        <Button
          onClick={handleFlow}
          disabled={!file || isProcessing}
          size="lg"
          className={cn(
            "mt-4 px-8 py-6 rounded-full uppercase tracking-widest transition-all duration-300",
            isProcessing && coverUrl && "bg-transparent text-primary hover:bg-transparent shadow-none"
          )}
        >
          {isProcessing ? (
             <div className="flex flex-col items-center gap-2">
                <Loader2 size={24} className="motion-safe:animate-spin text-primary" />
                <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold tracking-widest">{t('processing')}</span>
             </div>
          ) : (
             t('flow')
          )}
        </Button>
      </div>

      {isModalOpen && (
        <ExampleModal onClose={() => setIsModalOpen(false)} originalText={demoText} />
      )}

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  );
}
