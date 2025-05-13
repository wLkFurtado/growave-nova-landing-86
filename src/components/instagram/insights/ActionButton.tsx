
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  onReset: () => void;
  isMobile: boolean;
  onStartQuestionnaire?: () => void;
}

const ActionButton = ({ onReset, isMobile, onStartQuestionnaire }: ActionButtonProps) => {
  const handleClick = () => {
    if (onStartQuestionnaire) {
      onStartQuestionnaire();
    } else {
      onReset();
    }
  };

  if (isMobile) {
    return (
      <div className="relative border-t border-white/10 p-2 mt-2 box-border">
        <div className="w-full max-w-[300px] mx-auto my-0">
          <Button 
            onClick={handleClick}
            className="w-full bg-growave-green text-black hover:bg-growave-green-light"
          >
            Próximo
          </Button>
          <p className="text-xs text-gray-400 mt-2 text-center px-1">
            Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-6 max-w-[300px] mx-auto">
      <Button 
        onClick={handleClick} 
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
