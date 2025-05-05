
import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Oliveira',
    company: 'TechSoft Solutions',
    role: 'CEO',
    testimonial: 'A parceria com a Growave transformou completamente nossa aquisição de clientes. Em apenas 3 meses, triplicamos nossas conversões e reduzimos o custo por lead em 40%.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Marina Costa',
    company: 'Beauty Store',
    role: 'Diretora de Marketing',
    testimonial: 'A implementação do sistema de automação desenvolvido pela Growave nos permitiu escalar o atendimento sem aumentar nossa equipe. O bot de IA qualifica perfeitamente os leads antes de direcioná-los para a equipe de vendas.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Rafael Mendes',
    company: 'Construtora Horizonte',
    role: 'Gerente Comercial',
    testimonial: 'Depois de trabalhar com várias agências de marketing digital, encontramos na Growave uma parceira que realmente entregou resultados. O ROI das campanhas superou todas as nossas expectativas.',
    stars: 5,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState('');
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    if (sliding) return;
    
    setSliding(true);
    setDirection('right');
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setSliding(false);
    }, 500);
  };
  
  const prevSlide = () => {
    if (sliding) return;
    
    setSliding(true);
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setSliding(false);
    }, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(nextSlide, 5000);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, [activeIndex, sliding]);

  return (
    <section 
      id="testimonials" 
      className="py-20 relative bg-gradient-to-b from-black via-growave-blue/20 to-black"
      ref={testimonialsRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Histórias reais de empresas que transformaram seus resultados com nossas soluções
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-5 sm:-translate-x-10 z-10">
            <Button 
              onClick={prevSlide} 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/50 hover:bg-growave-green hover:text-black border border-growave-green/30"
              disabled={sliding}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 sm:translate-x-10 z-10">
            <Button 
              onClick={nextSlide} 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/50 hover:bg-growave-green hover:text-black border border-growave-green/30"
              disabled={sliding}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Testimonials slides */}
          <div className="overflow-hidden relative rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ 
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-6 py-12 bg-black/40 backdrop-blur border border-growave-green/10 rounded-xl"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.stars ? 'text-growave-green fill-growave-green' : 'text-gray-400'}`} 
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl italic text-center mb-8">
                    "{testimonial.testimonial}"
                  </blockquote>
                  
                  <div className="text-center">
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-growave-green">{testimonial.role} - {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'bg-growave-green w-8' 
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
                onClick={() => {
                  setDirection(index > activeIndex ? 'right' : 'left');
                  setActiveIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
