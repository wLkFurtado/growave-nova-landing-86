
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
