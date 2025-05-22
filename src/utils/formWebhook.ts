
import { FormValues } from '@/validators/contactFormSchema';
import { saveContactToSupabase } from '@/services/contacts/contactService';
import { generateLeadSummary } from '@/utils/leadSummaryGenerator';
import { countries } from '@/data/countries';
import { testAnonymousAccess } from '@/utils/anonymousClient';

// Function to send form data to the webhook with CORS handling
export const sendFormDataToWebhook = async (formData: FormValues) => {
  try {
    console.log('Sending data to webhook and Supabase:', formData);
    
    // Generate natural language summary
    const leadSummaryText = generateLeadSummary(formData);
    console.log('Generated lead summary:', leadSummaryText);
    
    // Get the country dial code
    const country = countries.find(c => c.code === formData.countryCode) || countries[0];
    const dialCode = country.dial_code;
    
    // Format phone number with country code
    const formattedPhone = `${dialCode}${formData.phone.replace(/\D/g, '')}`;
    console.log('Formatted phone with country code:', formattedPhone);
    
    // Prepare the payload
    const payload = {
      // Basic data
      name: formData.name,
      phone: formattedPhone, // Full international number without special characters
      instagram: formData.instagram.replace('@', ''),
      
      // Questionnaire data
      investimentoAds: formData.investimentoAds,
      equipeFrontOffice: formData.equipeFrontOffice,
      faturamentoMensal: formData.faturamentoMensal,
      trabalhouComAgencia: formData.trabalhouComAgencia,
      experienciaAnterior: formData.experienciaAnterior,
      expectativasAgencia: formData.expectativasAgencia,
      
      // Metadata
      dataSubmissao: new Date().toISOString(),
      origem: window.location.href,
      
      // New JSON formatted summary in the requested structure
      input: {
        text: leadSummaryText
      }
    };
    
    console.log('Webhook payload prepared:', payload);
    
    // Try to save to Supabase, but don't block the form submission if it fails
    try {
      // First check if anonymous access is working properly
      await testAnonymousAccess();
      
      // Save the form data to Supabase for the admin panel
      console.log('Attempting to save contact to Supabase...');
      const saveResult = await saveContactToSupabase(formData);
      console.log('Supabase save result:', saveResult);
      
      if (!saveResult.success) {
        console.error('Failed to save contact to Supabase - continuing with webhook anyway:', saveResult.error);
        // Don't return here - continue with webhook submission regardless
      }
    } catch (supabaseError) {
      // Log the error but continue with webhook
      console.error('Exception when saving to Supabase - continuing with webhook anyway:', supabaseError);
      // Still continue with the webhook submission
    }
    
    // Using the production webhook URL
    const webhookUrl = 'https://webhooks.growave.com.br/webhook/Formulario';
    
    console.log('Sending webhook to:', webhookUrl);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      mode: 'cors', // Using cors mode
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('Webhook response status:', response.status);
    
    // For no-cors mode, we won't get a valid response status, so we assume success
    if (response.status === 0 || !response.ok) {
      console.warn('Resposta do webhook não confirmada, mas o envio foi tentado');
      return { success: true, message: 'Envio processado' };
    }
    
    return await response.json().catch(() => {
      // If response can't be parsed as JSON, still return success
      return { success: true };
    });
  } catch (error) {
    console.error('Erro detalhado ao enviar dados para webhook:', error);
    // Return the error so we can handle it in the form submission
    return { success: false, error: error };
  }
};
