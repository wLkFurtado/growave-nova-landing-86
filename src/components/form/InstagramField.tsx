
import { Instagram } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';

interface InstagramFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const InstagramField = ({ form, disabled }: InstagramFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="instagram"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">
            Instagram
            <span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Instagram className="h-4 w-4" />
              </span>
              <Input 
                placeholder="@seuinstagram" 
                className="pl-10 bg-white/10 border-white/20 text-white" 
                {...field}
                value={field.value.startsWith('@') ? field.value : `@${field.value.replace('@', '')}`}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value.startsWith('@') ? value : `@${value.replace('@', '')}`);
                }}
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

export default InstagramField;
