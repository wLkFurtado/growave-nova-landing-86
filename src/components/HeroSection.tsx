
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

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
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
      
      {/* Automation graphics - floating nodes and connections */}
      <div className="absolute inset-0 z-10 overflow-hidden py-0 ">
        <div className="node w-3 h-3 rounded-full bg-growave-green absolute top-1/4 left-1/4 animate-glow"></div>
        <div className="node w-2 h-2 rounded-full bg-growave-green absolute top-1/3 right-1/3 animate-glow" style={{
        animationDelay: '0.3s'
      }}></div>
        <div className="node w-4 h-4 rounded-full bg-growave-green absolute bottom-1/3 left-1/2 animate-glow" style={{
        animationDelay: '0.6s'
      }}></div>
        <div className="node w-2 h-2 rounded-full bg-growave-green absolute bottom-1/4 right-1/4 animate-glow" style={{
        animationDelay: '0.9s'
      }}></div>
      </div>
      
      {/* Glowing orb effect */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-glow opacity-30 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-[-1px]">
        <div className="text-center max-w-4xl mx-auto mt-16 md:mt-0">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className="sm:text-5xl font-bold mb-7 lg:text-7xl md:text-7xl text-4xl">
              Transforme sua Clínica com 
              <span className="gradient-text block mt-2">Marketing Digital Especializado</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Estratégias personalizadas para clínicas e consultórios de saúde que aumentam agendamentos e fidelizam pacientes.
            </p>
          </div>
          
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="text-md py-6 px-8 bg-growave-green text-black hover:bg-growave-green-light animate-pulse-soft">
                    Agendar Diagnóstico Gratuito
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-growave-black border-growave-green/20">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white text-center">Agende seu Diagnóstico Gratuito</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <ContactForm onSuccess={() => setIsDialogOpen(false)} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Technology logos - responsive layout */}
          {isMobile ? (
            // Mobile layout - logos in a flex container below content
            <div className={`mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {/* Meta Ads logo */}
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur hover:bg-white/15 transition-colors animate-float" 
                    style={{ animationDelay: '0s', animationDuration: '4s' }}>
                  <img src="/lovable-uploads/7694aad0-ac97-4cfb-9f18-b604c273222a.png" alt="Meta Ads" className="h-12" />
                </div>
                
                {/* Google Ads logo */}
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur hover:bg-white/15 transition-colors animate-float" 
                    style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>
                  <img src="/lovable-uploads/f8001bc9-9b0b-40c1-a25f-be19319b3105.png" alt="Google Ads" className="h-12" />
                </div>
                
                {/* n8n logo */}
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur hover:bg-white/15 transition-colors animate-float" 
                    style={{ animationDelay: '1s', animationDuration: '5s' }}>
                  <img src="/lovable-uploads/f03d5386-3926-40be-a22e-52a5d73f1e6f.png" alt="n8n" className="h-12" />
                </div>
              </div>
            </div>
          ) : (
            // Desktop layout - randomly positioned floating logos
            <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Meta Ads logo */}
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur hover:bg-white/15 transition-colors animate-float absolute z-20" 
                  style={{ 
                    animationDelay: '0s',
                    top: '15%',
                    right: '15%',
                    animationDuration: '4s'
                  }}>
                <img src="/lovable-uploads/7694aad0-ac97-4cfb-9f18-b604c273222a.png" alt="Meta Ads" className="h-14" />
              </div>
              
              {/* Google Ads logo */}
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur hover:bg-white/15 transition-colors animate-float absolute z-20" 
                  style={{ 
                    animationDelay: '0.5s',
                    bottom: '25%',
                    left: '12%',
                    animationDuration: '3.5s'
                  }}>
                <img src="/lovable-uploads/f8001bc9-9b0b-40c1-a25f-be19319b3105.png" alt="Google Ads" className="h-14" />
              </div>
              
              {/* n8n logo */}
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur hover:bg-white/15 transition-colors animate-float absolute z-20" 
                  style={{ 
                    animationDelay: '1s',
                    top: '30%',
                    left: '20%',
                    animationDuration: '5s'
                  }}>
                <img src="/lovable-uploads/f03d5386-3926-40be-a22e-52a5d73f1e6f.png" alt="n8n" className="h-14" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative angled div at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-black via-growave-blue to-black transform -skew-y-1"></div>
    </div>
  );
};

export default HeroSection;
