import { useEffect, useState, useRef } from 'react';

// Hook for animated counter
const useCountUp = (end: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);
  
  return count;
};

type MetricProps = {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
};

const BigMetric = ({ value, suffix, label, sublabel, delay }: MetricProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animatedCount = useCountUp(value, 2000, isVisible);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={ref}
      className="text-center transform transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)'
      }}
    >
      <div className="relative inline-block">
        <span className="text-7xl md:text-8xl lg:text-9xl font-bold gradient-text">
          {animatedCount}{suffix}
        </span>
        {/* Glow effect behind the number */}
        <div className="absolute inset-0 blur-3xl bg-growave-green/20 -z-10 scale-150" />
      </div>
      <p className="text-xl md:text-2xl font-semibold text-white mt-4">{label}</p>
      <p className="text-gray-400 mt-2 max-w-xs mx-auto">{sublabel}</p>
    </div>
  );
};

const ResultsSection = () => {
  return (
    <section id="results" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-growave-blue/10 to-black" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-growave-green/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-growave-green/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Resultados que <span className="gradient-text">Impressionam</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Números que refletem nosso compromisso com o crescimento das clínicas parceiras
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 lg:gap-32">
          <BigMetric 
            value={50}
            suffix="+"
            label="Clínicas Atendidas"
            sublabel="Em diversas especialidades médicas e estéticas por todo o Brasil"
            delay={0}
          />
          
          {/* Decorative divider */}
          <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-growave-green/50 to-transparent" />
          
          <BigMetric 
            value={4}
            suffix=" anos"
            label="De Experiência"
            sublabel="Transformando a presença digital de clínicas e consultórios"
            delay={300}
          />
        </div>

        {/* Bottom highlight bar */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-growave-green/10 border border-growave-green/20">
            <div className="w-2 h-2 rounded-full bg-growave-green animate-pulse" />
            <span className="text-gray-300 text-sm">Resultados consistentes mês após mês</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
