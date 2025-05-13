
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { useState } from 'react';

interface ActionButtonProps {
  onReset: () => void;
  isMobile: boolean;
  onStartQuestionnaire?: () => void;
}

const ActionButton = ({ onReset, isMobile, onStartQuestionnaire }: ActionButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleClick = () => {
    if (onStartQuestionnaire) {
      onStartQuestionnaire();
    } else {
      // Open dialog instead of resetting
      setIsDialogOpen(true);
    }
  };

  if (isMobile) {
    return (
      <div className="relative border-t border-white/10 p-2 mt-2 box-border">
        <div className="w-full max-w-[300px] mx-auto my-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleClick}
                className="w-full bg-growave-green text-black hover:bg-growave-green-light"
              >
                Diagnóstico Estratégico
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-growave-black border-growave-green/20">
              <DialogHeader>
                <DialogTitle className="text-xl text-white text-center">Diagnóstico Estratégico</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <ContactForm onSuccess={() => setIsDialogOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-xs text-gray-400 mt-2 text-center px-1">
            Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-6 max-w-[300px] mx-auto">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            onClick={handleClick} 
            className="w-full bg-growave-green text-black hover:bg-growave-green-light"
          >
            Diagnóstico Estratégico
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-growave-black border-growave-green/20">
          <DialogHeader>
            <DialogTitle className="text-xl text-white text-center">Diagnóstico Estratégico</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ContactForm onSuccess={() => setIsDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
      <p className="text-xs text-gray-400 mt-3 text-center bg-black/90 p-2 rounded-md">
        Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
      </p>
    </div>
  );
};

export default ActionButton;
