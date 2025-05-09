import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Instagram, Users, User, Heart, BarChart, TrendingUp, Star, ArrowUp, ChartBar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InstagramInsightsProps {
  data: any;
  onReset: () => void;
}

const InstagramInsights = ({ data, onReset }: InstagramInsightsProps) => {
  // Process data from webhook response (supports any Instagram profile)
  const profile = Array.isArray(data) ? data[0] : data; // Handle array or direct object
  
  console.log('Profile data received:', profile);

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
  const profileImage = profilePicUrlHD || profilePicUrl;
  
  console.log('Profile image URL:', profileImage);

  // Calculate engagement metrics based on recent posts
  const calculateEngagementMetrics = () => {
    if (!latestPosts || latestPosts.length === 0) {
      return { 
        average_likes: 0, 
        average_comments: 0, 
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

  const { 
    average_likes, 
    average_comments, 
    average_views = 0,
    engagement_rate, 
    postsByType, 
    performanceByType 
  } = calculateEngagementMetrics();

  // Calculate engagement metrics for visualization
  const engagementPercentage = Math.min(engagement_rate, 100);
  const likesScore = Math.min((average_likes / (followersCount || 1)) * 100, 100);
  const commentsScore = Math.min((average_comments / (followersCount || 1)) * 100 * 10, 100);

  // Prepare data for the content type chart
  const contentTypeData = Object.entries(performanceByType)
    .filter(([type, _]) => postsByType[type] > 0)
    .map(([type, avgLikes]) => ({
      name: type,
      engajamento: Math.round(avgLikes),
    }));

  // Identify profile strengths and improvement areas
  const getProfileStrengths = () => {
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
  
  const getImprovementAreas = () => {
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
  
  const getPracticalSuggestions = () => {
    return [
      "Estabeleça um calendário de conteúdo consistente",
      "Utilize hashtags estratégicas relevantes para seu nicho",
      "Interaja com contas similares para aumentar visibilidade",
      "Experimente diferentes formatos de conteúdo (Reels, Carrosséis)",
      "Responda comentários e mensagens para fortalecer relacionamento",
      "Analise métricas regularmente para identificar o que funciona melhor"
    ];
  };

  const strengths = getProfileStrengths();
  const improvementAreas = getImprovementAreas();
  const suggestions = getPracticalSuggestions();

  const getAccountTypeLabel = () => {
    if (isBusinessAccount) {
      return businessCategoryName 
        ? `Conta Profissional (${businessCategoryName.replace('None,', '')})`
        : "Conta Profissional";
    }
    return isPrivate ? "Conta Privada" : "Conta Pessoal";
  };

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
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-growave-green/30">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt={`@${username}`} />
                  ) : (
                    <AvatarFallback className="bg-growave-green/20 text-growave-green">
                      {username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-white">{fullName}</CardTitle>
                  <CardDescription className="text-gray-400">
                    @{username} • {getAccountTypeLabel()}
                  </CardDescription>
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
                  <ChartBar className="h-5 w-5 mx-auto mb-1 text-growave-green" />
                  <div className="text-lg font-bold">{postsCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Publicações</div>
                </div>
              </div>
              
              {biography && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Biografia</h4>
                  <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg whitespace-pre-wrap">
                    {biography}
                  </p>
                </div>
              )}
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-3">Resumo Geral do Perfil</h4>
                <div className="bg-white/5 p-3 rounded-lg">
                  <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
                    <li>Conta com {followersCount.toLocaleString()} seguidores e {postsCount.toLocaleString()} publicações</li>
                    <li>Tipo de conta: {getAccountTypeLabel()}</li>
                    <li>Taxa de engajamento média: {engagement_rate.toFixed(2)}%</li>
                    <li>Média de curtidas por post: {Math.round(average_likes).toLocaleString()}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6">
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Análise de Engajamento</CardTitle>
              <CardDescription className="text-gray-400">
                Baseada nos últimos {latestPosts?.length || 0} posts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Métricas de Engajamento</h4>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-growave-green" />
                      Taxa de Engajamento
                    </span>
                    <span className="font-semibold">{(engagementPercentage).toFixed(2)}%</span>
                  </div>
                  <Progress value={engagementPercentage} className="h-2" />
                  <p className="text-xs text-gray-400">
                    {engagement_rate < 1 ? "Baixa" : engagement_rate < 3 ? "Mediana" : "Alta"} para contas do seu tamanho
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-growave-green" />
                      Média de Curtidas
                    </span>
                    <span className="font-semibold">{average_likes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <Progress value={likesScore} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-growave-green" />
                      Média de Comentários
                    </span>
                    <span className="font-semibold">{average_comments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <Progress value={commentsScore} className="h-2" />
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Tipos de Conteúdo e Desempenho</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Tipo</TableHead>
                        <TableHead className="text-gray-300">Quantidade</TableHead>
                        <TableHead className="text-right text-gray-300">Média de Curtidas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(postsByType).map(([type, count]) => 
                        count > 0 ? (
                          <TableRow key={type}>
                            <TableCell className="font-medium">{type}</TableCell>
                            <TableCell>{count}</TableCell>
                            <TableCell className="text-right">
                              {Math.round(performanceByType[type]).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ) : null
                      )}
                    </TableBody>
                  </Table>

                  {contentTypeData.length > 0 && (
                    <div className="h-64 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={contentTypeData}
                          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                          barSize={40}
                        >
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#18181B',
                              borderColor: '#3F3F46',
                              color: '#E4E4E7'
                            }}
                          />
                          <Bar 
                            dataKey="engajamento" 
                            name="Média de Curtidas"
                            fill="#4ade80" 
                            radius={[4, 4, 0, 0]}
                          />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Diagnóstico e Recomendações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-growave-green" />
                  Pontos Fortes do Perfil
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm pl-1">
                  {strengths.map((strength, i) => (
                    <li key={i} className="text-gray-300">{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <ArrowUp className="h-4 w-4 text-growave-green" />
                  Oportunidades de Melhoria
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm pl-1">
                  {improvementAreas.map((area, i) => (
                    <li key={i} className="text-gray-300">{area}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-growave-green" />
                  Sugestões Práticas para Crescimento
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm pl-1">
                  {suggestions.map((suggestion, i) => (
                    <li key={i} className="text-gray-300">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <p className="text-sm text-gray-400 mb-3">
                  Este diagnóstico é baseado em dados públicos do seu perfil. Para uma análise mais profunda e personalizada, nossos especialistas entrarão em contato.
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstagramInsights;
