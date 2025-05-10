
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  onReset: () => void;
  isMobile: boolean;
}

const ActionButton = ({ onReset, isMobile }: ActionButtonProps) => {
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 border-t border-white/10 z-30">
        <div className="w-full">
          <Button 
            onClick={onReset}
            className="w-full bg-growave-green text-black hover:bg-growave-green-light"
          >
            Finalizar
          </Button>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <div className="w-full max-w-md mx-auto">
        <p className="text-sm text-gray-400 mb-3 text-center">
          Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
        </p>
        <Button 
          onClick={onReset} 
          className="w-full bg-growave-green text-black hover:bg-growave-green-light"
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default ActionButton;
