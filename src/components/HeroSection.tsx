import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from './ContactForm';
import { useIsMobile } from '@/hooks/use-mobile';
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <div style={{
    height: isMobile ? '100vh' : 'calc(100vh - 80px)'
  }} className="relative flex items-center justify-center overflow-hidden my-[6px] py-0">
      {/* Circuit board background with animation */}
      <div className="absolute inset-0 z-0 circuit-pattern">
        {/* Digital code lines animation overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="code-line h-1 w-20 bg-growave-green absolute top-1/4 left-1/5 animate-pulse-soft"></div>
          <div className="code-line h-1 w-40 bg-growave-green absolute top-1/3 right-1/4 animate-pulse-soft" style={{
          animationDelay: '0.5s'
        }}></div>
          <div className="code-line h-1 w-32 bg-growave-green absolute bottom-1/3 left-1/3 animate-pulse-soft" style={{
          animationDelay: '1s'
        }}></div>
          <div className="code-line h-1 w-24 bg-growave-green absolute bottom-1/4 right-1/5 animate-pulse-soft" style={{
          animationDelay: '1.5s'
        }}></div>
          
          <div className="code-square h-8 w-8 border border-growave-green absolute top-1/2 left-1/6 animate-pulse-soft" style={{
          animationDelay: '0.7s'
        }}></div>
          <div className="code-square h-12 w-12 border border-growave-green absolute bottom-1/2 right-1/6 animate-pulse-soft" style={{
          animationDelay: '1.2s'
        }}></div>
        </div>
      </div>
      
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
      
      <div className="container mx-auto sm:px-2 relative z-10 my-[87px] px-0">
        <div className="text-center max-w-4xl mx-auto py-[113px] px-[51px]">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className={`sm:text-4xl font-bold lg:text-6xl md:text-5xl text-3xl ${isMobile ? '-mt-48' : 'mt-0'}`}>
              Transforme sua Clínica com 
              <span className="gradient-text block mt-0 my-[10px] py-0">Marketing Digital Especializado</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 mb-8">
              Estratégias personalizadas para clínicas e consultórios de saúde que aumentam agendamentos e fidelizam pacientes.
            </p>
          </div>
          
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="text-sm py-4 px-5 bg-growave-green text-black hover:bg-growave-green-light animate-pulse-soft">
                    Agendar Diagnóstico Gratuito
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-growave-black border-growave-green/20">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white text-center">Agende seu Diagnóstico Gratuito</DialogTitle>
                  </DialogHeader>
                  <div className="py-2">
                    <ContactForm onSuccess={() => setIsDialogOpen(false)} />
                  </div>
                </DialogContent>
              </Dialog>
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
                <img src="/lovable-uploads/f03d5386-3926-40be-a22e-52a5d73f1e6f.png" alt="n8n" className="h-" />
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default HeroSection;