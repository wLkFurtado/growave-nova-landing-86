
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';
import { Label } from '@/components/ui/label';

interface FaturamentoMensalFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const FaturamentoMensalField = ({ form, disabled }: FaturamentoMensalFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="faturamentoMensal"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-white">
            Qual é o faturamento médio mensal da clínica?
            <span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <FormControl>
            <RadioGroup
              className="flex flex-col space-y-1"
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
            >
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="ate_10mil" id="ate_10mil" />
                <Label htmlFor="ate_10mil" className="text-sm text-gray-300 cursor-pointer">Até R$ 10 mil</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="entre_10mil_30mil" id="entre_10mil_30mil" />
                <Label htmlFor="entre_10mil_30mil" className="text-sm text-gray-300 cursor-pointer">De R$ 10 mil a R$ 30 mil</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="entre_30mil_50mil" id="entre_30mil_50mil" />
                <Label htmlFor="entre_30mil_50mil" className="text-sm text-gray-300 cursor-pointer">De R$ 30 mil a R$ 50 mil</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="acima_50mil" id="acima_50mil" />
                <Label htmlFor="acima_50mil" className="text-sm text-gray-300 cursor-pointer">Acima de R$ 50 mil</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="nao_informar" id="nao_informar" />
                <Label htmlFor="nao_informar" className="text-sm text-gray-300 cursor-pointer">Prefiro não informar</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FaturamentoMensalField;
