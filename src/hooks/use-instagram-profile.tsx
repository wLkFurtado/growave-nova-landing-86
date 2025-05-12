
import { useEffect } from "react";
import { fetchAndStoreImage, clearStoredImages } from "@/components/instagram/utils/imageStorage";
import { calculateEngagementMetrics, getAccountTypeLabel, getImprovementAreas, getPracticalSuggestions, getProfileStrengths } from "@/components/instagram/utils";

export interface InstagramProfileData {
  username: string;
  fullName: string;
  followersCount: number;
  followsCount: number;
  biography: string;
  postsCount: number;
  latestPosts: any[];
  profilePicUrl?: string;
  profilePicUrlHD?: string;
  businessCategoryName?: string;
  isBusinessAccount?: boolean;
  private?: boolean;
}

export interface ProfileAnalysis {
  profileImage: string;
  accountTypeLabel: string;
  engagementMetrics: {
    average_likes: number;
    average_comments: number;
    average_views: number;
    engagement_rate: number;
    postsByType: Record<string, number>;
    performanceByType: Record<string, number>;
  };
  engagementPercentage: number;
  likesScore: number;
  commentsScore: number;
  strengths: string[];
  improvementAreas: string[];
  suggestions: string[];
}

export const useInstagramProfile = (data: any) => {
  // Process data from webhook response (supports any Instagram profile)
  const profile = Array.isArray(data) ? data[0] : data; // Handle array or direct object
  
  useEffect(() => {
    // Garantir rolagem suave em dispositivos móveis
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.minHeight = '100%';
    document.documentElement.style.minHeight = '100%';
    
    console.log('Profile data received in useInstagramProfile:', profile);
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
      document.documentElement.style.minHeight = '';
    };
  }, [profile]);

  if (!profile) {
    return {
      profileData: null,
      profileAnalysis: null,
      clearImages: clearStoredImages
    };
  }

  // Extract basic profile information
  const profileData: InstagramProfileData = {
    username: profile.username || "usuário",
    fullName: profile.fullName || "Nome não disponível",
    followersCount: profile.followersCount || 0,
    followsCount: profile.followsCount || 0,
    biography: profile.biography || "Biografia não disponível",
    postsCount: profile.postsCount || 0,
    latestPosts: profile.latestPosts || [],
    profilePicUrl: profile.profilePicUrl || "",
    profilePicUrlHD: profile.profilePicUrlHD || "",
    businessCategoryName: profile.businessCategoryName || "",
    isBusinessAccount: profile.isBusinessAccount || false,
    private: profile.private || false,
  };

  // Use the most reliable profile image URL
  const profileImage = profile?.profilePicUrlHD || 
                      profile?.profilePicUrl || 
                      profile?.["{{ $node[\"Respond to Webhook\"].json[\"profilePicUrlHD\"] }}"] || 
                      profileData.profilePicUrlHD || 
                      profileData.profilePicUrl || 
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
  } = calculateEngagementMetrics(profileData.latestPosts, profileData.followersCount);

  // Calculate engagement metrics for visualization
  const engagementPercentage = Math.min(engagement_rate, 100);
  const likesScore = Math.min((average_likes / (profileData.followersCount || 1)) * 100, 100);
  const commentsScore = Math.min((average_comments / (profileData.followersCount || 1)) * 100 * 10, 100);

  // Generate profile analysis
  const strengths = getProfileStrengths(profileData.biography, profileData.followersCount, engagement_rate, profileData.postsCount, profileData.isBusinessAccount, average_comments);
  const improvementAreas = getImprovementAreas(engagement_rate, profileData.followersCount, average_comments, profileData.postsCount, postsByType);
  const suggestions = getPracticalSuggestions();

  // Get account type label for display
  const accountTypeLabel = getAccountTypeLabel(profileData.isBusinessAccount, profileData.businessCategoryName, profileData.private);

  const profileAnalysis: ProfileAnalysis = {
    profileImage,
    accountTypeLabel,
    engagementMetrics: {
      average_likes,
      average_comments,
      average_views,
      engagement_rate,
      postsByType,
      performanceByType
    },
    engagementPercentage,
    likesScore,
    commentsScore,
    strengths,
    improvementAreas,
    suggestions
  };

  return {
    profileData,
    profileAnalysis,
    clearImages: clearStoredImages
  };
};
