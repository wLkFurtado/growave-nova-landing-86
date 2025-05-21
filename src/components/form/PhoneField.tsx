
import { Phone, Flag } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';
import { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { countries, getDefaultCountry } from '@/data/countries';

interface PhoneFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const PhoneField = ({ form, disabled }: PhoneFieldProps) => {
  const currentCountryCode = form.watch('countryCode') || 'BR';
  const currentCountry = countries.find(c => c.code === currentCountryCode) || getDefaultCountry();
  
  // Format the phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    return value.replace(/\D/g, '');
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    form.setValue('phone', formattedValue, { shouldValidate: true });
  };

  const handleCountrySelect = (countryCode: string) => {
    form.setValue('countryCode', countryCode, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="countryCode"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-white">
              País
              <span className="text-red-500 ml-1">*</span>
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  disabled={disabled}
                  className="justify-between bg-white/10 border-white/20 text-white"
                >
                  <div className="flex items-center gap-2">
                    <span>{currentCountry.flag}</span>
                    <span>{currentCountry.name} (+{currentCountry.dial_code})</span>
                  </div>
                  <Flag className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Procurar país..." />
                  <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {countries.map((country) => (
                      <CommandItem
                        key={country.code}
                        value={country.code}
                        onSelect={() => handleCountrySelect(country.code)}
                      >
                        <span className="mr-2">{country.flag}</span>
                        {country.name} (+{country.dial_code})
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">
              Telefone (WhatsApp)
              <span className="text-red-500 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="h-4 w-4" />
                </span>
                <Input 
                  placeholder="Digite apenas números" 
                  className="pl-10 bg-white/10 border-white/20 text-white" 
                  {...field}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  disabled={disabled}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PhoneField;
