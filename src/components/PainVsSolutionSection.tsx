import { useState, useEffect, useRef } from 'react';
import { X, Check, Clock, Moon, Brain, Zap, Shield, TrendingUp } from 'lucide-react';

const PainVsSolutionSection = () => {
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
          setTimeout(() => setAnimationStage(2), 400);
          setTimeout(() => setAnimationStage(3), 700);
          setTimeout(() => setAnimationStage(4), 1000);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const painPoints = [
    { icon: Clock, text: 'Depende de horário comercial', color: 'text-red-500' },
    { icon: Moon, text: 'Atendimento limitado (dorme, almoça, folga)', color: 'text-red-500' },
    { icon: Brain, text: 'Depende de humor e disposição', color: 'text-red-500' },
    { icon: X, text: 'Esquecimento de follow-ups importantes', color: 'text-red-500' },
  ];

  const solutionPoints = [
    { icon: Zap, text: 'Atendimento 24h por dia, 7 dias por semana', color: 'text-growave-green' },
    { icon: Shield, text: 'Script validado e sempre consistente', color: 'text-growave-green' },
    { icon: Check, text: 'Zero esquecimento, 100% de precisão', color: 'text-growave-green' },
    { icon: TrendingUp, text: 'Conversão otimizada automaticamente', color: 'text-growave-green' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute w-96 h-96 rounded-full bg-red-500/5 blur-3xl transition-all duration-[2000ms] ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            top: '20%',
            left: '10%',
          }}
        />
        <div 
          className={`absolute w-96 h-96 rounded-full bg-growave-green/5 blur-3xl transition-all duration-[2500ms] delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            top: '20%',
            right: '10%',
          }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main Title */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 
            className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-6 transition-all duration-1000 ${
              animationStage >= 1 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-full opacity-0'
            }`}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #ff4444 0%, #4AFF5A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            O Problema vs. A Solução
          </h2>
          <p 
            className={`text-xl sm:text-2xl md:text-3xl font-bold text-white max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
              animationStage >= 1 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: '0.03em',
            }}
          >
            Sua secretária dorme. <span className="text-growave-green">O nosso sistema vende por você 24h.</span>
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Left Side - Pain Points (Traditional) */}
          <div 
            className={`relative transition-all duration-1000 ${
              animationStage >= 2 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-20 opacity-0'
            }`}
          >
            <div className="relative bg-gradient-to-br from-red-950/30 via-red-900/20 to-transparent border-2 border-red-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-sm hover:border-red-500/50 transition-all duration-500 group">
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-2 mb-6">
                <X className="w-5 h-5 text-red-500" />
                <span className="text-red-500 font-bold text-sm uppercase tracking-wide">Atendimento Tradicional</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-8 text-white uppercase" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
                Os Problemas
              </h3>

              <div className="space-y-5">
                {painPoints.map((point, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-4 transition-all duration-700 ${
                      animationStage >= 3 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                      <point.icon className={`w-5 h-5 ${point.color}`} />
                    </div>
                    <p className="text-gray-300 text-lg flex-1 pt-1.5">{point.text}</p>
                  </div>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            </div>
          </div>

          {/* Right Side - Solution Points */}
          <div 
            className={`relative transition-all duration-1000 ${
              animationStage >= 2 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-20 opacity-0'
            }`}
          >
            <div className="relative bg-gradient-to-br from-growave-green/20 via-growave-green/10 to-transparent border-2 border-growave-green/40 rounded-3xl p-8 md:p-10 backdrop-blur-sm hover:border-growave-green/60 transition-all duration-500 group">
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-growave-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-growave-green/20 border border-growave-green/40 rounded-full px-4 py-2 mb-6">
                <Check className="w-5 h-5 text-growave-green" />
                <span className="text-growave-green font-bold text-sm uppercase tracking-wide">Método Clínica com Rumo</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-8 text-white uppercase" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
                A Solução
              </h3>

              <div className="space-y-5">
                {solutionPoints.map((point, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-4 transition-all duration-700 ${
                      animationStage >= 3 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-growave-green/10 border border-growave-green/30 flex items-center justify-center">
                      <point.icon className={`w-5 h-5 ${point.color}`} />
                    </div>
                    <p className="text-gray-300 text-lg flex-1 pt-1.5">{point.text}</p>
                  </div>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-growave-green/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 ${
            animationStage >= 4 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-4xl mx-auto" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: '0.03em' }}>
            Pare de perder clientes enquanto você{' '}
            <span className="text-red-500">descansa</span>.{' '}
            <span className="text-growave-green">Automatize e venda mais.</span>
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default PainVsSolutionSection;
