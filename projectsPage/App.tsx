
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ThemeGallery from './components/ThemeGallery';
import ThemeDetailView from './components/ThemeDetailView';
import PaletteView from './components/PaletteView';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col relative pb-20">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ThemeGallery />} />
            <Route path="/theme/:software" element={<ThemeDetailView />} />
            <Route path="/palette" element={<PaletteView />} />
          </Routes>
        </main>

        <footer className="mt-auto py-8 bg-black border-t-4 border-purple-600">
          <div className="container mx-auto px-4 text-center">
            <p className="manga-font text-xl text-purple-400">
              BLOSSOMTHEME &copy; 2024 - CODE IN BLOOM
            </p>
            <div className="flex justify-center space-x-4 mt-4">
               <a href="https://github.com/BlossomTheme" className="hover:text-pink-500 transition-colors font-bold uppercase tracking-widest text-xs">GITHUB</a>
               <a href="#" className="hover:text-pink-500 transition-colors font-bold uppercase tracking-widest text-xs">DOCS</a>
            </div>
          </div>
        </footer>

        {/* Floating AI Sensei */}
        <AIAssistant />
      </div>
    </HashRouter>
  );
};

export default App;
