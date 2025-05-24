
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormStepIndicator from './FormStepIndicator';
import NameField from './NameField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import InstagramField from './InstagramField';
import LoadingIndicator from './LoadingIndicator';

interface InitialFormProps {
  form: UseFormReturn<FormValues>;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: () => Promise<void>;
}

const InitialForm = ({ form, isSubmitting, isLoading, onSubmit }: InitialFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
        <FormStepIndicator currentStep={1} totalSteps={2} />
        
        <div className="text-sm text-gray-400 mb-4">
          Insira seus dados para iniciar o diagnóstico gratuito:
        </div>
        
        <NameField form={form} disabled={isSubmitting} />
        <EmailField form={form} disabled={isSubmitting} />
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

export default InitialForm;
