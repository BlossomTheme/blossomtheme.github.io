import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import ThemeGallery from './components/ThemeGallery';
import ThemeDetailView from './components/ThemeDetailView';
import PaletteView from './components/PaletteView';
import AIAssistant from './components/AIAssistant';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`w-screen h-screen flex flex-col relative ${isHomePage ? 'bg-white' : 'bg-black'}`}>
      <main className={`flex-grow w-full ${isHomePage ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={
            <div className="w-full px-4 md:px-8 py-8">
              <ThemeGallery />
            </div>
          } />
          <Route path="/theme/:software" element={
            <div className="w-full px-4 md:px-8 py-8">
              <ThemeDetailView />
            </div>
          } />
          <Route path="/palette" element={
            <div className="w-full px-4 md:px-8 py-8">
              <PaletteView />
            </div>
          } />
        </Routes>
      </main>

      {isHomePage ? null : (
        <footer className="mt-auto py-8 bg-black border-t-4 border-purple-600 w-full">
          <div className="container mx-auto px-4 text-center">
            <p className="manga-font text-xl text-purple-400">
              BLOSSOMTHEME &copy; 2026
            </p>
            <div className="flex justify-center space-x-4 mt-4">
               <a href="https://github.com/BlossomTheme" className="hover:text-pink-500 transition-colors font-bold uppercase tracking-widest text-xs">GITHUB</a>
               <a href="https://github.com/BlossomTheme/BlossomTheme" className="hover:text-pink-500 transition-colors font-bold uppercase tracking-widest text-xs">DOCS</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
