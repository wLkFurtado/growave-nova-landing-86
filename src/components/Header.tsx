
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from './ContactForm';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header className="py-1 lg:py-2">
      <div className="container mx-auto px-1 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between sm:px-2 lg:px-[30px] py-[15px] px-[36px] mx-[2px] my-">
          <div className="flex items-center">
            <img src="/lovable-uploads/dc7d5c5c-2c27-4986-9008-acd55a89fc67.png" alt="Growave Logo" className="h-[30px] sm:h-[40px] object-scale-down" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a href="#services" className="text-white hover:text-growave-green transition-colors">
              Serviços
            </a>
            <a href="#results" className="text-white hover:text-growave-green transition-colors">
              Resultados
            </a>
            <a href="#cases" className="text-white hover:text-growave-green transition-colors">
              Casos de Sucesso
            </a>
            <a href="#testimonials" className="text-white hover:text-growave-green transition-colors">
              Depoimentos
            </a>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="glow-button bg-transparent border border-growave-green text-growave-green hover:border-growave-green">
                  Diagnóstico Estratégico
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-transparent border-none shadow-none">
                <DialogHeader className="sr-only">
                  <DialogTitle>Formulário de Contato</DialogTitle>
                </DialogHeader>
                <ContactForm onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white font-normal text-4xl bg-transparent p-0">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <div className="md:hidden mt-1 backdrop-blur animate-fade-in border border-growave-green/10 rounded-lg p-2">
            <nav className="flex flex-col space-y-2">
              <a href="#services" className="text-white hover:text-growave-green transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Serviços
              </a>
              <a href="#results" className="text-white hover:text-growave-green transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Resultados
              </a>
              <a href="#cases" className="text-white hover:text-growave-green transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Casos de Sucesso
              </a>
              <a href="#testimonials" className="text-white hover:text-growave-green transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Depoimentos
              </a>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="glow-button bg-transparent border border-growave-green text-growave-green w-full hover:border-growave-green" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Diagnóstico Estratégico
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-transparent border-none shadow-none">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Formulário de Contato</DialogTitle>
                  </DialogHeader>
                  <ContactForm onSuccess={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;
