
import { Progress } from "@/components/ui/progress";
import { Heart, TrendingUp, BarChart } from "lucide-react";

interface MetricsDisplayProps {
  engagementPercentage: number;
  engagementRate: number;
  averageLikes: number;
  averageComments: number;
  likesScore: number;
  commentsScore: number;
}

const MetricsDisplay = ({
  engagementPercentage,
  engagementRate,
  averageLikes,
  averageComments,
  likesScore,
  commentsScore
}: MetricsDisplayProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Métricas de Engajamento</h4>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-growave-green" />
            Taxa de Engajamento
          </span>
          <span className="font-semibold">{engagementPercentage.toFixed(2)}%</span>
        </div>
        <Progress value={engagementPercentage} className="h-2" />
        <p className="text-xs text-gray-400">
          {engagementRate < 1 ? "Baixa" : engagementRate < 3 ? "Mediana" : "Alta"} para contas do seu tamanho
        </p>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-growave-green" />
            Média de Curtidas
          </span>
          <span className="font-semibold">{averageLikes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
        <Progress value={likesScore} className="h-2" />
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-growave-green" />
            Média de Comentários
          </span>
          <span className="font-semibold">{averageComments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
        <Progress value={commentsScore} className="h-2" />
      </div>
    </div>
  );
};

export default MetricsDisplay;
