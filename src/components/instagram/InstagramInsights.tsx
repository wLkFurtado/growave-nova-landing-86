
import { Tabs } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInstagramProfile } from "@/hooks/use-instagram-profile";
import { useInstagramTabs } from "@/hooks/use-instagram-tabs";
import ProfileHeader from "./insights/ProfileHeader";
import TabNavigation from "./insights/TabNavigation";
import TabContent from "./insights/TabContent";
import OverviewSection from "./insights/OverviewSection";
import EngagementSection from "./insights/EngagementSection";
import RecommendationsSection from "./insights/RecommendationsSection";

interface InstagramInsightsProps {
  data: any;
  onReset: () => void;
}

const InstagramInsights = ({ data, onReset }: InstagramInsightsProps) => {
  const isMobile = useIsMobile();
  const { profileData, profileAnalysis, clearImages } = useInstagramProfile(data);
  const { activeTab, handleTabChange } = useInstagramTabs(isMobile);
  
  // Handler for reset with cleanup
  const handleReset = () => {
    // Limpar o armazenamento de imagens antes de fazer reset
    clearImages();
    // Chamar o reset original
    onReset();
  };

  if (!profileData || !profileAnalysis) {
    return null;
  }

  return (
    <div className={`text-white ${isMobile ? 'min-h-[600px] max-w-[375px] mx-auto box-border' : 'min-h-screen'}`}>
      <ProfileHeader username={profileData.username} />

      <Tabs 
        defaultValue="overview" 
        className="w-full" 
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabNavigation isMobile={isMobile} />
        
        <TabContent value="overview" isMobile={isMobile}>
          <OverviewSection 
            profileData={profileData}
            profileAnalysis={profileAnalysis}
            onReset={handleReset}
            isMobile={isMobile}
          />
        </TabContent>
        
        <TabContent value="engagement" isMobile={isMobile}>
          <EngagementSection
            profileAnalysis={profileAnalysis}
            onReset={handleReset}
            isMobile={isMobile}
          />
        </TabContent>
        
        <TabContent value="recommendations" isMobile={isMobile}>
          <RecommendationsSection
            profileAnalysis={profileAnalysis}
            onReset={handleReset}
            isMobile={isMobile}
          />
        </TabContent>
      </Tabs>
    </div>
  );
};

export default InstagramInsights;
