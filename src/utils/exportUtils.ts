
/**
 * Convert contacts array to CSV format
 */
export const contactsToCSV = (contacts: any[]): string => {
  // Define CSV headers
  const headers = [
    'ID',
    'Nome',
    'Telefone',
    'Instagram',
    'Investimento em Ads',
    'Equipe Front Office',
    'Faturamento Mensal',
    'Trabalhou com Agência?',
    'Experiência Anterior',
    'Expectativas',
    'Data de Submissão',
    'Origem',
    'Pontuação do Lead'
  ];
  
  // Map investmentAds values to readable labels
  const mapInvestimentoAds = (value: string): string => {
    const mapping: Record<string, string> = {
      nao_invisto: 'Não invisto',
      menos_1000: 'Menos de R$1.000',
      entre_1000_3000: 'Entre R$1.000 e R$3.000',
      entre_3000_5000: 'Entre R$3.000 e R$5.000',
      acima_5000: 'Acima de R$5.000'
    };
    return mapping[value] || value;
  };
  
  // Map equipeFrontOffice values to readable labels
  const mapEquipeFrontOffice = (value: string): string => {
    const mapping: Record<string, string> = {
      secretaria: 'Tenho secretária',
      equipe: 'Tenho equipe',
      atendo_sozinho: 'Atendo sozinho',
      procurando: 'Estou procurando'
    };
    return mapping[value] || value;
  };
  
  // Map faturamentoMensal values to readable labels
  const mapFaturamentoMensal = (value: string): string => {
    const mapping: Record<string, string> = {
      ate_10mil: 'Até R$10 mil',
      entre_10mil_30mil: 'Entre R$10 mil e R$30 mil',
      entre_30mil_50mil: 'Entre R$30 mil e R$50 mil',
      acima_50mil: 'Acima de R$50 mil',
      nao_informar: 'Prefiro não informar'
    };
    return mapping[value] || value;
  };

  // Create CSV rows
  const rows = contacts.map(contact => [
    contact.id,
    contact.name,
    contact.phone,
    contact.instagram,
    mapInvestimentoAds(contact.investimento_ads),
    mapEquipeFrontOffice(contact.equipe_front_office),
    mapFaturamentoMensal(contact.faturamento_mensal),
    contact.trabalhou_com_agencia ? 'Sim' : 'Não',
    contact.experiencia_anterior,
    contact.expectativas_agencia,
    new Date(contact.data_submissao).toLocaleString('pt-BR'),
    contact.origem,
    contact.lead_score
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  
  return csvContent;
};

/**
 * Download CSV file with contacts data
 */
export const downloadContactsCSV = (contacts: any[]): void => {
  const csv = contactsToCSV(contacts);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `contatos-growave-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
