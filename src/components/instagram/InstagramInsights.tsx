
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateEngagementMetrics, getAccountTypeLabel, getImprovementAreas, getPracticalSuggestions, getProfileStrengths } from "./utils";
import { fetchAndStoreImage, clearStoredImages } from "./utils/imageStorage";
import ProfileOverview from "./ProfileOverview";
import EngagementMetrics from "./EngagementMetrics";
import RecommendationsPanel from "./RecommendationsPanel";
import { useIsMobile } from "@/hooks/use-mobile";

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
      window.scrollTo(0, 0);
    }
  };

  const tabContentStyle = isMobile ? {
    maxHeight: "calc(100vh - 200px)",
    overflowY: "auto" as const,
    paddingBottom: "60px"
  } : {};

  return (
    <div className="space-y-6 text-white">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-growave-green mb-2">Diagnóstico de Perfil Instagram</h3>
        <p className="text-gray-300">
          Relatório completo do perfil @{username}
        </p>
      </div>

      <Tabs 
        defaultValue="overview" 
        className="w-full" 
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className={`w-full grid grid-cols-3 mb-4 ${isMobile ? 'sticky top-0 z-10 bg-black' : ''}`}>
          <TabsTrigger value="overview">Resumo</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>
        
        <div className={isMobile ? 'overflow-visible pb-4' : ''}>
          <TabsContent value="overview" className="space-y-6" style={tabContentStyle}>
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
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6" style={tabContentStyle}>
            <EngagementMetrics
              engagementPercentage={engagementPercentage}
              engagementRate={engagement_rate}
              averageLikes={average_likes}
              averageComments={average_comments}
              likesScore={likesScore}
              commentsScore={commentsScore}
              postsByType={postsByType}
              performanceByType={performanceByType}
              isMobile={isMobile}
            />
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6" style={tabContentStyle}>
            <RecommendationsPanel
              strengths={strengths}
              improvementAreas={improvementAreas}
              suggestions={suggestions}
              onReset={handleReset}
              isMobile={isMobile}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default InstagramInsights;
