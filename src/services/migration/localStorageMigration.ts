
import { supabase } from "@/integrations/supabase/client";
import { ContactEntry } from '@/utils/contactsStorage';
import { calculateLeadScore } from '../utils/scoreUtils';

// Data migration function
export const migrateContactsToSupabase = async (): Promise<{ success: boolean; count: number; error?: any }> => {
  // Get contacts from localStorage
  const localContacts = (() => {
    try {
      const contactsJson = localStorage.getItem('admin_contacts');
      return contactsJson ? JSON.parse(contactsJson) : [];
    } catch (error) {
      console.error('Error parsing contacts from localStorage:', error);
      return [];
    }
  })();
  
  if (localContacts.length === 0) {
    return { success: true, count: 0 };
  }
  
  try {
    // Insert each contact into Supabase
    const insertPromises = localContacts.map((contact: ContactEntry) => {
      return supabase.from('contacts').insert({
        id: contact.id.replace('contact-', ''),
        name: contact.name,
        phone: contact.phone,
        instagram: contact.instagram,
        investimento_ads: contact.investimentoAds,
        equipe_front_office: contact.equipeFrontOffice,
        faturamento_mensal: contact.faturamentoMensal,
        trabalhou_com_agencia: contact.trabalhouComAgencia,
        experiencia_anterior: contact.experienciaAnterior,
        expectativas_agencia: contact.expectativasAgencia,
        data_submissao: contact.dataSubmissao,
        origem: contact.origem,
        lead_score: calculateLeadScore(contact)
      });
    });
    
    await Promise.all(insertPromises);
    
    return { success: true, count: localContacts.length };
  } catch (error) {
    console.error('Error migrating contacts to Supabase:', error);
    return { success: false, count: 0, error };
  }
};
