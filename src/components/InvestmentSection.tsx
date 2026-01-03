
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from './ContactForm';

const InvestmentSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Trigger staggered animations
          setTimeout(() => setAnimationStage(1), 200);
          setTimeout(() => setAnimationStage(2), 600);
          setTimeout(() => setAnimationStage(3), 1000);
          setTimeout(() => setAnimationStage(4), 1400);
          setTimeout(() => setAnimationStage(5), 1800);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute w-2 h-2 rounded-full bg-growave-green/30 transition-all duration-[3000ms] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: '20%',
            left: '10%',
            animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
          }}
        />
        <div 
          className={`absolute w-3 h-3 rounded-full bg-growave-green/20 transition-all duration-[3000ms] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: '60%',
            right: '15%',
            animation: isVisible ? 'float 8s ease-in-out infinite 1s' : 'none',
          }}
        />
        <div 
          className={`absolute w-1.5 h-1.5 rounded-full bg-growave-green/40 transition-all duration-[3000ms] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            bottom: '30%',
            left: '20%',
            animation: isVisible ? 'float 7s ease-in-out infinite 0.5s' : 'none',
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div 
        className={`absolute -top-40 -right-40 w-80 h-80 rounded-full bg-growave-green/5 blur-3xl transition-all duration-[2000ms] ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />
      <div 
        className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-growave-green/5 blur-3xl transition-all duration-[2500ms] delay-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-4xl">
        
        {/* INVESTIMENTO Title with glitch effect */}
        <div className="text-center mb-12 overflow-hidden">
          <h2 
            className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase transition-all duration-1000 ${
              animationStage >= 1 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-full opacity-0'
            }`}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: '0.05em',
              color: '#4AFF5A',
              textShadow: animationStage >= 1 
                ? '0 0 40px rgba(74, 255, 90, 0.4), 0 0 80px rgba(74, 255, 90, 0.2)' 
                : 'none',
              animation: animationStage >= 1 ? 'glow 2s ease-in-out infinite alternate' : 'none',
            }}
          >
            Investimento
          </h2>
        </div>

        {/* First Paragraph with slide-in */}
        <div className="mb-16 overflow-hidden">
          <div 
            className={`text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed transition-all duration-1000 ease-out ${
              animationStage >= 2 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-20 opacity-0'
            }`}
          >
            <p className="mb-2">
              Entendemos que{' '}
              <span className="text-growave-green font-bold">cada negócio é único.</span>{' '}
              É por isso que não temos uma tabela fixa de preços. Quero garantir que você{' '}
              <span className="text-growave-green font-bold">pague pelo que realmente precisa</span>, 
              sem surpresas ou custos extras.
            </p>
          </div>
        </div>

        {/* Middle Section - Consultoria Gratuita with bounce effect */}
        <div className="text-center mb-10 overflow-hidden">
          <h3 
            className={`font-black uppercase tracking-wide leading-tight transition-all duration-700 ${
              animationStage >= 3 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-10 opacity-0 scale-95'
            }`}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: '0.03em',
            }}
          >
            <span 
              className="text-growave-green inline-block text-3xl sm:text-4xl md:text-5xl"
              style={{
                animation: animationStage >= 3 ? 'pulse 2s ease-in-out infinite' : 'none',
              }}
            >
              MAS, CALMA! TE DAREI UMA
            </span>
            <br />
            <span 
              className={`text-growave-green inline-block text-3xl sm:text-4xl md:text-5xl transition-all duration-1000 ${
                animationStage >= 3 ? 'tracking-wide' : 'tracking-normal'
              }`}
              style={{
                textShadow: '0 0 30px rgba(74, 255, 90, 0.5), 0 0 60px rgba(74, 255, 90, 0.3)',
                animation: animationStage >= 3 ? 'glow 2s ease-in-out infinite alternate' : 'none',
              }}
            >
              CONSULTORIA GRATUITA
            </span>
          </h3>
        </div>

        {/* Second Content Block with staggered reveal */}
        <div 
          className={`space-y-6 mb-16 transition-all duration-1000 ease-out ${
            animationStage >= 4 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed">
            Antes de falarmos de números,{' '}
            <span className="text-growave-green font-bold">quero conhecer a fundo a sua empresa</span>.
            {' '}Isso me permite criar uma estratégia sob medida para você.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed">
            <span className="text-growave-green font-bold">Ofereço um encontro inicial sem custos</span>.
            {' '}Aqui, exploraremos suas metas e{' '}
            <span className="text-growave-green font-bold">como podemos ajudar a alcançá-las</span>.
          </p>
        </div>

        {/* CTA Button with pop animation */}
        <div 
          className={`text-center transition-all duration-700 ${
            animationStage >= 5 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-10 opacity-0 scale-90'
          }`}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="group relative text-base sm:text-lg py-6 px-10 sm:px-12 bg-transparent border-2 border-growave-green text-growave-green hover:bg-growave-green hover:text-black transition-all duration-500 rounded-full font-semibold overflow-hidden hover:scale-105"
                style={{
                  boxShadow: animationStage >= 5 
                    ? '0 0 30px rgba(74, 255, 90, 0.2), 0 0 60px rgba(74, 255, 90, 0.1)' 
                    : 'none',
                  animation: animationStage >= 5 ? 'buttonPulse 2s ease-in-out infinite' : 'none',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Agende sua consultoria gratuita
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-transparent border-none shadow-none">
              <DialogHeader className="sr-only">
                <DialogTitle>Formulário de Contato</DialogTitle>
              </DialogHeader>
              <ContactForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 40px rgba(74, 255, 90, 0.4), 0 0 80px rgba(74, 255, 90, 0.2); }
          to { text-shadow: 0 0 60px rgba(74, 255, 90, 0.6), 0 0 100px rgba(74, 255, 90, 0.3); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(74, 255, 90, 0.2), 0 0 60px rgba(74, 255, 90, 0.1); }
          50% { box-shadow: 0 0 40px rgba(74, 255, 90, 0.4), 0 0 80px rgba(74, 255, 90, 0.2); }
        }
      `}</style>
    </section>
  );
};

export default InvestmentSection;
