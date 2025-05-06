
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section 
      id="testimonials" 
      className="py-20 relative bg-gradient-to-b from-black via-growave-blue/20 to-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Histórias reais de empresas que transformaram seus resultados com nossas soluções
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="bg-black/40 backdrop-blur border border-growave-green/10 rounded-xl">
                    <CardContent className="px-6 py-12">
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
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === 0 
                    ? 'bg-growave-green w-8' 
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
