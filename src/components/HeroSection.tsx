
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center circuit-pattern pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/95 pointer-events-none"></div>
      
      {/* Glowing orb effect */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-glow opacity-30 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Transforme sua presença digital com 
              <span className="gradient-text block mt-2">Marketing Inteligente</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Estratégias personalizadas de tráfego pago, automação e IA para maximizar seus resultados e aumentar suas vendas.
            </p>
          </div>
          
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="text-md py-6 px-8 bg-growave-green text-black hover:bg-growave-green-light animate-pulse-soft">
                Fale com um especialista
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-md py-6 px-8 border-growave-green text-growave-green hover:bg-growave-green hover:text-black">
                Conheça nossos resultados
              </Button>
            </div>
          </div>
          
          <div className={`mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur hover:bg-white/15 transition-colors">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Meta Ads" className="h-8" />
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur hover:bg-white/15 transition-colors">
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google Ads" className="h-8" />
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur hover:bg-white/15 transition-colors">
                <img src="https://avatars.githubusercontent.com/u/60006201" alt="n8n" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative angled div at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-black via-growave-blue to-black transform -skew-y-1"></div>
    </div>
  );
};

export default HeroSection;
