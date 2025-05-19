
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';

interface ExpectativasFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const ExpectativasField = ({ form, disabled }: ExpectativasFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="expectativasAgencia"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">
            O que você espera de uma agência de marketing hoje?
            <span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Busco ajuda com estratégias, agendamentos, criação de conteúdo, etc."
              className="resize-none bg-white/10 border-white/20 text-white"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ExpectativasField;
