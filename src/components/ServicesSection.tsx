
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Chrome, Database, Bot, BarChart } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
};

const ServiceCard = ({ title, description, icon, delay }: ServiceCardProps) => {
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
      className="flex flex-col bg-black/60 backdrop-blur border border-growave-green/10 rounded-lg p-6 transform transition-all duration-500 hover:border-growave-green/30 card-glow"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="bg-growave-green/10 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      <Button variant="ghost" className="text-growave-green border border-growave-green/30 hover:bg-growave-green hover:text-black justify-start">
        Saiba mais
      </Button>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 relative circuit-pattern">
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Nossas Soluções</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Utilizamos tecnologias avançadas e estratégias comprovadas para impulsionar seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Tráfego Pago Meta Ads"
            description="Campanhas estratégicas no Facebook e Instagram para alcançar seu público-alvo ideal e gerar leads qualificados."
            icon={<Facebook className="w-8 h-8 text-growave-green" />}
            delay={0}
          />
          <ServiceCard
            title="Tráfego Pago Google Ads"
            description="Maximize sua presença nos resultados de busca e alcance clientes no momento exato em que procuram pelos seus serviços."
            icon={<Chrome className="w-8 h-8 text-growave-green" />}
            delay={200}
          />
          <ServiceCard
            title="Automação com n8n"
            description="Automatize processos e integre ferramentas para otimizar fluxos de trabalho e economizar tempo valioso para sua equipe."
            icon={
              <div className="relative">
                <img
                  src="https://avatars.githubusercontent.com/u/60006201"
                  alt="n8n"
                  className="w-8 h-8"
                />
              </div>
            }
            delay={400}
          />
          <ServiceCard
            title="CRM Personalizado"
            description="Sistemas de gestão de relacionamento com clientes adaptados às necessidades específicas do seu negócio."
            icon={<Database className="w-8 h-8 text-growave-green" />}
            delay={600}
          />
          <ServiceCard
            title="Atendimento com IA"
            description="Bots inteligentes para automação de atendimento, qualificação de leads e aumento de conversões."
            icon={<Bot className="w-8 h-8 text-growave-green" />}
            delay={800}
          />
          <ServiceCard
            title="Análise e Otimização"
            description="Monitoramento contínuo de KPIs e otimização de campanhas para maximizar o retorno sobre investimento."
            icon={<BarChart className="w-8 h-8 text-growave-green" />}
            delay={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
