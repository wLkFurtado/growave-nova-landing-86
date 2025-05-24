
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';
import InstagramInsights from './instagram/InstagramInsights';
import { formSchema, FormValues } from '@/validators/contactFormSchema';
import { fetchInstagramData } from '@/utils/instagramFetch';
import { sendFormDataToWebhook } from '@/utils/formWebhook';
import InitialForm from './form/InitialForm';
import { getDefaultCountry } from '@/data/countries';

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instagramData, setInstagramData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const { toast } = useToast();

  const defaultCountry = getDefaultCountry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      countryCode: defaultCountry.code,
      phone: '',
      instagram: '',
      investimentoAds: undefined,
      equipeFrontOffice: undefined,
      faturamentoMensal: undefined,
      trabalhouComAgencia: undefined,
      experienciaAnterior: '',
      expectativasAgencia: '',
    },
  });

  const handleSubmitInitialForm = async () => {
    // Validate step 1 fields
    const step1Fields = ['name', 'email', 'phone', 'instagram'];
    let step1Valid = true;
    
    for (const field of step1Fields) {
      const isValid = await form.trigger(field as keyof FormValues);
      if (!isValid) {
        step1Valid = false;
      }
    }

    if (!step1Valid) {
      console.log('Form validation failed for step 1');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      const formData = form.getValues();
      console.log('Form data submitted:', formData);
      const responseData = await fetchInstagramData(formData);
      console.log('Instagram data received in ContactForm:', responseData);
      
      setInstagramData(responseData);
      setShowInsights(true);
      
      toast({
        title: "Dados enviados com sucesso!",
        description: "Analisando perfil do Instagram...",
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleQuestionnaireSubmit = async (updatedFormValues: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Questionário finalizado, dados completos:', updatedFormValues);
      
      // Basic validation to ensure we have the necessary data
      if (!updatedFormValues.investimentoAds || 
          !['nao_invisto', 'menos_1000', 'entre_1000_3000', 'entre_3000_5000', 'acima_5000'].includes(updatedFormValues.investimentoAds)) {
        throw new Error('Valor inválido para investimentoAds');
      }
      
      if (!updatedFormValues.equipeFrontOffice || 
          !['secretaria', 'equipe', 'atendo_sozinho', 'procurando'].includes(updatedFormValues.equipeFrontOffice)) {
        throw new Error('Valor inválido para equipeFrontOffice');
      }
      
      if (!updatedFormValues.faturamentoMensal || 
          !['ate_10mil', 'entre_10mil_30mil', 'entre_30mil_50mil', 'acima_50mil', 'nao_informar'].includes(updatedFormValues.faturamentoMensal)) {
        throw new Error('Valor inválido para faturamentoMensal');
      }
      
      if (updatedFormValues.trabalhouComAgencia === undefined) {
        throw new Error('Valor inválido para trabalhouComAgencia');
      }
      
      if (!updatedFormValues.expectativasAgencia) {
        throw new Error('Expectativas da agência é obrigatório');
      }
      
      // Send data to the webhook - will try to save to Supabase but continue even if it fails
      console.log('Sending form data to webhook which will attempt to save to Supabase...');
      const webhookResult = await sendFormDataToWebhook(updatedFormValues);
      console.log('Webhook submission result:', webhookResult);
      
      // Always consider it a success from the user perspective
      resetForm();
      toast({
        title: "Diagnóstico finalizado!",
        description: "Entraremos em contato em breve.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao finalizar diagnóstico:", error);
      toast({
        title: "Erro ao finalizar diagnóstico",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowInsights(false);
    setInstagramData(null);
    form.reset();
    if (onSuccess) {
      onSuccess();
    }
  };

  if (showInsights && instagramData) {
    return (
      <InstagramInsights 
        data={instagramData} 
        onReset={resetForm} 
        formValues={form.getValues()} 
        onSubmitQuestionnaire={handleQuestionnaireSubmit}
      />
    );
  }

  return (
    <InitialForm 
      form={form}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      onSubmit={handleSubmitInitialForm}
    />
  );
};

export default ContactForm;
