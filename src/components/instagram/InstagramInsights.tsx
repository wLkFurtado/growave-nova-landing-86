
import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { calculateEngagementMetrics, getAccountTypeLabel, getImprovementAreas, getPracticalSuggestions, getProfileStrengths } from "./utils";
import { fetchAndStoreImage, clearStoredImages } from "./utils/imageStorage";
import ProfileOverview from "./ProfileOverview";
import ContentTypeAnalysis from "./metrics/ContentTypeAnalysis";
import RecommendationsPanel from "./RecommendationsPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileHeader from "./insights/ProfileHeader";
import TabNavigation from "./insights/TabNavigation";
import TabContent from "./insights/TabContent";
import ActionButton from "./insights/ActionButton";
import MetricsDisplay from "./metrics/MetricsDisplay";

interface InstagramInsightsProps {
  data: any;
  onReset: () => void;
}

const InstagramInsights = ({ data, onReset }: InstagramInsightsProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Process data from webhook response (supports any Instagram profile)
  const profile = Array.isArray(data) ? data[0] : data; // Handle array or direct object
  
  useEffect(() => {
    // Garantir rolagem suave em dispositivos móveis
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.minHeight = '100%';
    
    console.log('Profile data received in InstagramInsights:', profile);
    if (profile) {
      console.log('Profile image URL (profilePicUrl):', profile.profilePicUrl);
      console.log('Profile image URL HD (profilePicUrlHD):', profile.profilePicUrlHD);
      
      // Pré-carregar a imagem de perfil para armazenamento local
      const profileImage = profile?.profilePicUrlHD || 
                           profile?.profilePicUrl || 
                           profile?.["{{ $node[\"Respond to Webhook\"].json[\"profilePicUrlHD\"] }}"] || 
                           "";
                           
      if (profileImage) {
        console.log('Pré-carregando imagem de perfil:', profileImage);
        fetchAndStoreImage(profileImage)
          .then(base64 => {
            if (base64) {
              console.log('Imagem de perfil pré-carregada com sucesso');
            }
          })
          .catch(error => {
            console.error('Erro ao pré-carregar imagem de perfil:', error);
          });
      }
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.minHeight = '';
    };
  }, [profile]);

  // Extract basic profile information
  const {
    username = "usuário",
    fullName = "Nome não disponível",
    followersCount = 0,
    followsCount = 0,
    biography = "Biografia não disponível",
    postsCount = 0,
    latestPosts = [],
    profilePicUrl = "", 
    profilePicUrlHD = "",
    businessCategoryName = "",
    isBusinessAccount = false,
    private: isPrivate = false,
  } = profile || {};

  // Use the most reliable profile image URL
  const profileImage = profile?.profilePicUrlHD || 
                      profile?.profilePicUrl || 
                      profile?.["{{ $node[\"Respond to Webhook\"].json[\"profilePicUrlHD\"] }}"] || 
                      profilePicUrlHD || 
                      profilePicUrl || 
                      "";
  
  console.log('Final profile image URL to be used:', profileImage);

  // Calculate engagement metrics based on recent posts
  const { 
    average_likes, 
    average_comments, 
    average_views = 0,
    engagement_rate, 
    postsByType, 
    performanceByType 
  } = calculateEngagementMetrics(latestPosts, followersCount);

  // Calculate engagement metrics for visualization
  const engagementPercentage = Math.min(engagement_rate, 100);
  const likesScore = Math.min((average_likes / (followersCount || 1)) * 100, 100);
  const commentsScore = Math.min((average_comments / (followersCount || 1)) * 100 * 10, 100);

  // Generate profile analysis
  const strengths = getProfileStrengths(biography, followersCount, engagement_rate, postsCount, isBusinessAccount, average_comments);
  const improvementAreas = getImprovementAreas(engagement_rate, followersCount, average_comments, postsCount, postsByType);
  const suggestions = getPracticalSuggestions();

  // Get account type label for display
  const accountTypeLabel = getAccountTypeLabel(isBusinessAccount, businessCategoryName, isPrivate);

  // Handler for reset with cleanup
  const handleReset = () => {
    // Limpar o armazenamento de imagens antes de fazer reset
    clearStoredImages();
    // Chamar o reset original
    onReset();
  };

  // Handler for tab change to ensure scroll to top when switching tabs on mobile
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (isMobile) {
      // Scroll to top of tab content when switching tabs on mobile
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6 text-white overflow-visible min-h-full pb-28 sm:pb-0">
      <ProfileHeader username={username} />

      <Tabs 
        defaultValue="overview" 
        className="w-full" 
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabNavigation isMobile={isMobile} />
        
        <TabContent value="overview" isMobile={isMobile}>
          <ProfileOverview
            username={username}
            fullName={fullName}
            followersCount={followersCount}
            followsCount={followsCount}
            postsCount={postsCount}
            biography={biography}
            profileImage={profileImage}
            accountType={accountTypeLabel}
            engagementRate={engagement_rate}
            averageLikes={average_likes}
            isMobile={isMobile}
          />
          <ActionButton onReset={handleReset} isMobile={isMobile} />
        </TabContent>
        
        <TabContent value="engagement" isMobile={isMobile}>
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
          <ActionButton onReset={handleReset} isMobile={isMobile} />
        </TabContent>
        
        <TabContent value="recommendations" isMobile={isMobile}>
          <RecommendationsPanel
            strengths={strengths}
            improvementAreas={improvementAreas}
            suggestions={suggestions}
            onReset={handleReset}
            isMobile={isMobile}
          />
          <ActionButton onReset={handleReset} isMobile={isMobile} />
        </TabContent>
      </Tabs>
    </div>
  );
};

export default InstagramInsights;
