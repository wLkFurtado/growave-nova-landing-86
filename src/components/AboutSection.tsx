
import { useRef, useEffect, useState } from 'react';
import { CheckCircle, HeartPulse, Award, TrendingUp } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const FeatureCard = ({
  icon,
  title,
  description,
  delay
}: FeatureCardProps) => {
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

  return <div ref={ref} className="bg-black/60 backdrop-blur border border-growave-green/10 rounded-lg p-6 transform transition-all duration-500" style={{
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
  }}>
      <div className="bg-growave-green/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>;
};

const AboutSection = () => {
  return <section id="about" className="py-8 relative">
      {/* Background with enhanced gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-growave-blue/20 to-black/90 z-0 my-[9px] py-0"></div>
      
      <div className="container mx-auto sm:px-6 lg:px-8 relative z-10 px-[30px] py-0">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 my-0">Por que a Growave?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Somos especialistas em marketing digital para o setor de saúde, 
            com profundo conhecimento técnico e estratégias comprovadas para clínicas e consultórios.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon={<HeartPulse className="w-6 h-6 text-growave-green" />} title="Especialistas em Saúde" description="Equipe com conhecimento específico do mercado médico, odontológico e estético." delay={0} />
          <FeatureCard icon={<CheckCircle className="w-6 h-6 text-growave-green" />} title="Conformidade Normativa" description="Estratégias em total conformidade com os códigos éticos de publicidade em saúde." delay={200} />
          <FeatureCard icon={<Award className="w-6 h-6 text-growave-green" />} title="Experiência Comprovada" description="Mais de 5 anos transformando a presença digital de clínicas e consultórios." delay={400} />
          <FeatureCard icon={<TrendingUp className="w-6 h-6 text-growave-green" />} title="Resultados Mensuráveis" description="Aumento médio de 320% no número de agendamentos dos nossos clientes." delay={600} />
        </div>
      </div>
    </section>;
};

export default AboutSection;
