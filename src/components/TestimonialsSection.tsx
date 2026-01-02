
import { useState, useEffect, useCallback } from 'react';
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: 'Dr. André Silveira',
    company: 'Clínica Odontológica Prevident',
    role: 'Cirurgião-Dentista',
    testimonial: 'Com a Growave, conseguimos triplicar o número de novos pacientes em apenas 2 meses. As estratégias de marketing são totalmente alinhadas com as normas do Conselho Federal de Odontologia e os resultados superam todas as expectativas.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Dra. Camila Mendes',
    company: 'Clínica Derma Beauty',
    role: 'Dermatologista',
    testimonial: 'A automação implementada pela Growave revolucionou nosso agendamento. Reduzimos as faltas em 75% e conseguimos otimizar completamente nossa agenda. O chatbot qualifica perfeitamente os pacientes antes da consulta.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Dr. Roberto Almeida',
    company: 'Centro Médico Vitalidade',
    role: 'Diretor Clínico',
    testimonial: 'Como gestor de uma clínica multiprofissional, posso dizer que o ROI das campanhas da Growave superou todas as nossas expectativas. Cada especialidade médica recebeu uma estratégia personalizada e os resultados são impressionantes.',
    stars: 5,
  },
];

const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Handle carousel index change
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Autoplay with hover pause
  useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  // Navigate to specific slide
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section 
      id="testimonials" 
      className="py-16 relative bg-gradient-to-b from-black via-growave-blue/20 to-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Depoimentos de profissionais da saúde que transformaram seus resultados com nossas soluções
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="bg-black/40 backdrop-blur border border-growave-green/10 rounded-xl">
                    <CardContent className="px-6 py-10">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.stars ? 'text-growave-green fill-growave-green' : 'text-gray-400'}`} 
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-xl md:text-2xl italic text-center mb-6">
                        "{testimonial.testimonial}"
                      </blockquote>
                      
                      <div className="text-center">
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-growave-green">{testimonial.role} - {testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-14 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-growave-green hover:text-black border border-growave-green/30" />
              <CarouselNext className="absolute -right-14 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-growave-green hover:text-black border border-growave-green/30" />
            </div>
            <div className="md:hidden flex justify-center mt-6 gap-4">
              <CarouselPrevious className="static bg-black/50 hover:bg-growave-green hover:text-black border border-growave-green/30 translate-x-0 translate-y-0" />
              <CarouselNext className="static bg-black/50 hover:bg-growave-green hover:text-black border border-growave-green/30 translate-x-0 translate-y-0" />
            </div>
          </Carousel>
          
          {/* Functional dots indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-growave-green w-8' 
                    : 'bg-gray-500 hover:bg-gray-400 w-3'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

