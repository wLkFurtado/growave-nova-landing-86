
// Utility functions for calculating Instagram engagement metrics

export interface PostType {
  type?: string;
  likesCount?: number;
  commentsCount?: number;
  videoViewCount?: number;
}

export interface EngagementMetrics {
  average_likes: number;
  average_comments: number;
  average_views: number;
  engagement_rate: number;
  totalPosts: number;
  postsByType: Record<string, number>;
  performanceByType: Record<string, number>;
}

export const calculateEngagementMetrics = (
  latestPosts: PostType[] = [],
  followersCount: number = 0
): EngagementMetrics => {
  if (!latestPosts || latestPosts.length === 0) {
    return {
      average_likes: 0,
      average_comments: 0,
      average_views: 0,
      engagement_rate: 0,
      totalPosts: 0,
      postsByType: { Image: 0, Video: 0, Sidecar: 0 },
      performanceByType: { Image: 0, Video: 0, Sidecar: 0 },
    };
  }

  const posts = latestPosts.slice(0, Math.min(12, latestPosts.length));
  let totalLikes = 0;
  let totalComments = 0;
  let totalViews = 0;
  let postsWithLikes = 0;
  let videoCount = 0;
  
  // Track content types
  const postsByType = { Image: 0, Video: 0, Sidecar: 0 };
  const likesByType = { Image: 0, Video: 0, Sidecar: 0 };
  
  posts.forEach(post => {
    // Count post types
    if (post.type) {
      postsByType[post.type] = (postsByType[post.type] || 0) + 1;
    }
    
    if (post.likesCount) {
      totalLikes += post.likesCount;
      postsWithLikes++;
      
      // Track likes by content type
      if (post.type) {
        likesByType[post.type] = (likesByType[post.type] || 0) + post.likesCount;
      }
    }
    
    if (post.commentsCount) {
      totalComments += post.commentsCount;
    }
    
    // Track video views
    if (post.type === 'Video' && post.videoViewCount) {
      totalViews += post.videoViewCount;
      videoCount++;
    }
  });

  const avgLikes = postsWithLikes > 0 ? totalLikes / postsWithLikes : 0;
  const avgComments = posts.length > 0 ? totalComments / posts.length : 0;
  const avgViews = videoCount > 0 ? totalViews / videoCount : 0;
  
  // Calculate average performance by type
  const performanceByType = { Image: 0, Video: 0, Sidecar: 0 };
  
  Object.keys(postsByType).forEach(type => {
    if (postsByType[type] > 0) {
      performanceByType[type] = likesByType[type] / postsByType[type];
    }
  });
  
  // Engagement rate: (likes + comments) / followers * 100
  const engagementRate = followersCount > 0 
    ? ((avgLikes + avgComments) / followersCount) * 100
    : 0;

  return {
    average_likes: avgLikes,
    average_comments: avgComments,
    average_views: avgViews,
    engagement_rate: engagementRate,
    totalPosts: posts.length,
    postsByType,
    performanceByType,
  };
};

export const getProfileStrengths = (
  biography: string = "",
  followersCount: number = 0,
  engagement_rate: number = 0,
  postsCount: number = 0,
  isBusinessAccount: boolean = false,
  average_comments: number = 0
): string[] => {
  const strengths = [];
  
  if (biography && biography.length > 30) {
    strengths.push("Biografia completa e informativa");
  }
  
  if (followersCount > 500) {
    strengths.push("Base de seguidores estabelecida");
  }
  
  if (engagement_rate > 3) {
    strengths.push("Taxa de engajamento acima da média");
  }
  
  if (postsCount > 30) {
    strengths.push("Consistência na produção de conteúdo");
  }
  
  if (isBusinessAccount) {
    strengths.push("Conta profissional ativa");
  }
  
  if (average_comments > 5) {
    strengths.push("Boa interação através de comentários");
  }
  
  // Add default strength if none found
  if (strengths.length === 0) {
    strengths.push("Presença no Instagram estabelecida");
  }
  
  return strengths;
};

export const getImprovementAreas = (
  engagement_rate: number = 0,
  followersCount: number = 0,
  average_comments: number = 0,
  postsCount: number = 0,
  postsByType: Record<string, number> = { Image: 0, Video: 0, Sidecar: 0 }
): string[] => {
  const improvements = [];
  
  if (engagement_rate < 2) {
    improvements.push("Taxa de engajamento abaixo da média do mercado");
  }
  
  if (followersCount < 1000) {
    improvements.push("Oportunidade para expandir base de seguidores");
  }
  
  if (average_comments < 3) {
    improvements.push("Baixa interação através de comentários");
  }
  
  if (postsCount < 20) {
    improvements.push("Aumentar frequência de publicações");
  }
  
  if (postsByType.Video === 0 || (postsByType.Video / (postsByType.Image + postsByType.Video + postsByType.Sidecar)) < 0.2) {
    improvements.push("Pouca utilização de vídeos no feed");
  }
  
  // Add default improvement if none found
  if (improvements.length === 0) {
    improvements.push("Diversificar tipos de conteúdo");
  }
  
  return improvements;
};

export const getPracticalSuggestions = (): string[] => {
  return [
    "Estabeleça um calendário de conteúdo consistente",
    "Utilize hashtags estratégicas relevantes para seu nicho",
    "Interaja com contas similares para aumentar visibilidade",
    "Experimente diferentes formatos de conteúdo (Reels, Carrosséis)",
    "Responda comentários e mensagens para fortalecer relacionamento",
    "Analise métricas regularmente para identificar o que funciona melhor"
  ];
};

export const getAccountTypeLabel = (
  isBusinessAccount: boolean = false,
  businessCategoryName: string = '',
  isPrivate: boolean = false
): string => {
  if (isBusinessAccount) {
    return businessCategoryName 
      ? `Conta Profissional (${businessCategoryName.replace('None,', '')})`
      : "Conta Profissional";
  }
  return isPrivate ? "Conta Privada" : "Conta Pessoal";
};
