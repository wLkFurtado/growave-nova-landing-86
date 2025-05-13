
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import InstagramInsights from './instagram/InstagramInsights';
import { formSchema, FormValues } from '@/validators/contactFormSchema';
import NameField from './form/NameField';
import PhoneField from './form/PhoneField';
import InstagramField from './form/InstagramField';
import LoadingIndicator from './form/LoadingIndicator';
import { fetchInstagramData } from '@/utils/instagramFetch';
import FormStepIndicator from './form/FormStepIndicator';

interface ContactFormProps {
  onSuccess?: () => void;
}

// New function to send form data to the webhook
const sendFormDataToWebhook = async (formData: FormValues) => {
  try {
    const response = await fetch('https://webhooks.growave.com.br/webhook/Formulario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    });
    
    if (!response.ok) {
      throw new Error('Falha ao enviar dados para o webhook');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar dados para webhook:', error);
    throw error;
  }
};

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instagramData, setInstagramData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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
      
      // Send data to the webhook
      await sendFormDataToWebhook(updatedFormValues);
      
      // Continue with normal flow
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
    <Form {...form}>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmitInitialForm(); }} className="space-y-4">
        <FormStepIndicator currentStep={1} totalSteps={2} />
        
        <div className="text-sm text-gray-400 mb-4">
          Insira seus dados para iniciar o diagnóstico gratuito:
        </div>
        
        <NameField form={form} disabled={isSubmitting} />
        <PhoneField form={form} disabled={isSubmitting} />
        <InstagramField form={form} disabled={isSubmitting} />

        <LoadingIndicator isLoading={isLoading} />

        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full bg-growave-green text-black hover:bg-growave-green-light"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Analisando..." : "Iniciar Diagnóstico"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
