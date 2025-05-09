
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateEngagementMetrics, getAccountTypeLabel, getImprovementAreas, getPracticalSuggestions, getProfileStrengths } from "./EngagementUtils";
import ProfileOverview from "./ProfileOverview";
import EngagementMetrics from "./EngagementMetrics";
import RecommendationsPanel from "./RecommendationsPanel";

interface InstagramInsightsProps {
  data: any;
  onReset: () => void;
}

const InstagramInsights = ({ data, onReset }: InstagramInsightsProps) => {
  // Process data from webhook response (supports any Instagram profile)
  const profile = Array.isArray(data) ? data[0] : data; // Handle array or direct object
  
  useEffect(() => {
    console.log('Profile data received in InstagramInsights:', profile);
    if (profile) {
      console.log('Profile image URL (profilePicUrl):', profile.profilePicUrl);
      console.log('Profile image URL HD (profilePicUrlHD):', profile.profilePicUrlHD);
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

  // Use HD profile pic if available, otherwise use standard resolution
  // Use the value from n8n response format which might be using different key name
  const profileImage = profile?.profilePicUrlHD || profile?.["{{ $node[\"Respond to Webhook\"].json[\"profilePicUrlHD\"] }}"] || profilePicUrlHD || profilePicUrl || "";
  
  console.log('Using profile image URL:', profileImage);

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

  return (
    <div className="space-y-6 text-white">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-growave-green mb-2">Diagnóstico de Perfil Instagram</h3>
        <p className="text-gray-300">
          Relatório completo do perfil @{username}
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Resumo</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
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
          />
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6">
          <EngagementMetrics
            engagementPercentage={engagementPercentage}
            engagementRate={engagement_rate}
            averageLikes={average_likes}
            averageComments={average_comments}
            likesScore={likesScore}
            commentsScore={commentsScore}
            postsByType={postsByType}
            performanceByType={performanceByType}
          />
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <RecommendationsPanel
            strengths={strengths}
            improvementAreas={improvementAreas}
            suggestions={suggestions}
            onReset={onReset}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstagramInsights;
