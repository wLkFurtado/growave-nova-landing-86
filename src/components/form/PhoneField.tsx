
import { Phone } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';

interface PhoneFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const PhoneField = ({ form, disabled }: PhoneFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Telefone</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="h-4 w-4" />
              </span>
              <Input 
                placeholder="(00) 00000-0000" 
                className="pl-10 bg-white/10 border-white/20 text-white" 
                {...field}
                disabled={disabled}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;
