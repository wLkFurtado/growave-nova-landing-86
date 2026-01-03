
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from './ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-growave-black via-growave-blue/20 to-growave-black z-0"></div>
      
      {/* Glowing effect */}
      <div 
        className={`absolute -top-24 -left-24 w-96 h-96 rounded-full bg-growave-green/10 blur-3xl transition-all duration-700 ${
          isHovered ? 'opacity-40 scale-110' : 'opacity-20'
        }`}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-black/40 backdrop-blur border border-growave-green/10 rounded-xl p-8 lg:p-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Pronto para <span className="gradient-text">transformar</span> sua clínica?
              </h2>
              
              <p className="text-gray-300 mb-6">
                Agende um diagnóstico gratuito e descubra como nossas soluções 
                podem impulsionar sua clínica ou consultório através de estratégias 
                personalizadas de marketing digital e automação.
              </p>
              
              <div className="mb-6">
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-growave-green shrink-0 mr-3 h-5 w-5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="text-md py-6 px-8 bg-growave-green text-black hover:bg-growave-green-light animate-pulse-soft"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Diagnóstico Estratégico
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-transparent border-none shadow-none">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Formulário de Contato</DialogTitle>
                  </DialogHeader>
                  <ContactForm onSuccess={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Wallker Furtado Specialist Presentation - Professional Photo */}
            <div className="flex items-center justify-center">
              <Card className="w-full bg-black/60 backdrop-blur border border-growave-green/20 rounded-lg overflow-hidden shadow-lg relative hover:shadow-growave-green/20 hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-growave-green/30 rounded-tr-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-growave-green/30 rounded-bl-lg"></div>
                
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    {/* Professional Profile Image */}
                    <div className="w-72 h-80 rounded-xl overflow-hidden shadow-xl border-2 border-growave-green/20 flex-shrink-0">
                      <AspectRatio ratio={3/4}>
                        <img 
                          src="/lovable-uploads/bb02065d-de0e-4395-9da2-e9848cc1e5db.png" 
                          alt="Wallker Furtado" 
                          className="object-contain w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                    
                    {/* Reduced Profile Info */}
                    <div className="flex flex-col text-center">
                      <h3 className="text-2xl font-bold gradient-text mb-1">Wallker Furtado</h3>
                      <p className="text-gray-300 text-sm mb-2">Especialista em Marketing e Automação para Clínicas</p>
                      
                      <ul className="space-y-1 mb-2 text-xs md:text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-growave-green shrink-0">•</span>
                          <span>Há 4 anos ajudando clínicas e consultórios a crescerem de forma estratégica</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-growave-green shrink-0">•</span>
                          <span>Com automações que aumentam os agendamentos e otimizam o atendimento</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-growave-green shrink-0">•</span>
                          <span>Campanhas focadas em atrair pacientes com previsibilidade e autoridade</span>
                        </li>
                      </ul>
                      
                      <div className="mt-1 border-l-2 border-growave-green pl-2 py-1 italic text-gray-300 text-xs">
                        "Meu objetivo é transformar sua clínica em uma máquina de agendamentos usando inteligência, posicionamento e automação"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
