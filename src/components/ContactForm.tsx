
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Instagram, Phone, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome precisa ter pelo menos 2 caracteres' }),
  phone: z.string().min(8, { message: 'Telefone inválido' }),
  instagram: z.string().min(1, { message: 'Instagram é obrigatório' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      instagram: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send data to a backend
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nome</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="h-4 w-4" />
                  </span>
                  <Input 
                    placeholder="Seu nome completo" 
                    className="pl-10 bg-white/10 border-white/20 text-white" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Instagram</FormLabel>
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
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-growave-green text-black hover:bg-growave-green-light"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Agendar Diagnóstico"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
