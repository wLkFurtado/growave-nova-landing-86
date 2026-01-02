import { useState, useEffect, useRef } from 'react';
import { Calendar, FileText, Infinity } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  tags: string[];
  idealFor: string;
  delay: number;
};

const ServiceCard = ({
  title,
  description,
  icon,
  features,
  tags,
  idealFor,
  delay
}: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
      }
    }, {
      threshold: 0.1
    });
    
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
      className="bg-gradient-to-b from-growave-black-light to-black rounded-[20px] p-[2px] relative group hover:scale-[1.02] transition-all duration-300 border border-growave-green/20 hover:border-growave-green/50 hover:shadow-[0_0_30px_rgba(74,255,90,0.3)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s, transform 0.5s'
      }}
    >
      <div className="bg-gradient-to-b from-growave-black-light to-black rounded-[18px] p-[30px] h-full flex flex-col relative overflow-hidden">
        {/* Grid pattern background */}
        <div 
          className="absolute inset-0 opacity-20 rounded-[18px]"
          style={{
            backgroundImage: 'linear-gradient(rgba(74, 255, 90, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 255, 90, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Animated border lines on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-growave-green to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-growave-green to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-t-2 border-growave-green/40 group-hover:border-growave-green transition-colors duration-300" />
        <div className="absolute top-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-t-2 border-growave-green/40 group-hover:border-growave-green transition-colors duration-300" />
        <div className="absolute bottom-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-b-2 border-growave-green/40 group-hover:border-growave-green transition-colors duration-300" />
        <div className="absolute bottom-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-b-2 border-growave-green/40 group-hover:border-growave-green transition-colors duration-300" />
        
        {/* Status badge */}
        <div className="flex items-center gap-[8px] mb-[25px] relative z-10">
          <div className="w-[8px] h-[8px] rounded-full bg-growave-green shadow-[0_0_10px_rgba(74,255,90,0.8)] animate-pulse" />
          <span className="text-growave-green font-semibold text-[12px] tracking-wider">DISPONÍVEL</span>
        </div>
        
        {/* Icon */}
        <div className="mb-[20px] relative z-10">
          <div className="w-[80px] h-[80px] bg-growave-green/10 rounded-[15px] flex items-center justify-center backdrop-blur-sm border border-growave-green/20 group-hover:bg-growave-green/20 transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight leading-tight mb-[15px] relative z-10 group-hover:text-growave-green transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-400 font-light text-[14px] leading-[1.6] mb-[25px] flex-grow relative z-10">
          {description}
        </p>
        
        {/* Features list */}
        <ul className="space-y-[8px] mb-[25px] relative z-10">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-[10px] text-gray-300 text-[13px]">
              <span className="text-growave-green">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-[10px] mb-[20px] relative z-10">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-[15px] py-[6px] bg-growave-green/10 border border-growave-green/30 rounded-[20px] text-growave-green text-[11px] font-semibold tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Ideal for section */}
        <div className="mt-auto pt-[15px] border-t border-growave-green/20 relative z-10">
          <p className="text-growave-green text-[10px] font-bold tracking-wider mb-[5px]">IDEAL PARA:</p>
          <p className="text-gray-400 text-[12px] italic">{idealFor}</p>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "CAMPANHAS DE CAPTAÇÃO",
      description: "Estratégias personalizadas no Facebook e Instagram para atrair pacientes em potencial para sua clínica ou consultório.",
      icon: <img alt="Meta Ads" className="w-[50px] h-[50px]" src="/lovable-uploads/f0c8859e-2f9e-4999-9396-cc15175fca64.png" />,
      features: ["Facebook & Instagram Ads", "Segmentação Avançada", "Otimização Contínua"],
      tags: ["META ADS", "CONVERSÃO"],
      idealFor: "Clínicas que buscam aumentar o volume de pacientes"
    },
    {
      title: "SEO & GOOGLE ADS",
      description: "Posicione sua clínica nos primeiros resultados de busca e capture pacientes no momento exato em que procuram.",
      icon: <img alt="Google Ads" className="w-[50px] h-[50px]" src="/lovable-uploads/42347d83-47ac-4864-9a74-dee608049f54.png" />,
      features: ["Primeira Página do Google", "Tráfego Qualificado", "ROI Mensurável"],
      tags: ["GOOGLE", "SEO"],
      idealFor: "Clínicas que querem ser encontradas online"
    },
    {
      title: "AUTOMAÇÃO DE AGENDAMENTOS",
      description: "Sistemas automatizados para marcação, confirmação e lembretes de consultas, reduzindo faltas e otimizando a agenda.",
      icon: <Calendar className="w-[50px] h-[50px] text-growave-green" />,
      features: ["Agendamento 24h", "Lembretes Automáticos", "Redução de Faltas"],
      tags: ["AUTOMAÇÃO", "PRODUTIVIDADE"],
      idealFor: "Clínicas com alto volume de agendamentos"
    },
    {
      title: "CRM PARA CLÍNICAS",
      description: "Sistema de gestão de relacionamento com pacientes adaptado às necessidades específicas da sua especialidade.",
      icon: <Infinity className="w-[50px] h-[50px] text-growave-green" />,
      features: ["Histórico de Pacientes", "Follow-up Automatizado", "Relatórios Detalhados"],
      tags: ["CRM", "GESTÃO"],
      idealFor: "Clínicas que valorizam o relacionamento"
    },
    {
      title: "CHATBOTS INTELIGENTES",
      description: "Bots inteligentes para triagem inicial, esclarecimento de dúvidas e qualificação de pacientes 24 horas.",
      icon: <img alt="Chatbot" className="w-[50px] h-[50px]" src="/lovable-uploads/71bac2a2-33c5-4cb3-bedf-d5f33c126426.png" />,
      features: ["Atendimento 24h", "Qualificação de Leads", "Integração WhatsApp"],
      tags: ["IA", "CHATBOT"],
      idealFor: "Clínicas que recebem muitos contatos"
    },
    {
      title: "LANDING PAGES",
      description: "Páginas de alta conversão focadas em tratamentos específicos, procedimentos e especialidades médicas.",
      icon: <FileText className="w-[50px] h-[50px] text-growave-green" />,
      features: ["Alta Conversão", "Design Responsivo", "Otimizado para Ads"],
      tags: ["LANDING PAGE", "CONVERSÃO"],
      idealFor: "Clínicas com campanhas de tráfego pago"
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-growave-blue/10 via-transparent to-growave-blue/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Nossas <span className="gradient-text">Soluções</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tecnologias avançadas e estratégias especializadas para impulsionar clínicas e consultórios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
