
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';
import { Label } from '@/components/ui/label';

interface InvestimentoAdsFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const InvestimentoAdsField = ({ form, disabled }: InvestimentoAdsFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="investimentoAds"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-white">Quanto você investe atualmente em tráfego pago (Meta Ads, Google Ads)?</FormLabel>
          <FormControl>
            <RadioGroup
              className="flex flex-col space-y-1"
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
            >
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="nao_invisto" id="nao_invisto" />
                <Label htmlFor="nao_invisto" className="text-sm text-gray-300 cursor-pointer">Não invisto atualmente</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="menos_1000" id="menos_1000" />
                <Label htmlFor="menos_1000" className="text-sm text-gray-300 cursor-pointer">Menos de R$ 1.000 por mês</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="entre_1000_3000" id="entre_1000_3000" />
                <Label htmlFor="entre_1000_3000" className="text-sm text-gray-300 cursor-pointer">De R$ 1.000 a R$ 3.000</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="entre_3000_5000" id="entre_3000_5000" />
                <Label htmlFor="entre_3000_5000" className="text-sm text-gray-300 cursor-pointer">De R$ 3.000 a R$ 5.000</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/5">
                <RadioGroupItem value="acima_5000" id="acima_5000" />
                <Label htmlFor="acima_5000" className="text-sm text-gray-300 cursor-pointer">Acima de R$ 5.000</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InvestimentoAdsField;
