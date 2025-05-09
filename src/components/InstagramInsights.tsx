
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Instagram, Users, User, Heart, BarChart, TrendingUp } from "lucide-react";

interface InstagramInsightsProps {
  data: any;
  onReset: () => void;
}

const InstagramInsights = ({ data, onReset }: InstagramInsightsProps) => {
  // Process data from webhook response (supports any Instagram profile)
  const profile = Array.isArray(data) ? data[0] : data; // Handle array or direct object

  // Extract basic profile information
  const {
    username = "usuário",
    fullName = "Nome não disponível",
    followersCount = 0,
    followsCount = 0,
    biography = "Biografia não disponível",
    postsCount = 0,
    latestPosts = [],
  } = profile || {};

  // Calculate engagement metrics based on recent posts
  const calculateEngagementMetrics = () => {
    if (!latestPosts || latestPosts.length === 0) {
      return { average_likes: 0, average_comments: 0, engagement_rate: 0 };
    }

    const posts = latestPosts.slice(0, Math.min(12, latestPosts.length));
    let totalLikes = 0;
    let totalComments = 0;
    let postsWithLikes = 0;

    posts.forEach(post => {
      if (post.likesCount) {
        totalLikes += post.likesCount;
        postsWithLikes++;
      }
      if (post.commentsCount) {
        totalComments += post.commentsCount;
      }
    });

    const avgLikes = postsWithLikes > 0 ? totalLikes / postsWithLikes : 0;
    const avgComments = posts.length > 0 ? totalComments / posts.length : 0;
    
    // Engagement rate: (likes + comments) / followers * 100
    const engagementRate = followersCount > 0 
      ? (avgLikes + avgComments) / followersCount 
      : 0;

    return {
      average_likes: avgLikes,
      average_comments: avgComments,
      engagement_rate: engagementRate
    };
  };

  const { average_likes, average_comments, engagement_rate } = calculateEngagementMetrics();

  // Calculate engagement metrics for visualization
  const engagementPercentage = Math.min(engagement_rate * 100, 100);
  const likesScore = Math.min((average_likes / (followersCount || 1)) * 100, 100);
  const commentsScore = Math.min((average_comments / (followersCount || 1)) * 100 * 10, 100); // Amplified for visibility

  return (
    <div className="space-y-6 text-white">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-growave-green mb-2">Análise de Perfil Instagram</h3>
        <p className="text-gray-300">
          Aqui está uma análise inicial do perfil @{username}
        </p>
      </div>

      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-growave-green/20 p-3 rounded-full">
              <Instagram className="h-6 w-6 text-growave-green" />
            </div>
            <div>
              <CardTitle className="text-white">{fullName}</CardTitle>
              <CardDescription className="text-gray-400">@{username}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/5 p-3 rounded-lg">
              <Users className="h-5 w-5 mx-auto mb-1 text-growave-green" />
              <div className="text-lg font-bold">{followersCount.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Seguidores</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <User className="h-5 w-5 mx-auto mb-1 text-growave-green" />
              <div className="text-lg font-bold">{followsCount.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Seguindo</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <BarChart className="h-5 w-5 mx-auto mb-1 text-growave-green" />
              <div className="text-lg font-bold">{postsCount.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Publicações</div>
            </div>
          </div>
          
          {biography && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-1">Biografia</h4>
              <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg">
                {biography}
              </p>
            </div>
          )}

          <div className="space-y-3 mt-6">
            <h4 className="text-sm font-medium">Métricas de Engajamento</h4>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-growave-green" />
                  Taxa de Engajamento
                </span>
                <span>{(engagementPercentage).toFixed(2)}%</span>
              </div>
              <Progress value={engagementPercentage} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-growave-green" />
                  Média de Likes
                </span>
                <span>{average_likes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <Progress value={likesScore} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-growave-green" />
                  Média de Comentários
                </span>
                <span>{average_comments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <Progress value={commentsScore} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-3">
            <p className="text-sm text-gray-400">
              Esta é uma análise prévia. Nossos especialistas entrarão em contato para fornecer um diagnóstico completo personalizado para seu perfil.
            </p>
            <Button 
              onClick={onReset} 
              className="w-full bg-growave-green text-black hover:bg-growave-green-light"
            >
              Finalizar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InstagramInsights;
