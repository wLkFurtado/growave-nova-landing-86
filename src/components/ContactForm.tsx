
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
    const step1Fields = ['name', 'phone', 'instagram'];
    const step1Valid = await step1Fields.every(async (field) => {
      const isValid = await form.trigger(field as keyof FormValues);
      return isValid;
    });

    if (!step1Valid) {
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
      
      // Send data to the webhook - continue even if it fails
      const webhookResult = await sendFormDataToWebhook(updatedFormValues);
      console.log('Webhook submission result:', webhookResult);
      
      // Always continue with normal flow, even if webhook fails
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
