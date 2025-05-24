
import { z } from 'zod';

export const formSchema = z.object({
  // First stage fields
  name: z.string().min(2, { message: 'Nome precisa ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' }),
  countryCode: z.string().default("BR"), // Default to Brazil
  phone: z.string().regex(/^\d{9,15}$/, { 
    message: 'Telefone inválido. Digite apenas números.' 
  }),
  instagram: z.string().min(1, { message: 'Instagram é obrigatório' }),
  
  // Second stage fields - all now required
  investimentoAds: z.enum(['nao_invisto', 'menos_1000', 'entre_1000_3000', 'entre_3000_5000', 'acima_5000'], {
    required_error: 'Por favor, selecione uma opção'
  }),
  equipeFrontOffice: z.enum(['secretaria', 'equipe', 'atendo_sozinho', 'procurando'], {
    required_error: 'Por favor, selecione uma opção'
  }),
  faturamentoMensal: z.enum(['ate_10mil', 'entre_10mil_30mil', 'entre_30mil_50mil', 'acima_50mil', 'nao_informar'], {
    required_error: 'Por favor, selecione uma opção'
  }),
  trabalhouComAgencia: z.boolean({
    required_error: 'Por favor, selecione uma opção'
  }),
  experienciaAnterior: z.string().superRefine((value, ctx) => {
    // Get parent data to check if trabalhouComAgencia is true
    const parentData = ctx.path?.[0] ? (ctx.path[0] as any)?.data : undefined;
    
    // Only required if trabalhouComAgencia is true
    if (parentData?.trabalhouComAgencia && value.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Por favor, compartilhe sua experiência anterior'
      });
    }
  }),
  expectativasAgencia: z.string().min(1, { message: 'Por favor, compartilhe suas expectativas' }),
});

export type FormValues = z.infer<typeof formSchema>;
