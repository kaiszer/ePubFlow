import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Download, CheckCircle2, Eye, FileUp } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { processEpub } from '../lib/epubProcessor';
import { cn } from '../lib/utils';
import ExampleModal from './ExampleModal';
import mobyEsText from '../assets/texts/moby_es.txt?raw';
import mobyEnText from '../assets/texts/moby_en.txt?raw';

/**
 * Highlights the first two letters of every word in the given text, 
 * simulating the bold effect described in the tool.
 * 
 * @param text The input text to be styled
 * @returns React elements with bold tags for the first two letters of words
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

interface HomeProps {
  downloadUrl: string | null;
  outputFilename: string | null;
  setDownloadUrl: (url: string | null) => void;
  setOutputFilename: (name: string | null) => void;
}

export default function Home({ downloadUrl, outputFilename, setDownloadUrl, setOutputFilename }: HomeProps) {
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const demoText = i18n.language === 'ES' ? mobyEsText : mobyEnText;

  useEffect(() => {
    if (!downloadUrl) {
      setFile(null); // Reset file strictly when tracking download URL drops
    }
  }, [downloadUrl]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

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
      const resultBlob = await processEpub(file);
      const url = URL.createObjectURL(resultBlob);

      const parts = file.name.split('.');
      const ext = parts.pop();
      const newName = `${parts.join('.')}_flow.${ext}`;

      setOutputFilename(newName);
      setDownloadUrl(url);
      toast.success(t('uploadSuccess'));
    } catch (error) {
      console.error("Failed to process EPUB:", error);
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
        <p><BoldFirstTwoLetters text={t('p1')} /></p>
        <p><BoldFirstTwoLetters text={t('p2')} /></p>
        <p><BoldFirstTwoLetters text={t('p3')} /></p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-8 flex items-center gap-2 px-6 py-3 font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-sm transition-colors hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-100 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Eye size={18} />
        {t('seeExample')}
      </button>

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
            isDragActive ? "bg-primary/20 text-primary dark:bg-primary/30" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          )}>
            <FileUp size={36} />
          </div>
          
          <div className="text-center">
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

        {file && (
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mt-2">
            <CheckCircle2 size={16} className="text-primary" />
            {t('fileSelected')} {file.name}
          </div>
        )}

        <button
          onClick={handleFlow}
          disabled={!file || isProcessing}
          className={cn(
            "px-8 py-4 mt-4 text-xs uppercase tracking-widest font-medium rounded-full shadow-md transition-colors duration-300 flex items-center gap-2 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            (!file || isProcessing)
              ? "bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-none"
              : "bg-white dark:bg-slate-800 text-black dark:text-slate-100 hover:bg-primary-hover hover:text-white dark:hover:bg-primary-hover"
          )}
        >
          {isProcessing ? <Loader2 size={16} className="motion-safe:animate-spin" /> : null}
          {isProcessing ? t('processing') : t('flow')}
        </button>
      </div>

      {isModalOpen && (
        <ExampleModal 
          onClose={() => setIsModalOpen(false)} 
          originalText={demoText} 
        />
      )}
    </>
  );
}
