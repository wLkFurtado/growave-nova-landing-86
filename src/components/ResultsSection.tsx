
import { useEffect, useState, useRef } from 'react';
import { LineChart, Users, TrendingUp, Target } from 'lucide-react';

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  delay: number;
};

const StatCard = ({ icon, title, value, subtitle, delay }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className="flex flex-col bg-gradient-to-br from-growave-black-light to-growave-blue/30 p-6 md:p-8 rounded-lg border border-growave-green/10 card-glow transform transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="bg-growave-green/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg text-gray-200 font-medium mb-2">{title}</h3>
      <div className="mb-2 flex items-center">
        <span className="text-3xl font-bold gradient-text">
          {isVisible ? value : "0"}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
};

const ResultsSection = () => {
  return (
    <section id="results" className="py-24 relative gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Resultados Comprovados</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Impulsionamos negócios através da combinação de estratégias de marketing digital testadas e comprovadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <StatCard
            icon={<LineChart className="w-6 h-6 text-growave-green" />}
            title="Investimento Gerenciado"
            value="R$ 500.000+"
            subtitle="Em campanhas de anúncios"
            delay={0}
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-growave-green" />}
            title="Clientes Satisfeitos"
            value="200+"
            subtitle="Empresas atendidas"
            delay={200}
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-growave-green" />}
            title="Aumento em Vendas"
            value="350%"
            subtitle="Média de crescimento"
            delay={400}
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-growave-green" />}
            title="Taxa de Conversão"
            value="42%"
            subtitle="Acima da média de mercado"
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
