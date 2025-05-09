
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome precisa ter pelo menos 2 caracteres' }),
  phone: z.string().min(8, { message: 'Telefone inválido' }),
  instagram: z.string().min(1, { message: 'Instagram é obrigatório' }),
});

export type FormValues = z.infer<typeof formSchema>;
