
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  onReset: () => void;
  isMobile: boolean;
}

const ActionButton = ({ onReset, isMobile }: ActionButtonProps) => {
  if (isMobile) {
    return (
      <div className="mt-12 mb-20 p-4 bg-black/80 border border-white/10 rounded-lg">
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
