
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-growave-green/10">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <div>
            <img 
              src="/lovable-uploads/dc7d5c5c-2c27-4986-9008-acd55a89fc67.png" 
              alt="Growave Logo" 
              className="h-8 mb-3"
            />
            <p className="text-gray-400 mb-4 text-sm">
              Transformando clínicas e consultórios através de estratégias digitais especializadas e tecnologia de ponta.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-growave-green">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-growave-green">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-growave-green">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-bold mb-3">Navegação</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-growave-green text-sm">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-growave-green text-sm">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#cases" className="text-gray-400 hover:text-growave-green text-sm">
                  Casos de Sucesso
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-growave-green text-sm">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-bold mb-3">Soluções</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green text-sm">
                  Marketing para Clínicas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green text-sm">
                  Automação de Agendamentos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green text-sm">
                  Landing Pages Médicas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green text-sm">
                  CRM para Consultórios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green text-sm">
                  Chatbots para Saúde
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-bold mb-3">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-growave-green mr-1.5" />
                <span className="text-gray-400 text-sm">São Paulo, SP - Brasil</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-growave-green mr-1.5" />
                <span className="text-gray-400 text-sm">(11) 9999-9999</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-growave-green mr-1.5" />
                <span className="text-gray-400 text-sm">contato@growave.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-growave-green/10 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Growave. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-growave-green text-xs">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-growave-green text-xs">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
