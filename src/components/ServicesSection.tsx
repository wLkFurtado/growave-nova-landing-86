import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, FileText, BarChart, Infinity } from 'lucide-react';
type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
};
const ServiceCard = ({
  title,
  description,
  icon,
  delay
}: ServiceCardProps) => {
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
  return <div ref={ref} className="flex flex-col bg-black/60 backdrop-blur border border-growave-green/10 rounded-lg p-6 transform transition-all duration-500 hover:border-growave-green/30 card-glow" style={{
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
  }}>
      <div className="bg-growave-green/10 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      <Button variant="ghost" className="text-growave-green border border-growave-green/30 hover:bg-growave-green hover:text-black justify-start">
        Saiba mais
      </Button>
    </div>;
};
const ServicesSection = () => {
  return <section id="services" className="py-16 relative circuit-pattern">
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Nossas Soluções</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Utilizamos tecnologias avançadas e estratégias especializadas para impulsionar clínicas e consultórios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard title="Campanhas para Captação de Pacientes" description="Estratégias personalizadas no Facebook e Instagram para atrair pacientes em potencial para sua clínica ou consultório." icon={<img alt="Infinity" className="w-8 h-8" src="/lovable-uploads/f0c8859e-2f9e-4999-9396-cc15175fca64.png" />} delay={0} />
          <ServiceCard title="SEO e Google Ads para Clínicas" description="Posicione sua clínica nos primeiros resultados de busca e capture pacientes no momento exato em que procuram por seus serviços." icon={<img alt="Google Ads" className="w-8 h-8" src="/lovable-uploads/42347d83-47ac-4864-9a74-dee608049f54.png" />} delay={200} />
          <ServiceCard title="Automação de Agendamentos" description="Sistemas automatizados para marcação, confirmação e lembretes de consultas, reduzindo faltas e otimizando a agenda da clínica." icon={<Calendar className="w-8 h-8 text-growave-green" />} delay={400} />
          <ServiceCard title="CRM para Clínicas" description="Sistema de gestão de relacionamento com pacientes adaptado às necessidades específicas da sua especialidade médica." icon={<Infinity className="w-8 h-8 text-growave-green" />} delay={600} />
          <ServiceCard title="Chatbots para Pré-atendimento" description="Bots inteligentes para triagem inicial, esclarecimento de dúvidas e qualificação de pacientes antes da consulta." icon={<MessageCircle className="w-8 h-8 text-growave-green" />} delay={800} />
          <ServiceCard title="Landing Pages para Especialidades" description="Páginas de alta conversão focadas em tratamentos específicos, procedimentos e especialidades médicas da sua clínica." icon={<FileText className="w-8 h-8 text-growave-green" />} delay={1000} />
        </div>
      </div>
    </section>;
};
export default ServicesSection;