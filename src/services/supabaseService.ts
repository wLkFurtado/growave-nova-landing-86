import { supabase } from "@/integrations/supabase/client";
import { FormValues } from '@/validators/contactFormSchema';
import { ContactEntry } from '@/utils/contactsStorage';

// Contacts
export const saveContactToSupabase = async (formData: FormValues): Promise<{ success: boolean; data?: any; error?: any }> => {
  try {
    const contactData = {
      name: formData.name,
      phone: formData.phone,
      instagram: formData.instagram,
      investimento_ads: formData.investimentoAds,
      equipe_front_office: formData.equipeFrontOffice,
      faturamento_mensal: formData.faturamentoMensal,
      trabalhou_com_agencia: formData.trabalhouComAgencia,
      experiencia_anterior: formData.experienciaAnterior,
      expectativas_agencia: formData.expectativasAgencia,
      origem: window.location.href,
      lead_score: calculateLeadScore(formData)
    };

    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single();

    if (error) {
      console.error('Error saving contact to Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (e) {
    console.error('Exception saving contact to Supabase:', e);
    return { success: false, error: e };
  }
};

export const getContactsFromSupabase = async (): Promise<{ success: boolean; data?: any[]; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('data_submissao', { ascending: false });

    if (error) {
      console.error('Error fetching contacts from Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (e) {
    console.error('Exception fetching contacts from Supabase:', e);
    return { success: false, error: e };
  }
};

export const getContactByIdFromSupabase = async (id: string): Promise<{ success: boolean; data?: any; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching contact from Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (e) {
    console.error('Exception fetching contact from Supabase:', e);
    return { success: false, error: e };
  }
};

// Contact Interactions
export const getContactInteractions = async (contactId: string): Promise<{ success: boolean; data?: any[]; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('contact_interactions')
      .select('*')
      .eq('contact_id', contactId)
      .order('interaction_date', { ascending: false });

    if (error) {
      console.error('Error fetching interactions from Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (e) {
    console.error('Exception fetching interactions from Supabase:', e);
    return { success: false, error: e };
  }
};

export const addContactInteraction = async (
  contactId: string, 
  interactionType: string, 
  notes: string
): Promise<{ success: boolean; data?: any; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('contact_interactions')
      .insert({
        contact_id: contactId,
        interaction_type: interactionType,
        notes,
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding interaction to Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (e) {
    console.error('Exception adding interaction to Supabase:', e);
    return { success: false, error: e };
  }
};

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

// Authentication functions
export const loginWithEmail = async (email: string, password: string) => {
  console.log('Attempting login with:', email);
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const signUpWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password
  });
};

export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export const getCurrentSession = async () => {
  return await supabase.auth.getSession();
};
