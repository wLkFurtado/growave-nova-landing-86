import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-growave-green/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <img 
              src="/lovable-uploads/dc7d5c5c-2c27-4986-9008-acd55a89fc67.png" 
              alt="Growave Logo" 
              className="h-10 mb-4"
            />
            <p className="text-gray-400 mb-6">
              Transformando clínicas e consultórios através de estratégias digitais especializadas e tecnologia de ponta.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-growave-green">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-growave-green">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-growave-green">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green">
                  Início
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-growave-green">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-growave-green">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#cases" className="text-gray-400 hover:text-growave-green">
                  Casos de Sucesso
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-growave-green">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Soluções</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green">
                  Marketing para Clínicas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green">
                  Automação de Agendamentos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green">
                  Landing Pages Médicas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green">
                  CRM para Consultórios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-growave-green">
                  Chatbots para Saúde
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-growave-green mr-2" />
                <span className="text-gray-400">São Paulo, SP - Brasil</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-growave-green mr-2" />
                <span className="text-gray-400">(11) 9999-9999</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-growave-green mr-2" />
                <span className="text-gray-400">contato@growave.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-growave-green/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Growave. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-growave-green text-sm">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-growave-green text-sm">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
