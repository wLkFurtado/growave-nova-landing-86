
import MetricsDisplay from "../metrics/MetricsDisplay";
import ContentTypeAnalysis from "../metrics/ContentTypeAnalysis";
import { ProfileAnalysis } from "@/hooks/use-instagram-profile";
import ActionButton from "./ActionButton";

interface EngagementSectionProps {
  profileAnalysis: ProfileAnalysis;
  onReset: () => void;
  isMobile: boolean;
}

const EngagementSection = ({ profileAnalysis, onReset, isMobile }: EngagementSectionProps) => {
  const {
    engagementPercentage,
    engagementMetrics: { 
      engagement_rate,
      average_likes,
      average_comments,
      postsByType,
      performanceByType
    },
    likesScore,
    commentsScore
  } = profileAnalysis;

  return (
    <>
      <div className="bg-black/40 border-white/10 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Análise de Engajamento</h3>
        <p className="text-gray-400 text-sm mb-4">Baseada nos últimos posts</p>
        
        <MetricsDisplay
          engagementPercentage={engagementPercentage}
          engagementRate={engagement_rate}
          averageLikes={average_likes}
          averageComments={average_comments}
          likesScore={likesScore}
          commentsScore={commentsScore}
        />
        
        <ContentTypeAnalysis
          postsByType={postsByType}
          performanceByType={performanceByType}
          isMobile={isMobile}
        />
      </div>
      <ActionButton onReset={onReset} isMobile={isMobile} />
    </>
  );
};

export default EngagementSection;
