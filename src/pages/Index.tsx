
import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ResultsSection from '@/components/ResultsSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ClientLogosSection from '@/components/ClientLogosSection';
import { BlurOverlay } from '@/components/ui/blur-overlay';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-visible my-[21px] py-[25px]">
      <BlurOverlay position="bottom" />
      <Header />
      <main className="my-[40px] py-[14px]">
        <HeroSection />
        <AboutSection />
        <ResultsSection />
        <ServicesSection />
        <ClientLogosSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
