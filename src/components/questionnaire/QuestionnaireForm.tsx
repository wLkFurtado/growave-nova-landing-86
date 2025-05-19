
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import ProfileHeader from '../instagram/insights/ProfileHeader';
import { formSchema, FormValues } from '@/validators/contactFormSchema';
import InvestimentoAdsField from '../form/InvestimentoAdsField';
import EquipeFrontOfficeField from '../form/EquipeFrontOfficeField';
import FaturamentoMensalField from '../form/FaturamentoMensalField';
import AgenciaAnteriorField from '../form/AgenciaAnteriorField';
import ExpectativasField from '../form/ExpectativasField';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuestionnaireFormProps {
  initialValues: FormValues;
  onComplete: (data: FormValues) => void;
  onCancel: () => void;
}

const QuestionnaireForm = ({ initialValues, onComplete, onCancel }: QuestionnaireFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const totalSteps = 5;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: 'onChange', // Validate on change for better user experience
  });

  const handleNext = async () => {
    // Get the field to validate based on current step
    let fieldToValidate: keyof FormValues | null = null;
    let additionalField: keyof FormValues | null = null;
    
    switch (currentStep) {
      case 1:
        fieldToValidate = 'investimentoAds';
        break;
      case 2:
        fieldToValidate = 'equipeFrontOffice';
        break;
      case 3:
        fieldToValidate = 'faturamentoMensal';
        break;
      case 4:
        fieldToValidate = 'trabalhouComAgencia';
        if (form.getValues('trabalhouComAgencia') === true) {
          additionalField = 'experienciaAnterior';
        }
        break;
      case 5:
        fieldToValidate = 'expectativasAgencia';
        break;
    }

    if (fieldToValidate) {
      const isValid = await form.trigger(fieldToValidate);
      if (!isValid) {
        // Show error toast
        toast({
          title: "Campo obrigatório",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (additionalField) {
      const isValid = await form.trigger(additionalField);
      if (!isValid) {
        // Show error toast
        toast({
          title: "Campo obrigatório",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    } else {
      onCancel();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Validate the entire form before submission
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: "Formulário incompleto",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      const values = form.getValues();
      onComplete(values);
      toast({
        title: "Dados enviados com sucesso!",
        description: "Obrigado por completar o diagnóstico.",
      });
    } catch (error) {
      console.error("Erro ao submeter questionário:", error);
      toast({
        title: "Erro ao enviar dados",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center w-full max-w-md mx-auto px-4">
      <ProfileHeader 
        username={initialValues.instagram.replace('@', '')} 
        isMobile={isMobile} 
        currentStep={currentStep}
        totalSteps={totalSteps}
        isQuestionnaire={true}
      />

      <Form {...form}>
        <form className="w-full space-y-4">
          {currentStep === 1 && (
            <div className="space-y-6">
              <InvestimentoAdsField form={form} disabled={isSubmitting} />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <EquipeFrontOfficeField form={form} disabled={isSubmitting} />
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <FaturamentoMensalField form={form} disabled={isSubmitting} />
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-6">
              <AgenciaAnteriorField form={form} disabled={isSubmitting} />
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-6">
              <ExpectativasField form={form} disabled={isSubmitting} />
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="ghost"
              onClick={handlePrevious}
              className="text-gray-400 hover:text-white"
              disabled={isSubmitting}
            >
              {currentStep === 1 ? 'Voltar ao diagnóstico' : 'Voltar'}
            </Button>
            
            <Button
              type="button"
              onClick={handleNext}
              className="bg-growave-green text-black hover:bg-growave-green-light"
              disabled={isSubmitting}
            >
              {currentStep === totalSteps ? 
                (isSubmitting ? 'Enviando...' : 'Finalizar') : 
                'Próximo'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuestionnaireForm;
