
/**
 * Serviço para armazenamento temporário de imagens no localStorage
 * com expiração de 2 minutos para evitar problemas de CORS
 */

// Tempo de expiração em milissegundos (2 minutos)
const EXPIRATION_TIME = 2 * 60 * 1000;

// Interface para os dados armazenados
interface StoredImage {
  url: string;
  base64Data: string;
  timestamp: number;
}

/**
 * Busca uma imagem da URL e converte para base64
 */
export const fetchImageAsBase64 = async (imageUrl: string): Promise<string | null> => {
  try {
    if (!imageUrl) return null;
    
    // Tentar com proxy CORS primeiro
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
    console.log('Tentando buscar imagem com proxy:', proxyUrl);
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Falha ao buscar imagem com proxy');
    
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
    return null;
  }
};

/**
 * Armazena uma imagem no localStorage
 */
export const storeImage = (url: string, base64Data: string): void => {
  try {
    if (!url || !base64Data) return;
    
    const imageKey = `instagram_image_${url}`;
    const imageData: StoredImage = {
      url,
      base64Data,
      timestamp: Date.now()
    };
    
    localStorage.setItem(imageKey, JSON.stringify(imageData));
    console.log('Imagem armazenada com sucesso:', url);
  } catch (error) {
    console.error('Erro ao armazenar imagem:', error);
  }
};

/**
 * Busca uma imagem do localStorage
 */
export const getStoredImage = (url: string): string | null => {
  try {
    if (!url) return null;
    
    const imageKey = `instagram_image_${url}`;
    const storedData = localStorage.getItem(imageKey);
    
    if (!storedData) return null;
    
    const imageData: StoredImage = JSON.parse(storedData);
    
    // Verificar se a imagem expirou
    if (Date.now() - imageData.timestamp > EXPIRATION_TIME) {
      console.log('Imagem expirada, removendo do armazenamento:', url);
      localStorage.removeItem(imageKey);
      return null;
    }
    
    console.log('Imagem recuperada do armazenamento local:', url);
    return imageData.base64Data;
  } catch (error) {
    console.error('Erro ao recuperar imagem armazenada:', error);
    return null;
  }
};

/**
 * Limpa imagens expiradas do localStorage
 */
export const cleanupExpiredImages = (): void => {
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    
    // Filtrar apenas as chaves relacionadas às imagens do Instagram
    const imageKeys = keys.filter(key => key.startsWith('instagram_image_'));
    
    for (const key of imageKeys) {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        const imageData: StoredImage = JSON.parse(storedData);
        
        if (now - imageData.timestamp > EXPIRATION_TIME) {
          localStorage.removeItem(key);
          console.log('Imagem expirada removida:', imageData.url);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao limpar imagens expiradas:', error);
  }
};

/**
 * Busca e armazena uma imagem se ainda não estiver no cache
 */
export const fetchAndStoreImage = async (imageUrl: string): Promise<string | null> => {
  // Primeiro verificar se já temos a imagem no armazenamento
  const storedImage = getStoredImage(imageUrl);
  if (storedImage) return storedImage;
  
  // Se não tiver, buscar e armazenar
  const base64Data = await fetchImageAsBase64(imageUrl);
  if (base64Data) {
    storeImage(imageUrl, base64Data);
    return base64Data;
  }
  
  return null;
};

/**
 * Remove todas as imagens armazenadas (para resetar)
 */
export const clearStoredImages = (): void => {
  try {
    const keys = Object.keys(localStorage);
    const imageKeys = keys.filter(key => key.startsWith('instagram_image_'));
    
    for (const key of imageKeys) {
      localStorage.removeItem(key);
    }
    
    console.log(`${imageKeys.length} imagens removidas do armazenamento local`);
  } catch (error) {
    console.error('Erro ao limpar imagens armazenadas:', error);
  }
};
