import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Contact from './Contact';

export default function App() {
  const [view, setView] = useState<'home' | 'contact'>('home');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputFilename, setOutputFilename] = useState<string | null>(null);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  /**
   * Resets the application state to allow processing a new file
   */
  const handleReset = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setDownloadUrl(null);
    setOutputFilename(null);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-slate-900">
      <Header 
        onHomeClick={() => { handleReset(); setView('home'); }} 
        onContactClick={() => setView('contact')} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">
        {view === 'contact' ? (
          <Contact />
        ) : (
          <Home 
            downloadUrl={downloadUrl} 
            outputFilename={outputFilename} 
            setDownloadUrl={setDownloadUrl} 
            setOutputFilename={setOutputFilename} 
          />
        )}
      </main>

      <Footer 
        showBackBtn={!!downloadUrl || view === 'contact'}
        onBackClick={() => { handleReset(); setView('home'); }}
      />
    </div>
  );
}
