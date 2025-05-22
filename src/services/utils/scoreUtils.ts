
import { FormValues } from '@/validators/contactFormSchema';

// Helper functions
export const calculateLeadScore = (formData: FormValues): number => {
  let score = 0;
  
  // Score based on investimento_ads
  switch (formData.investimentoAds) {
    case 'nao_invisto':
      score += 5; // Lower score for no investment
      break;
    case 'menos_1000':
      score += 10;
      break;
    case 'entre_1000_3000':
      score += 15;
      break;
    case 'entre_3000_5000':
      score += 20;
      break;
    case 'acima_5000':
      score += 25; // Higher score for higher investment
      break;
  }
  
  // Score based on faturamento_mensal
  switch (formData.faturamentoMensal) {
    case 'ate_10mil':
      score += 5;
      break;
    case 'entre_10mil_30mil':
      score += 10;
      break;
    case 'entre_30mil_50mil':
      score += 15;
      break;
    case 'acima_50mil':
      score += 20; // Higher score for higher revenue
      break;
    case 'nao_informar':
      score += 0;
      break;
  }
  
  // Score based on equipe_front_office
  switch (formData.equipeFrontOffice) {
    case 'atendo_sozinho':
      score += 5;
      break;
    case 'secretaria':
      score += 10;
      break;
    case 'equipe':
      score += 15;
      break;
    case 'procurando':
      score += 20; // Higher score if actively looking for support
      break;
  }
  
  // Score based on previous agency experience
  if (formData.trabalhouComAgencia) {
    score += 10;
  }
  
  return score;
};
