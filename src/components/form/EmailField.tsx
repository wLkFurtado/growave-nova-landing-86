
import { Mail } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';

interface EmailFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const EmailField = ({ form, disabled }: EmailFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">
            Email
            <span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <Input 
                type="email"
                placeholder="seu@email.com" 
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

export default EmailField;
