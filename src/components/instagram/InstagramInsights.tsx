
import { useIsMobile } from "@/hooks/use-mobile";
import { useInstagramProfile } from "@/hooks/use-instagram-profile";
import ProfileHeader from "./insights/ProfileHeader";
import OverviewSection from "./insights/OverviewSection";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InstagramInsightsProps {
  data: any;
  onReset: () => void;
}

const InstagramInsights = ({ data, onReset }: InstagramInsightsProps) => {
  const isMobile = useIsMobile();
  const { profileData, profileAnalysis, clearImages } = useInstagramProfile(data);
  
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
    <div className="text-white flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md mx-auto px-4 md:px-6 pb-20">
        <ProfileHeader username={profileData.username} />
        
        {isMobile ? (
          <div className="relative w-full">
            <div className="pb-24">
              <OverviewSection 
                profileData={profileData}
                profileAnalysis={profileAnalysis}
                onReset={handleReset}
                isMobile={isMobile}
              />
            </div>
          </div>
        ) : (
          <OverviewSection 
            profileData={profileData}
            profileAnalysis={profileAnalysis}
            onReset={handleReset}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default InstagramInsights;
