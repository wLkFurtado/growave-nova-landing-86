
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';
import { Label } from '@/components/ui/label';

interface EquipeFrontOfficeFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const EquipeFrontOfficeField = ({ form, disabled }: EquipeFrontOfficeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="equipeFrontOffice"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-white">Sua clínica tem secretária ou equipe de atendimento?</FormLabel>
          <FormControl>
            <RadioGroup
              className="flex flex-col space-y-1"
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
            >
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="secretaria" id="secretaria" />
                <Label htmlFor="secretaria" className="text-sm text-gray-300 cursor-pointer">Sim, tenho uma secretária</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="equipe" id="equipe" />
                <Label htmlFor="equipe" className="text-sm text-gray-300 cursor-pointer">Tenho uma equipe de atendimento</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="atendo_sozinho" id="atendo_sozinho" />
                <Label htmlFor="atendo_sozinho" className="text-sm text-gray-300 cursor-pointer">Eu mesmo atendo os pacientes</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="procurando" id="procurando" />
                <Label htmlFor="procurando" className="text-sm text-gray-300 cursor-pointer">Estou procurando alguém para me ajudar</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EquipeFrontOfficeField;
