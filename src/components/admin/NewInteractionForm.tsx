
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { addContactInteraction } from '@/services/contacts/interactionService';
import { useToast } from '@/hooks/use-toast';

const interactionFormSchema = z.object({
  interactionType: z.string().min(1, { message: 'Selecione o tipo de interação' }),
  notes: z.string().min(3, { message: 'As notas devem ter pelo menos 3 caracteres' })
});

type InteractionFormValues = z.infer<typeof interactionFormSchema>;

interface NewInteractionFormProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string;
  onSuccess: () => void;
}

const NewInteractionForm = ({ isOpen, onClose, contactId, onSuccess }: NewInteractionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InteractionFormValues>({
    resolver: zodResolver(interactionFormSchema),
    defaultValues: {
      interactionType: '',
      notes: ''
    }
  });
  
  const handleSubmit = async (values: InteractionFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await addContactInteraction(
        contactId,
        values.interactionType,
        values.notes
      );
      
      if (result.success) {
        toast({
          title: 'Interação registrada',
          description: 'A interação foi adicionada com sucesso.',
        });
        form.reset();
        onSuccess();
        onClose();
      } else {
        toast({
          title: 'Erro ao registrar interação',
          description: 'Não foi possível salvar a interação. Tente novamente.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error adding interaction:', error);
      toast({
        title: 'Erro ao registrar interação',
        description: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-growave-black border-growave-green/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Nova Interação</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="interactionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Interação</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Selecione o tipo de interação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-growave-black border-white/20 text-white">
                      <SelectItem value="call">Ligação</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="meeting">Reunião</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva detalhes da interação..." 
                      className="bg-white/10 border-white/20 text-white min-h-[100px]"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/20 text-white"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-growave-green text-black hover:bg-growave-green-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInteractionForm;
