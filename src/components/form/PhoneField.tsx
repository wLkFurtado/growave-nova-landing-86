
import { Phone } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validators/contactFormSchema';
import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { countries, getDefaultCountry } from '@/data/countries';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface PhoneFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const PhoneField = ({ form, disabled }: PhoneFieldProps) => {
  const currentCountryCode = form.watch('countryCode') || 'BR';
  const currentCountry = countries.find(c => c.code === currentCountryCode) || getDefaultCountry();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
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
    setOpen(false);
    // Focus back on the input field after country selection
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
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
              {/* Country selector button integrated into the input */}
              <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 z-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button 
                            type="button"
                            variant="ghost" 
                            className="h-7 w-12 p-0 flex justify-start hover:bg-transparent" 
                            disabled={disabled}
                          >
                            <span className="text-lg mr-1">{currentCountry.flag}</span>
                            <span className="text-xs text-white/70">+{currentCountry.dial_code}</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Procurar país..." />
                            <CommandList>
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
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Selecionar país</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Phone input with space for the country code */}
              <Input 
                ref={inputRef}
                placeholder="Digite apenas números" 
                className={cn(
                  "pl-[5.5rem] pr-10 bg-white/10 border-white/20 text-white",
                  "focus:ring-white/30 focus:border-white/30"
                )}
                {...field}
                onChange={handlePhoneChange}
                maxLength={15}
                disabled={disabled}
              />
              
              {/* Phone icon on the right */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="h-4 w-4" />
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;
