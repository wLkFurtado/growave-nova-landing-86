
// Utility functions for Instagram profile analysis

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
