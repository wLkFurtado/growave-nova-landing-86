import { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';

const CRMComparisonSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const problems = [
    'Leads perdidos em conversas infinitas de WhatsApp',
    'Secretária esquece de cobrar o "vou ver e te falo"',
    'Não sabe quanto faturou vs. quanto investiu',
    'Agenda bagunçada, pacientes remarcam sem parar',
    'Não sabe qual anúncio trouxe resultado',
    'Perda de tempo com planilhas e anotações manuais',
  ];

  const solutions = [
    'Histórico completo de cada paciente organizado',
    'Lembretes automáticos para a recepção não esquecer ninguém',
    'Relatório de ROI exato (Sabemos qual anúncio trouxe o lucro)',
    'Gestão profissional de agenda com confirmações automáticas',
    'Rastreamento completo: da visualização do anúncio até o agendamento',
    'CRM integrado que centraliza tudo em um só lugar',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-5xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-4 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: '0.05em',
              color: '#ffffff',
            }}
          >
            O Que Muda de Verdade na Sua Clínica
          </h2>
        </div>

        {/* Single Column Layout */}
        <div className="space-y-16">
          {/* Como é hoje (Sem CRM) */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-red-400 mb-2" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
                Sem Clínica com Rumo:
              </h3>
              <div className="w-20 h-1 bg-red-500"></div>
            </div>
            
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-red-950/20 border-l-4 border-red-500 transition-all duration-700 hover:bg-red-950/30 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-red-500" strokeWidth={3} />
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed flex-1">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider with icon */}
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <div className="mx-6 text-4xl">⬇️</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>

          {/* Com o Método Clínica com Rumo */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-growave-green mb-2" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
                Com Clínica com Rumo:
              </h3>
              <div className="w-20 h-1 bg-growave-green"></div>
            </div>
            
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-growave-green/5 border-l-4 border-growave-green transition-all duration-700 hover:bg-growave-green/10 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${700 + index * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-growave-green/20 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-growave-green" strokeWidth={3} />
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed flex-1">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: '0.02em' }}>
            Simples assim.{' '}
            <span className="text-growave-green">Nosso método transforma</span>{' '}
            gestão caótica em máquina de vendas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CRMComparisonSection;

