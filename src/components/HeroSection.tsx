import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { BackgroundPaths } from '@/components/ui/background-paths';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToInvestimento = () => {
    const element = document.getElementById('investimento');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return <div style={{
    height: isMobile ? 'auto' : 'calc(100vh - 80px)',
    minHeight: isMobile ? '70vh' : 'auto'
  }} className="relative flex items-center justify-center overflow-hidden my-0 py-0">
      {/* Background Paths Animation */}
      <BackgroundPaths className="z-0" pathOpacity={0.4} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/95 pointer-events-none"></div>
      
      {/* Automation graphics - floating nodes repositioned around text */}
      <div className="absolute inset-0 z-10 overflow-hidden p-0 px-[7px] py-[7px] my-[195px]">
        {/* Top left node */}
        <div className="node w-3 h-3 rounded-full bg-growave-green absolute top-[15%] left-[15%] animate-glow"></div>
        
        {/* Top right node */}
        <div className="node w-2 h-2 rounded-full bg-growave-green absolute top-[15%] right-[15%] animate-glow" style={{
        animationDelay: '0.3s'
      }}></div>
        
        {/* Bottom left node */}
        <div className="node w-4 h-4 rounded-full bg-growave-green absolute bottom-[35%] left-[20%] animate-glow" style={{
        animationDelay: '0.6s'
      }}></div>
        
        {/* Bottom right node */}
        <div className="node w-2 h-2 rounded-full bg-growave-green absolute bottom-[35%] right-[20%] animate-glow" style={{
        animationDelay: '0.9s'
      }}></div>
      </div>
      
      {/* Removido: Glowing orb effect */}
      
      <div className={`container mx-auto sm:px-2 relative z-10 ${isMobile ? 'my-8' : 'my-[87px]'} px-0`}>
        <div className={`text-center max-w-4xl mx-auto ${isMobile ? 'py-12 px-6' : 'py-[113px] px-[51px]'}`}>
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className={`sm:text-4xl font-bold lg:text-6xl md:text-5xl text-3xl mt-0`}>
              Transforme sua Clínica com o método 
              <span className="gradient-text block mt-0 my-[10px] py-0">Clínica com Rumo</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 mb-8">
              Estratégias personalizadas para clínicas e consultórios de saúde que aumentam agendamentos e fidelizam pacientes.
            </p>
          </div>
          
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button 
                onClick={scrollToInvestimento}
                className="text-sm py-4 px-5 bg-growave-green text-black hover:bg-growave-green-light animate-pulse-soft"
              >
                Agendar consultoria gratuita
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Technology logos - responsive layout */}
          {isMobile ?
        // Mobile layout - logos in a flex container below content
        <div className={`mt-8 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                {/* Meta Ads logo */}
                <div className="bg-white/10 rounded-lg p-2 backdrop-blur hover:bg-white/15 transition-colors animate-float" style={{
              animationDelay: '0s',
              animationDuration: '4s'
            }}>
                  <img src="/lovable-uploads/7694aad0-ac97-4cfb-9f18-b604c273222a.png" alt="Meta Ads" className="h-6" />
                </div>
                
                {/* Google Ads logo */}
                <div className="bg-white/10 rounded-lg p-2 backdrop-blur hover:bg-white/15 transition-colors animate-float" style={{
              animationDelay: '0.5s',
              animationDuration: '3.5s'
            }}>
                  <img src="/lovable-uploads/f8001bc9-9b0b-40c1-a25f-be19319b3105.png" alt="Google Ads" className="h-6" />
                </div>
                
                {/* n8n logo */}
                <div className="bg-white/10 rounded-lg p-2 backdrop-blur hover:bg-white/15 transition-colors animate-float" style={{
              animationDelay: '1s',
              animationDuration: '5s'
            }}>
                  <img src="/lovable-uploads/f03d5386-3926-40be-a22e-52a5d73f1e6f.png" alt="n8n" className="h-6" />
                </div>
              </div>
            </div> :
        // Desktop layout - repositioned floating logos for better spacing
        <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Meta Ads logo - adjusted position */}
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur hover:bg-white/15 transition-colors animate-float absolute z-20" style={{
            animationDelay: '0s',
            top: '24%',
            right: '20%',
            animationDuration: '4s'
          }}>
                <img src="/lovable-uploads/7694aad0-ac97-4cfb-9f18-b604c273222a.png" alt="Meta Ads" className="h-8" />
              </div>
              
              {/* Google Ads logo - adjusted position */}
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur hover:bg-white/15 transition-colors animate-float absolute z-20" style={{
            animationDelay: '0.5s',
            bottom: '32%',
            left: '20%',
            animationDuration: '3.5s'
          }}>
                <img src="/lovable-uploads/f8001bc9-9b0b-40c1-a25f-be19319b3105.png" alt="Google Ads" className="h-8" />
              </div>
              
              {/* n8n logo - adjusted position */}
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur hover:bg-white/15 transition-colors animate-float absolute z-20" style={{
            animationDelay: '1s',
            top: '38%',
            left: '28%',
            animationDuration: '5s'
          }}>
                <img src="/lovable-uploads/f03d5386-3926-40be-a22e-52a5d73f1e6f.png" alt="n8n" className="h-8" />
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default HeroSection;
