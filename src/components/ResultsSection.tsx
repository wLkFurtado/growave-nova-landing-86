
import { useEffect, useState, useRef } from 'react';
import { Users, Calendar, TrendingUp, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  delay: number;
  highlightSecondLine?: boolean;
  highlightWord?: string;
};
const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  delay,
  highlightSecondLine = false,
  highlightWord
}: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  // Render title with optional highlighted word
  const renderTitle = () => {
    if (highlightSecondLine) {
      const titleParts = title.split('|');
      return <>
          <h3 className="text-lg text-gray-200 font-medium mb-1">{titleParts[0]}</h3>
        </>;
    }
    
    if (highlightWord && title.includes(highlightWord)) {
      const parts = title.split(highlightWord);
      return (
        <h3 className="text-lg text-gray-200 font-medium mb-2">
          {parts[0]}
          <span className="text-growave-green">{highlightWord}</span>
          {parts[1]}
        </h3>
      );
    }
    
    return <h3 className="text-lg text-gray-200 font-medium mb-2">{title}</h3>;
  };
  
  return <div ref={ref} className="flex flex-col bg-gradient-to-br from-growave-black-light to-growave-blue/30 p-6 md:p-8 rounded-lg border border-growave-green/10 card-glow transform transition-all duration-500" style={{
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
  }}>
      <div className="bg-growave-green/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      {renderTitle()}
      <div className="mb-2 flex items-center">
        <span className="text-3xl font-bold text-growave-green">
          {isVisible ? value : "0"}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>;
};
const ResultsSection = () => {
  return <section id="results" className="py-16 relative gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Resultados Comprovados</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Impulsionamos clínicas e consultórios através de estratégias digitais especializadas para a área da saúde
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Calendar className="w-6 h-6 text-growave-green" />} title="Crescimento no Volume de|Consultas" value="Consultas" subtitle="Campanhas que impulsionam o volume de pacientes para clínicas em todo o Brasil" delay={0} highlightSecondLine={true} />
          <StatCard icon={<Users className="w-6 h-6 text-growave-green" />} title="Clínicas atendidas em todo o país" value="50+" subtitle="Com foco em diversas especialidades médicas e estéticas" delay={200} />
          <StatCard icon={<TrendingUp className="w-6 h-6 text-growave-green" />} title="Resultados Expressivos Crescentes" value="Expressivo" subtitle="Crescimento expressivo em campanhas mensais para nossos parceiros" delay={400} highlightWord="Crescentes" />
          <StatCard icon={<Target className="w-6 h-6 text-growave-green" />} title="Conversão com qualidade" value="Consistente" subtitle="Alta performance em campanhas com foco em pacientes qualificados" delay={600} />
        </div>
      </div>
    </section>;
};
export default ResultsSection;
