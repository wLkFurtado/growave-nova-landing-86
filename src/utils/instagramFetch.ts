
/**
 * Utility for fetching Instagram data 
 */

import { FormValues } from "@/validators/contactFormSchema";

export const fetchInstagramData = async (data: FormValues) => {
  // Clean up Instagram handle
  const instagramHandle = data.instagram.replace('@', '');
  
  console.log('Fetching Instagram data for:', instagramHandle);
  
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
  
  console.log('Instagram API response:', responseData);
  
  // Log profile image URLs for debugging
  if (responseData && Array.isArray(responseData) && responseData.length > 0) {
    console.log('Profile image URL (profilePicUrl):', responseData[0]?.profilePicUrl);
    console.log('Profile image URL HD (profilePicUrlHD):', responseData[0]?.profilePicUrlHD);
  } else if (responseData) {
    console.log('Profile image URL (profilePicUrl):', responseData.profilePicUrl);
    console.log('Profile image URL HD (profilePicUrlHD):', responseData.profilePicUrlHD);
  }
  
  if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
    throw new Error('Nenhum dado do Instagram encontrado');
  }
  
  return responseData;
};
