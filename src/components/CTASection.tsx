
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  'Estratégias específicas para sua especialidade médica',
  'Marketing em conformidade com normas da saúde',
  'Captação e retenção de pacientes',
  'Automação de agendamentos e confirmações',
  'Lembretes automáticos para retornos',
  'Campanhas específicas para cada tratamento',
];

const CTASection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-growave-black via-growave-blue/20 to-growave-black z-0"></div>
      
      {/* Glowing effect */}
      <div 
        className={`absolute -top-24 -left-24 w-96 h-96 rounded-full bg-growave-green/10 blur-3xl transition-all duration-700 ${
          isHovered ? 'opacity-40 scale-110' : 'opacity-20'
        }`}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-black/40 backdrop-blur border border-growave-green/10 rounded-xl p-8 lg:p-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Pronto para <span className="gradient-text">transformar</span> sua clínica?
              </h2>
              
              <p className="text-gray-300 mb-8">
                Agende um diagnóstico gratuito e descubra como nossas soluções 
                podem impulsionar sua clínica ou consultório através de estratégias 
                personalizadas de marketing digital e automação.
              </p>
              
              <div className="mb-8">
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-growave-green shrink-0 mr-3 h-5 w-5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className="text-md py-6 px-8 bg-growave-green text-black hover:bg-growave-green-light animate-pulse-soft"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Agendar Diagnóstico Gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Form-like visual */}
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-growave-green">Fale Conosco</h3>
                  
                  <div className="space-y-4">
                    <div className="h-10 bg-white/10 rounded"></div>
                    <div className="h-10 bg-white/10 rounded"></div>
                    <div className="h-10 bg-white/10 rounded"></div>
                    <div className="h-24 bg-white/10 rounded"></div>
                    <Button 
                      className="w-full bg-growave-green text-black hover:bg-growave-green-light"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Enviar
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-sm text-center text-gray-400">
                    Responderemos em até 24 horas úteis
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-growave-green/30 rounded-tr-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-growave-green/30 rounded-bl-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
