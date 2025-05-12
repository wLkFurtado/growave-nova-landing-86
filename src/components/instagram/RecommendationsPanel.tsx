
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StrengthsSection from "./recommendations/StrengthsSection";
import ImprovementsSection from "./recommendations/ImprovementsSection";
import SuggestionsSection from "./recommendations/SuggestionsSection";

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
        <StrengthsSection strengths={strengths} />
        <ImprovementsSection improvementAreas={improvementAreas} />
        <SuggestionsSection suggestions={suggestions} />
      </CardContent>
    </Card>
  );
};

export default RecommendationsPanel;
