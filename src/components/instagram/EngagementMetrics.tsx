
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MetricsDisplay from "./metrics/MetricsDisplay";
import ContentTypeAnalysis from "./metrics/ContentTypeAnalysis";

interface EngagementMetricsProps {
  engagementPercentage: number;
  engagementRate: number;
  averageLikes: number;
  averageComments: number;
  likesScore: number;
  commentsScore: number;
  postsByType: Record<string, number>;
  performanceByType: Record<string, number>;
  isMobile?: boolean;
}

const EngagementMetrics = ({
  engagementPercentage,
  engagementRate,
  averageLikes,
  averageComments,
  likesScore,
  commentsScore,
  postsByType,
  performanceByType,
  isMobile = false
}: EngagementMetricsProps) => {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-lg">Análise de Engajamento</CardTitle>
        <CardDescription className="text-gray-400">
          Baseada nos últimos posts
        </CardDescription>
      </CardHeader>
      
      <ScrollArea className={`${isMobile ? 'h-[50vh]' : 'h-[40vh]'} px-1`}>
        <CardContent className="space-y-4 pb-16">
          <MetricsDisplay
            engagementPercentage={engagementPercentage}
            engagementRate={engagementRate}
            averageLikes={averageLikes}
            averageComments={averageComments}
            likesScore={likesScore}
            commentsScore={commentsScore}
          />
          
          <ContentTypeAnalysis
            postsByType={postsByType}
            performanceByType={performanceByType}
            isMobile={isMobile}
          />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default EngagementMetrics;
