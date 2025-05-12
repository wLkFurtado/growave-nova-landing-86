
import { useState, useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';
import { Label } from '@/components/ui/label';

interface AgenciaAnteriorFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const AgenciaAnteriorField = ({ form, disabled }: AgenciaAnteriorFieldProps) => {
  const [showExperienceField, setShowExperienceField] = useState(false);
  
  // Monitor the value of trabalhouComAgencia to show/hide the experience field
  useEffect(() => {
    const currentValue = form.watch('trabalhouComAgencia');
    setShowExperienceField(currentValue === true);
  }, [form.watch('trabalhouComAgencia')]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="trabalhouComAgencia"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-white">Você já trabalhou com alguma agência ou gestor de tráfego?</FormLabel>
            <FormControl>
              <RadioGroup
                className="flex flex-col space-y-1"
                onValueChange={(value) => {
                  // Convert string to boolean
                  const boolValue = value === 'true';
                  field.onChange(boolValue);
                  
                  // If user selects "No", clear the experience field
                  if (!boolValue) {
                    form.setValue('experienciaAnterior', '');
                  }
                }}
                value={field.value?.toString()}
                disabled={disabled}
              >
                <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                  <RadioGroupItem value="true" id="sim" />
                  <Label htmlFor="sim" className="text-sm text-gray-300 cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                  <RadioGroupItem value="false" id="nao" />
                  <Label htmlFor="nao" className="text-sm text-gray-300 cursor-pointer">Não</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showExperienceField && (
        <FormField
          control={form.control}
          name="experienciaAnterior"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Como foi sua experiência com a agência ou gestor anterior?</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Pode me contar o que deu certo ou o que te frustrou?"
                  className="resize-none bg-white/10 border-white/20 text-white"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default AgenciaAnteriorField;
