
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
import InvestimentoAdsField from './form/InvestimentoAdsField';
import EquipeFrontOfficeField from './form/EquipeFrontOfficeField';
import FaturamentoMensalField from './form/FaturamentoMensalField';
import AgenciaAnteriorField from './form/AgenciaAnteriorField';
import ExpectativasField from './form/ExpectativasField';
import FormStepIndicator from './form/FormStepIndicator';

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [formStep, setFormStep] = useState<1 | 2>(1);
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

  const handleNextStep = () => {
    // Validate step 1 fields
    const step1Fields = ['name', 'phone', 'instagram'];
    const step1Valid = step1Fields.every((field) => {
      const isValid = form.getFieldState(field as keyof FormValues).invalid === false;
      if (!isValid) {
        form.trigger(field as keyof FormValues);
      }
      return isValid;
    });

    if (!step1Valid) {
      return;
    }

    setFormStep(2);
    window.scrollTo(0, 0); // Scroll to top when moving to next step
  };

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
    setFormStep(1);
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
      <form onSubmit={form.handleSubmit(formStep === 1 ? handleNextStep : onSubmit)} className="space-y-4">
        <FormStepIndicator currentStep={formStep} totalSteps={2} />
        
        {formStep === 1 ? (
          // Step 1 fields
          <>
            <NameField form={form} disabled={isSubmitting} />
            <PhoneField form={form} disabled={isSubmitting} />
            <InstagramField form={form} disabled={isSubmitting} />
          </>
        ) : (
          // Step 2 fields
          <>
            <div className="text-sm text-gray-400 mb-4">
              Finalize o diagnóstico com estas informações adicionais:
            </div>
            <div className="space-y-6">
              <InvestimentoAdsField form={form} disabled={isSubmitting} />
              <EquipeFrontOfficeField form={form} disabled={isSubmitting} />
              <FaturamentoMensalField form={form} disabled={isSubmitting} />
              <AgenciaAnteriorField form={form} disabled={isSubmitting} />
              <ExpectativasField form={form} disabled={isSubmitting} />
            </div>
          </>
        )}

        <LoadingIndicator isLoading={isLoading} />

        <div className="flex justify-center mt-6">
          {formStep === 1 ? (
            <Button
              type="submit"
              className="w-full bg-growave-green text-black hover:bg-growave-green-light"
              disabled={isSubmitting}
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-growave-green text-black hover:bg-growave-green-light"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Analisando..." : "Enviar e Finalizar Diagnóstico"}
            </Button>
          )}
        </div>

        {formStep === 2 && (
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-white"
              onClick={() => setFormStep(1)}
              disabled={isSubmitting}
            >
              Voltar para a etapa anterior
            </button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default ContactForm;
