
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import InstagramInsights from './InstagramInsights';
import { formSchema, FormValues } from '@/validators/contactFormSchema';
import NameField from './form/NameField';
import PhoneField from './form/PhoneField';
import InstagramField from './form/InstagramField';
import LoadingIndicator from './form/LoadingIndicator';
import { fetchInstagramData } from '@/utils/instagramFetch';

interface ContactFormProps {
  onSuccess?: () => void;
}

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
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      console.log('Form data submitted:', data);
      const responseData = await fetchInstagramData(data);
      console.log('Instagram data received in ContactForm:', responseData);
      
      // Check if we have profile image URL
      if (Array.isArray(responseData) && responseData.length > 0) {
        console.log('Profile pic URL in ContactForm:', responseData[0].profilePicUrl);
        console.log('Profile pic URL HD in ContactForm:', responseData[0].profilePicUrlHD);
      }
      
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

  const resetForm = () => {
    setShowInsights(false);
    setInstagramData(null);
    form.reset();
    if (onSuccess) {
      onSuccess();
    }
  };

  if (showInsights && instagramData) {
    return <InstagramInsights data={instagramData} onReset={resetForm} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <NameField form={form} disabled={isSubmitting} />
        <PhoneField form={form} disabled={isSubmitting} />
        <InstagramField form={form} disabled={isSubmitting} />
        
        <LoadingIndicator isLoading={isLoading} />

        <Button
          type="submit"
          className="w-full bg-growave-green text-black hover:bg-growave-green-light"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Analisando..." : "Agendar Diagnóstico"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
