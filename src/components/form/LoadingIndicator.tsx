
import { Progress } from '@/components/ui/progress';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps) => {
  if (!isLoading) return null;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Analisando perfil...</span>
        <span className="text-sm text-gray-300">Por favor aguarde</span>
      </div>
      <Progress value={65} className="h-2" />
    </div>
  );
};

export default LoadingIndicator;
