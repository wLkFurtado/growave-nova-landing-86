import { useState, useEffect, useRef } from 'react';
import { Target, UserCheck, Sparkles, Repeat, Zap, TrendingUp, Heart, MessageCircle, Star, Gift } from 'lucide-react';

const ConversionCycleSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => setAnimationStage(1), 300);
          setTimeout(() => setAnimationStage(2), 600);
          setTimeout(() => setAnimationStage(3), 900);
          setTimeout(() => setAnimationStage(4), 1200);
          setTimeout(() => setAnimationStage(5), 1500);
          setTimeout(() => setAnimationStage(6), 1800);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const cycleSteps = [
    {
      id: 'captacao',
      icon: Target,
      title: 'Captação Inteligente',
      position: { top: '5%', left: '20%' },
      delay: 1,
    },
    {
      id: 'engajamento',
      icon: MessageCircle,
      title: 'Engajamento Ativo',
      position: { top: '5%', right: '20%' },
      delay: 2,
    },
    {
      id: 'filtragem',
      icon: Star,
      title: 'Filtragem Premium',
      position: { bottom: '35%', left: '15%' },
      delay: 4,
    },
    {
      id: 'reativacao',
      icon: Repeat,
      title: 'Reativação Automática',
      position: { bottom: '35%', right: '15%' },
      delay: 3,
    },
  ];

  const detailCards = [
    {
      icon: Target,
      title: 'Captação Inteligente',
      description: 'Estratégias de marketing digital atraem pacientes ideais 24/7. CRM integrado captura e organiza cada lead automaticamente. Sistema completo garantindo fluxo constante.',
      color: 'from-gray-800/40 to-gray-900/40',
      borderColor: 'border-gray-700/40',
      iconBg: 'bg-gray-800/50',
      textColor: 'text-growave-green',
    },
    {
      icon: Star,
      title: 'Filtragem Premium',
      description: 'CRM qualifica e segmenta leads automaticamente. IA prioriza contatos com maior potencial de conversão. Seu time foca apenas em pacientes prontos para agendar.',
      color: 'from-gray-800/40 to-gray-900/40',
      borderColor: 'border-gray-700/40',
      iconBg: 'bg-gray-800/50',
      textColor: 'text-growave-green',
    },
    {
      icon: Zap,
      title: 'Conversão Otimizada',
      description: 'CRM organiza informações e histórico completo de cada lead. Sua secretária converte com scripts validados, processos otimizados e todos os dados na mão.',
      color: 'from-growave-green/10 to-growave-green/5',
      borderColor: 'border-growave-green/30',
      iconBg: 'bg-growave-green/10',
      textColor: 'text-growave-green',
    },
    {
      icon: Heart,
      title: 'Experiência Memorável',
      description: 'CRM registra histórico completo de cada paciente. IA personaliza comunicação. Cada cliente recebe atenção VIP através de mensagens estratégicas no momento perfeito.',
      color: 'from-gray-800/40 to-gray-900/40',
      borderColor: 'border-gray-700/40',
      iconBg: 'bg-gray-800/50',
      textColor: 'text-growave-green',
    },
    {
      icon: Gift,
      title: 'Reativação Estratégica',
      description: 'CRM identifica pacientes inativos automaticamente. IA detecta o momento ideal e dispara ofertas irresistíveis. Sistema reconquista cada cliente com precisão cirúrgica.',
      color: 'from-gray-800/40 to-gray-900/40',
      borderColor: 'border-gray-700/40',
      iconBg: 'bg-gray-800/50',
      textColor: 'text-growave-green',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute w-96 h-96 rounded-full bg-growave-green/10 blur-3xl transition-all duration-[2000ms] ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main Title */}
        <div className="text-center mb-20 overflow-hidden">
          <h2 
            className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-6 transition-all duration-1000 ${
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
            }}
          >
            O Ciclo Automático da Clínica com Rumo
          </h2>
          <p 
            className={`text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              animationStage >= 1 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}
          >
            CRM + IA trabalham 24h por dia capturando, qualificando e convertendo pacientes automaticamente
          </p>
        </div>

        {/* Conversion Cycle Diagram */}
        <div className="relative max-w-4xl mx-auto mb-24">
          <div className="relative h-[500px] md:h-[600px]">
            {/* Center - Sistema Automático */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                animationStage >= 2 
                  ? 'scale-100 opacity-100' 
                  : 'scale-0 opacity-0'
              }`}
            >
              <div 
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-growave-green/30 via-growave-green/20 to-growave-green/10 backdrop-blur-xl border-2 border-growave-green/40 flex flex-col items-center justify-center shadow-2xl"
                style={{
                  boxShadow: '0 0 60px rgba(74, 255, 90, 0.3), 0 0 120px rgba(74, 255, 90, 0.1)',
                }}
              >
                <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-growave-green mb-2" strokeWidth={2} />
                <span className="text-white font-bold text-base md:text-lg uppercase tracking-wide text-center px-2">Sistema 24/7</span>
              </div>
            </div>

            {/* Cycle Steps */}
            {cycleSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`absolute transition-all duration-1000`}
                  style={{
                    ...step.position,
                    transitionDelay: `${step.delay * 200}ms`,
                    opacity: animationStage >= step.delay ? 1 : 0,
                    transform: animationStage >= step.delay ? 'scale(1)' : 'scale(0)',
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div 
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-gray-300" strokeWidth={2} />
                    </div>
                    <span className="text-white font-semibold text-sm md:text-base text-center">{step.title}</span>
                  </div>
                </div>
              );
            })}

            {/* Connecting Arrows - SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="rgba(255, 255, 255, 0.3)" />
                </marker>
              </defs>
              
              {/* Arrows connecting the cycle */}
              <path
                d="M 35% 20% Q 50% 30%, 48% 45%"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                className={`transition-all duration-1000 ${animationStage >= 3 ? 'opacity-100' : 'opacity-0'}`}
              />
              <path
                d="M 65% 20% Q 50% 30%, 52% 45%"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                className={`transition-all duration-1000 ${animationStage >= 3 ? 'opacity-100' : 'opacity-0'}`}
              />
              <path
                d="M 30% 65% Q 40% 55%, 45% 52%"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                className={`transition-all duration-1000 ${animationStage >= 4 ? 'opacity-100' : 'opacity-0'}`}
              />
              <path
                d="M 70% 65% Q 60% 55%, 55% 52%"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                className={`transition-all duration-1000 ${animationStage >= 4 ? 'opacity-100' : 'opacity-0'}`}
              />
            </svg>
          </div>
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {detailCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`transition-all duration-1000 ${
                  animationStage >= 5 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div 
                  className={`relative h-full bg-gradient-to-br ${card.color} backdrop-blur-sm border ${card.borderColor} rounded-2xl p-6 hover:scale-105 transition-all duration-300 group`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 ${card.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${card.textColor}`} strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-3 ${card.textColor}`}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* Bottom accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent ${card.textColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default ConversionCycleSection;
