
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  onReset: () => void;
  isMobile: boolean;
}

const ActionButton = ({ onReset, isMobile }: ActionButtonProps) => {
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm border-t border-white/10 p-4 box-border">
        <div className="w-full max-w-[300px] mx-auto my-0">
          <Button 
            onClick={onReset}
            className="w-full bg-growave-green text-black hover:bg-growave-green-light mt-6 mb-4"
          >
            Próximo
          </Button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-6 max-w-[300px] mx-auto">
      <Button 
        onClick={onReset} 
        className="w-full bg-growave-green text-black hover:bg-growave-green-light"
      >
        Próximo
      </Button>
      <p className="text-xs text-gray-400 mt-3 text-center bg-black/90 p-2 rounded-md">
        Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
      </p>
    </div>
  );
};

export default ActionButton;
