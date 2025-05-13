
import { useState, useEffect, useRef } from 'react';

const clientLogos = [
  {
    id: 1,
    name: 'Paula Menezes',
    logo: '/lovable-uploads/ff8e9dd2-5022-48cd-bdd8-157e5daecd0c.png',
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
    name: 'Odonto Corporate',
    logo: '/lovable-uploads/71b1f69b-02ab-45cc-b50c-61a67ec59268.png',
  },
];

const ClientLogosSection = () => {
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
    <section className="py-16 relative bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-growave-blue/5 to-black"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref}>
          <h3 className="text-2xl font-bold text-center mb-10">Clínicas que Confiam na Growave</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {clientLogos.map((partner, index) => (
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

export default ClientLogosSection;
