
import { useIsMobile } from "@/hooks/use-mobile";
import { useInstagramProfile } from "@/hooks/use-instagram-profile";
import ProfileHeader from "./insights/ProfileHeader";
import OverviewSection from "./insights/OverviewSection";

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
    <div className={`text-white flex flex-col items-center ${isMobile ? 'min-h-[600px] max-w-[375px] mx-auto box-border' : 'min-h-screen'}`}>
      <ProfileHeader username={profileData.username} />
      
      <div className="w-full flex justify-center items-center flex-grow py-4">
        <OverviewSection 
          profileData={profileData}
          profileAnalysis={profileAnalysis}
          onReset={handleReset}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default InstagramInsights;
