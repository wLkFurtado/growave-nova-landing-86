
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  onReset: () => void;
  isMobile: boolean;
}

const ActionButton = ({ onReset, isMobile }: ActionButtonProps) => {
  if (isMobile) {
    return (
      <div className="mt-10 mb-20 p-4 fixed bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="w-full max-w-md mx-auto">
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
    <div className="mt-10 mb-6 max-w-sm mx-auto">
      <Button 
        onClick={onReset} 
        className="w-full bg-growave-green text-black hover:bg-growave-green-light"
      >
        Finalizar
      </Button>
      <p className="text-xs text-gray-400 mt-2 text-center bg-black/90 p-2 rounded-md">
        Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
      </p>
    </div>
  );
};

export default ActionButton;
