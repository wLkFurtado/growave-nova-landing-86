
import { z } from 'zod';

export const formSchema = z.object({
  // First stage fields
  name: z.string().min(2, { message: 'Nome precisa ter pelo menos 2 caracteres' }),
  phone: z.string().min(8, { message: 'Telefone inválido' }),
  instagram: z.string().min(1, { message: 'Instagram é obrigatório' }),
  
  // Second stage fields
  investimentoAds: z.enum(['nao_invisto', 'menos_1000', 'entre_1000_3000', 'entre_3000_5000', 'acima_5000']).optional(),
  equipeFrontOffice: z.enum(['secretaria', 'equipe', 'atendo_sozinho', 'procurando']).optional(),
  faturamentoMensal: z.enum(['ate_10mil', 'entre_10mil_30mil', 'entre_30mil_50mil', 'acima_50mil', 'nao_informar']).optional(),
  trabalhouComAgencia: z.boolean().optional(),
  experienciaAnterior: z.string().optional(),
  expectativasAgencia: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
