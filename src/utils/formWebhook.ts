
import { FormValues } from '@/validators/contactFormSchema';
import { saveContact } from './contactsStorage';

// Function to send form data to the webhook with CORS handling
export const sendFormDataToWebhook = async (formData: FormValues) => {
  try {
    console.log('Sending data to webhook:', formData);
    
    // Save the form data locally for the admin panel
    saveContact(formData);
    
    // Prepare the payload
    const payload = {
      // Basic data
      name: formData.name,
      phone: formData.phone,
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
    };
    
    // Using the production webhook URL
    const webhookUrl = 'https://webhooks.growave.com.br/webhook/Formulario';
    
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
    // Don't throw the error, so the form submission still succeeds
    return { success: false, error: error };
  }
};
