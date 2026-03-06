import { useState, useRef, useEffect } from 'react';
import { Mail, Loader2, Download, Upload, CheckCircle2 } from 'lucide-react';
import { processEpub } from './lib/epubProcessor';
import { cn } from './lib/utils';

type Language = 'ES' | 'EN';

const translations = {
  EN: {
    contact: 'Contact',
    donate: 'If you like this tool, donate here',
    p1: 'This is a special technique that helps readers by directing their eyes on artificial fixation points while reading. Using this method the reader concentrates only on the initial letters that have been highlighted, which allows the reader\'s brain to complete the rest of the word faster.',
    p2: 'ePubFlow will allow you to load your epub files and transform them in such a way that each word will be with its first letters in bold. This will allow you to have a smoother and more pleasant reading since this modification acts as a guide so that when reading you can quickly set the next word and avoids skipping words.',
    p3: 'Just select your desired epub file and click on Flow, the tool will take a few seconds to have your file ready.',
    chooseFile: 'Choose File',
    flow: 'Flow',
    fileSelected: 'File selected: ',
    processing: 'Processing your file...',
    downloadReady: 'Download your file, happy reading!',
    downloadBtn: 'Download',
    back: 'Go to the main page',
    footer: '© 2025 ePubFlow. All rights reserved.',
  },
  ES: {
    contact: 'Contacto',
    donate: 'Si te gusta esta herramienta, dona aquí',
    p1: 'Esta es una técnica especial que ayuda a los lectores dirigiendo la vista a puntos de fijación artificiales mientras leen. Usando este método, el lector se concentra solo en las letras iniciales que han sido resaltadas, lo que permite que el cerebro del lector complete el resto de la palabra más rápido.',
    p2: 'ePubFlow te permitirá cargar tus archivos epub y transformarlos de tal manera que cada palabra tenga sus primeras letras en negrita. Esto te permitirá tener una lectura más fluida y agradable, ya que esta modificación actúa como una guía para que al leer puedas identificar rápidamente la siguiente palabra y evitar omitir palabras.',
    p3: 'Solo selecciona tu archivo epub deseado y haz clic en Flow; la herramienta tardará unos segundos en preparar tu archivo.',
    chooseFile: 'Seleccionar archivo',
    flow: 'Flow',
    fileSelected: 'Archivo seleccionado: ',
    processing: 'Procesando tu archivo...',
    downloadReady: '¡Descarga tu archivo, feliz lectura!',
    downloadBtn: 'Descargar',
    back: 'Ir a la página principal',
    footer: '© 2025 ePubFlow. Todos los derechos reservados.',
  }
};

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

export default function App() {
  const [lang, setLang] = useState<Language>('ES');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputFilename, setOutputFilename] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  /**
   * Handles the file input change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  /**
   * Processes the EPUB file using the client-side module and generates a Download URL
   */
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

  /**
   * Resets the application state to allow processing a new file
   */
  const handleReset = () => {
    setFile(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setDownloadUrl(null);
    setOutputFilename(null);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-slate-900">
      {/* Header */}
      <header className="bg-muted px-5 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold m-0 cursor-pointer" onClick={handleReset}>ePubFlow</h1>
        <a 
          href="https://epubflow.com/contact.html" 
          className="flex items-center gap-2 text-inherit no-underline hover:text-primary transition-colors"
        >
          <Mail size={20} />
          <span>{t.contact}</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">
        {!downloadUrl ? (
          <>
            <a 
              href="https://ko-fi.com/epubflow" 
              target="_blank" 
              rel="noreferrer"
              className="mb-8 px-8 py-4 text-xs uppercase tracking-widest font-medium text-black bg-white rounded-full shadow-md hover:bg-primary-hover hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              {t.donate}
            </a>

            <div className="text-justify space-y-4 mb-8">
              <p><BoldFirstTwoLetters text={t.p1} /></p>
              <p><BoldFirstTwoLetters text={t.p2} /></p>
              <p><BoldFirstTwoLetters text={t.p3} /></p>
            </div>

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
                  "px-8 py-4 text-xs uppercase tracking-widest font-medium bg-white text-black rounded-full shadow-md transition-all duration-300 flex items-center gap-2",
                  isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-hover hover:text-white hover:-translate-y-1"
                )}
              >
                <Upload size={16} />
                {t.chooseFile}
              </button>

              {file && (
                <div className="text-sm font-medium text-slate-700 flex items-center gap-2 mt-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  {t.fileSelected} {file.name}
                </div>
              )}

              <button 
                onClick={handleFlow}
                disabled={!file || isProcessing}
                className={cn(
                  "px-8 py-4 mt-4 text-xs uppercase tracking-widest font-medium rounded-full shadow-md transition-all duration-300 flex items-center gap-2",
                  (!file || isProcessing) 
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none" 
                    : "bg-white text-black hover:bg-primary-hover hover:text-white hover:-translate-y-1"
                )}
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : null}
                {isProcessing ? t.processing : t.flow}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-8">{t.downloadReady}</h2>
            <a 
              href={downloadUrl}
              download={outputFilename || 'formatted.epub'}
              className="flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-medium text-black bg-white rounded-full shadow-md hover:bg-primary-hover hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <Download size={16} />
              {t.downloadBtn}
            </a>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted px-5 py-6 flex justify-between items-center relative mt-auto">
        <p className="text-muted-foreground m-0 text-sm">{t.footer}</p>
        
        {downloadUrl && (
          <button 
            onClick={handleReset}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 hover:text-slate-900 text-muted-foreground transition-colors font-medium text-sm"
          >
            {t.back}
          </button>
        )}

        <button 
          onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
          className="font-bold cursor-pointer hover:text-primary transition-colors text-sm px-2 py-1 select-none"
        >
          {lang === 'ES' ? 'EN' : 'ES'}
        </button>
      </footer>
    </div>
  );
}
