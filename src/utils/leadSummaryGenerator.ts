
import { FormValues } from '@/validators/contactFormSchema';

// Helper function to convert form values to human-readable text
const getInvestimentoAdsText = (value?: string): string => {
  switch (value) {
    case 'nao_invisto': return 'não investe em anúncios';
    case 'menos_1000': return 'investe menos de R$1.000 em anúncios';
    case 'entre_1000_3000': return 'investe entre R$1.000 e R$3.000 em anúncios';
    case 'entre_3000_5000': return 'investe entre R$3.000 e R$5.000 em anúncios';
    case 'acima_5000': return 'investe acima de R$5.000 em anúncios';
    default: return 'não informou sobre investimento em anúncios';
  }
};

const getEquipeFrontOfficeText = (value?: string): string => {
  switch (value) {
    case 'secretaria': return 'possui uma secretária para atendimento';
    case 'equipe': return 'possui uma equipe para atendimento';
    case 'atendo_sozinho': return 'realiza os atendimentos sozinho(a)';
    case 'procurando': return 'está procurando alguém para atendimento';
    default: return 'não informou sobre sua equipe de atendimento';
  }
};

const getFaturamentoMensalText = (value?: string): string => {
  switch (value) {
    case 'ate_10mil': return 'fatura até R$10.000 por mês';
    case 'entre_10mil_30mil': return 'fatura entre R$10.000 e R$30.000 por mês';
    case 'entre_30mil_50mil': return 'fatura entre R$30.000 e R$50.000 por mês';
    case 'acima_50mil': return 'fatura acima de R$50.000 por mês';
    case 'nao_informar': return 'preferiu não informar seu faturamento';
    default: return 'não informou sobre faturamento';
  }
};

const getTrabalhouComAgenciaText = (value?: boolean, experiencia?: string): string => {
  if (value === true) {
    return `já trabalhou com agências anteriormente ${experiencia ? `e relatou: "${experiencia}"` : ''}`;
  } else if (value === false) {
    return 'nunca trabalhou com agências anteriormente';
  }
  return 'não informou se já trabalhou com agências';
};

/**
 * Generates a natural language summary of lead information from form data
 */
export const generateLeadSummary = (formData: FormValues): string => {
  // Remove @ from Instagram handle if present
  const instagramHandle = formData.instagram.replace('@', '');
  
  // Build the summary paragraphs
  const intro = `Lead: ${formData.name}, Instagram @${instagramHandle}, telefone ${formData.phone}.`;
  
  const businessDetails = `O negócio ${getFaturamentoMensalText(formData.faturamentoMensal)} e ${getEquipeFrontOfficeText(formData.equipeFrontOffice)}.`;
  
  const marketingDetails = `Atualmente ${getInvestimentoAdsText(formData.investimentoAds)} e ${getTrabalhouComAgenciaText(formData.trabalhouComAgencia, formData.experienciaAnterior)}.`;
  
  let expectations = '';
  if (formData.expectativasAgencia) {
    expectations = `Suas expectativas para uma agência são: "${formData.expectativasAgencia}".`;
  }
  
  // Combine all paragraphs, filtering out empty ones
  return [intro, businessDetails, marketingDetails, expectations]
    .filter(paragraph => paragraph.length > 0)
    .join(' ');
};
