
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ArrowUp, TrendingUp } from "lucide-react";

interface RecommendationsPanelProps {
  strengths: string[];
  improvementAreas: string[];
  suggestions: string[];
  onReset: () => void;
  isMobile?: boolean;
}

const RecommendationsPanel = ({
  strengths,
  improvementAreas,
  suggestions,
  isMobile = false
}: RecommendationsPanelProps) => {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-lg">Diagnóstico e Recomendações</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div>
          <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-growave-green" />
            Pontos Fortes do Perfil
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm pl-1">
            {strengths.map((strength, i) => (
              <li key={i} className="text-gray-300">{strength}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
            <ArrowUp className="h-4 w-4 text-growave-green" />
            Oportunidades de Melhoria
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm pl-1">
            {improvementAreas.map((area, i) => (
              <li key={i} className="text-gray-300">{area}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-growave-green" />
            Sugestões Práticas para Crescimento
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm pl-1">
            {suggestions.map((suggestion, i) => (
              <li key={i} className="text-gray-300">{suggestion}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsPanel;
