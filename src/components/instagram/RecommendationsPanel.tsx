
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowUp, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  onReset,
  isMobile = false
}: RecommendationsPanelProps) => {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-lg">Diagnóstico e Recomendações</CardTitle>
      </CardHeader>
      {isMobile ? (
        <ScrollArea className="h-[60vh] px-1">
          <CardContent className="space-y-5 pb-16">
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
        </ScrollArea>
      ) : (
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
      )}
      <CardFooter className={isMobile ? 'fixed bottom-0 left-0 right-0 bg-black p-4 border-t border-white/10 z-10' : ''}>
        <div className="w-full">
          {!isMobile && (
            <p className="text-sm text-gray-400 mb-3">
              Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
            </p>
          )}
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
