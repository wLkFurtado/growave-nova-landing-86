
import RecommendationsPanel from "../RecommendationsPanel";
import ActionButton from "./ActionButton";
import { ProfileAnalysis } from "@/hooks/use-instagram-profile";

interface RecommendationsSectionProps {
  profileAnalysis: ProfileAnalysis;
  onReset: () => void;
  isMobile: boolean;
}

const RecommendationsSection = ({ profileAnalysis, onReset, isMobile }: RecommendationsSectionProps) => {
  const { strengths, improvementAreas, suggestions } = profileAnalysis;
  
  return (
    <>
      <RecommendationsPanel
        strengths={strengths}
        improvementAreas={improvementAreas}
        suggestions={suggestions}
        onReset={onReset}
        isMobile={isMobile}
      />
      <ActionButton onReset={onReset} isMobile={isMobile} />
    </>
  );
};

export default RecommendationsSection;
