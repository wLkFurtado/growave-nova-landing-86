
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowUp, TrendingUp } from "lucide-react";

interface RecommendationsPanelProps {
  strengths: string[];
  improvementAreas: string[];
  suggestions: string[];
  onReset: () => void;
}

const RecommendationsPanel = ({
  strengths,
  improvementAreas,
  suggestions,
  onReset
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
      <CardFooter>
        <div className="w-full">
          <p className="text-sm text-gray-400 mb-3">
            Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
          </p>
          <Button 
            onClick={onReset} 
            className="w-full bg-growave-green text-black hover:bg-growave-green-light"
          >
            Finalizar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecommendationsPanel;
