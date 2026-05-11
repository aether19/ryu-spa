import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import LocationPage from '@/pages/LocationPage';
import TreatmentsPage from '@/pages/TreatmentsPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations/:slug" element={<LocationPage />} />
        <Route path="/treatments" element={<TreatmentsPage />} />
      </Routes>
      <Footer />
    </SmoothScrollProvider>
  );
}
