
/**
 * Utility for fetching Instagram data 
 */

import { FormValues } from "@/validators/contactFormSchema";

export const fetchInstagramData = async (data: FormValues) => {
  // Clean up Instagram handle
  const instagramHandle = data.instagram.replace('@', '');
  
  console.log('Fetching Instagram data for:', instagramHandle);
  console.log('Full form data:', data);
  
  // Send data to webhook
  const response = await fetch('https://webhooks.growave.com.br/webhook/scraping-insta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      instagram: instagramHandle,
      // Include second stage fields if they exist
      investimentoAds: data.investimentoAds || null,
      equipeFrontOffice: data.equipeFrontOffice || null,
      faturamentoMensal: data.faturamentoMensal || null,
      trabalhouComAgencia: data.trabalhouComAgencia || null,
      experienciaAnterior: data.experienciaAnterior || null,
      expectativasAgencia: data.expectativasAgencia || null,
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar dados');
  }

  // Parse response data
  const responseData = await response.json();
  
  console.log('Instagram API response:', responseData);
  
  // Extract profile data with normalized structure
  const profileData = normalizeProfileData(responseData);
  
  if (!profileData) {
    throw new Error('Nenhum dado do Instagram encontrado');
  }
  
  return profileData;
};

/**
 * Normalize profile data to handle different response formats
 */
const normalizeProfileData = (data: any) => {
  if (!data) return null;
  
  // Handle array format
  const profile = Array.isArray(data) ? data[0] : data;
  if (!profile) return null;
  
  // Extract profile image URL from various possible formats
  const profileImageUrl = extractProfileImageUrl(profile);
  console.log('Extracted profile image URL:', profileImageUrl);
  
  // Return normalized data with consistent profile image URL
  return {
    ...profile,
    // Ensure profilePicUrl and profilePicUrlHD are always set
    profilePicUrl: profileImageUrl,
    profilePicUrlHD: profileImageUrl,
  };
};

/**
 * Extract profile image URL from various possible formats
 */
const extractProfileImageUrl = (profile: any): string => {
  // Try all possible formats for the profile image URL
  const possibleKeys = [
    'profilePicUrlHD',
    'profilePicUrl',
    '{{ $node["Respond to Webhook"].json["profilePicUrlHD"] }}',
    'profile_pic_url_hd',
    'profile_pic_url'
  ];
  
  // Find first non-empty URL
  for (const key of possibleKeys) {
    if (profile[key] && typeof profile[key] === 'string') {
      console.log(`Found profile image URL in key: ${key}`, profile[key]);
      return profile[key];
    }
  }
  
  console.log('No profile image URL found in any expected format');
  return '';
};
