
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 1,
    name: 'Clínica Odontológica Sorrisos',
    specialty: 'Odontologia',
    result: '400% mais agendamentos em 3 meses',
    image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80',
    description: 'Implementação de estratégia multicanal para captação de pacientes para tratamentos odontológicos específicos.'
  },
  {
    id: 2,
    name: 'Centro Médico Vitalidade',
    specialty: 'Multiprofissional',
    result: '280% de aumento no retorno sobre investimento',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
    description: 'Automação completa do processo de agendamento e campanhas segmentadas por especialidade.'
  },
  {
    id: 3,
    name: 'Clínica Dermatológica Pele Perfeita',
    specialty: 'Dermatologia',
    result: '320 novos pacientes em procedimentos estéticos',
    image: 'https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&q=80',
    description: 'Campanhas específicas para tratamentos estéticos com alta conversão e baixo custo de aquisição.'
  }
];

const partnerLogos = [
  {
    id: 1,
    name: 'Clínica A',
    logo: 'https://via.placeholder.com/150x80?text=Clínica+A',
  },
  {
    id: 2,
    name: 'Centro Médico B',
    logo: 'https://via.placeholder.com/150x80?text=Centro+B',
  },
  {
    id: 3,
    name: 'Hospital C',
    logo: 'https://via.placeholder.com/150x80?text=Hospital+C',
  },
  {
    id: 4,
    name: 'Consultório D',
    logo: 'https://via.placeholder.com/150x80?text=Consultório+D',
  },
  {
    id: 5,
    name: 'Clínica E',
    logo: 'https://via.placeholder.com/150x80?text=Clínica+E',
  },
];

const CaseStudyCard = ({ study }: { study: typeof caseStudies[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={study.image} 
          alt={study.name} 
          className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="mb-2">
          <span className="inline-block bg-growave-green/20 backdrop-blur-sm text-growave-green text-xs px-3 py-1 rounded-full">
            {study.specialty}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{study.name}</h3>
        <p className="text-gray-300 mb-3">{study.description}</p>
        <p className="text-growave-green font-semibold">{study.result}</p>
      </div>
      
      <div 
        className={`absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Button className="bg-growave-green text-black hover:bg-growave-green-light">
          Ver estudo completo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const SuccessesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  }, []);

  return (
    <section id="cases" className="py-16 relative bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-growave-blue/5 to-black"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Casos de Sucesso</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Conheça algumas clínicas e consultórios que transformaram seus resultados através das nossas soluções
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {caseStudies.map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        
        <div ref={ref} className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-10">Clínicas que confiaram na Growave</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {partnerLogos.map((partner, index) => (
              <div 
                key={partner.id} 
                className="bg-white/5 backdrop-blur p-4 rounded-lg flex items-center justify-center h-20 transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-12 max-w-full grayscale hover:grayscale-0 transition-all duration-300" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessesSection;
