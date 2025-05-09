
/**
 * Utility for fetching Instagram data 
 */

export const fetchInstagramData = async (data: { 
  name: string; 
  phone: string; 
  instagram: string 
}) => {
  // Clean up Instagram handle
  const instagramHandle = data.instagram.replace('@', '');
  
  // Send data to webhook
  const response = await fetch('https://webhooks.growave.com.br/webhook/scraping-insta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      instagram: instagramHandle
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar dados');
  }

  // Parse response data
  const responseData = await response.json();
  
  if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
    throw new Error('Nenhum dado do Instagram encontrado');
  }
  
  return responseData;
};
