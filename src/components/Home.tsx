import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Download, Upload, CheckCircle2, Eye } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const demoText = i18n.language === 'ES' ? mobyEsText : mobyEnText;

  useEffect(() => {
    if (!downloadUrl) {
      setFile(null); // Reset file strictly when tracking download URL drops
    }
  }, [downloadUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

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
    } catch (error) {
      console.error("Failed to process EPUB:", error);
      alert("Error processing the EPUB file. Please ensure it's a valid format.");
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
      <a
        href="https://ko-fi.com/epubflow"
        target="_blank"
        rel="noreferrer"
        className="mb-8 px-8 py-4 text-xs uppercase tracking-widest font-medium text-black bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-primary-hover hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {t('donate')}
      </a>

      <div className="text-justify space-y-4 mb-8">
        <p><BoldFirstTwoLetters text={t('p1')} /></p>
        <p><BoldFirstTwoLetters text={t('p2')} /></p>
        <p><BoldFirstTwoLetters text={t('p3')} /></p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-8 flex items-center gap-2 px-6 py-3 font-medium text-slate-700 bg-slate-100 rounded-lg shadow-sm transition-colors hover:bg-slate-200 hover:text-slate-900 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Eye size={18} />
        {t('seeExample')}
      </button>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".epub"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className={cn(
            "px-8 py-4 text-xs uppercase tracking-widest font-medium bg-white text-black rounded-full shadow-md transition-colors duration-300 flex items-center gap-2 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-hover hover:text-white"
          )}
        >
          <Upload size={16} />
          {t('chooseFile')}
        </button>

        {file && (
          <div className="text-sm font-medium text-slate-700 flex items-center gap-2 mt-2">
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
              ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
              : "bg-white text-black hover:bg-primary-hover hover:text-white"
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
