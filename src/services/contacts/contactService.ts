
import { supabase } from "@/integrations/supabase/client";
import { FormValues } from '@/validators/contactFormSchema';
import { countries } from "@/data/countries";
import { calculateLeadScore } from "../utils/scoreUtils";

// Function to format phone number with country code for storage
export const formatPhoneForStorage = (formData: FormValues): string => {
  const country = countries.find(c => c.code === formData.countryCode) || countries[0];
  const dialCode = country.dial_code;
  // Ensure the phone number is properly formatted with a + prefix for the country code
  // Remove any non-digit characters from phone
  const cleanPhone = formData.phone.replace(/\D/g, '');
  return `${dialCode}${cleanPhone}`;
};

// Define type for the contacts table based on what we created in the database
type Contact = {
  id: string;
  name: string;
  phone: string;
  country_code: string;
  instagram: string;
  investimento_ads: string;
  equipe_front_office: string;
  faturamento_mensal: string;
  trabalhou_com_agencia: boolean;
  experiencia_anterior: string | null;
  expectativas_agencia: string;
  origem: string | null;
  lead_score: number | null;
  data_submissao: string;
};

// Validate form data against expected enum values
const validateFormData = (formData: FormValues): boolean => {
  const validInvestimentoAds = ['nao_invisto', 'menos_1000', 'entre_1000_3000', 'entre_3000_5000', 'acima_5000'];
  const validEquipeFrontOffice = ['secretaria', 'equipe', 'atendo_sozinho', 'procurando'];
  const validFaturamentoMensal = ['ate_10mil', 'entre_10mil_30mil', 'entre_30mil_50mil', 'acima_50mil', 'nao_informar'];
  
  if (!formData.name || formData.name.length < 2) {
    console.error('Nome inválido:', formData.name);
    return false;
  }
  
  if (!formData.phone || !/^\d{9,15}$/.test(formData.phone.replace(/\D/g, ''))) {
    console.error('Telefone inválido:', formData.phone);
    return false;
  }
  
  if (!formData.instagram || formData.instagram.length < 1) {
    console.error('Instagram inválido:', formData.instagram);
    return false;
  }
  
  if (!formData.investimentoAds || !validInvestimentoAds.includes(formData.investimentoAds)) {
    console.error('Investimento em Ads inválido:', formData.investimentoAds);
    return false;
  }
  
  if (!formData.equipeFrontOffice || !validEquipeFrontOffice.includes(formData.equipeFrontOffice)) {
    console.error('Equipe Front Office inválida:', formData.equipeFrontOffice);
    return false;
  }
  
  if (!formData.faturamentoMensal || !validFaturamentoMensal.includes(formData.faturamentoMensal)) {
    console.error('Faturamento Mensal inválido:', formData.faturamentoMensal);
    return false;
  }
  
  if (formData.trabalhouComAgencia === undefined) {
    console.error('Trabalhou com Agência não definido:', formData.trabalhouComAgencia);
    return false;
  }
  
  if (formData.trabalhouComAgencia && (!formData.experienciaAnterior || formData.experienciaAnterior.length === 0)) {
    console.error('Experiência Anterior obrigatória quando trabalhou com agência:', formData.experienciaAnterior);
    return false;
  }
  
  if (!formData.expectativasAgencia || formData.expectativasAgencia.length === 0) {
    console.error('Expectativas Agência inválidas:', formData.expectativasAgencia);
    return false;
  }
  
  return true;
};

// Contacts
export const saveContactToSupabase = async (formData: FormValues): Promise<{ success: boolean; data?: Contact; error?: any }> => {
  try {
    console.log('Saving contact to Supabase with data:', formData);
    
    // Validate form data before saving
    if (!validateFormData(formData)) {
      return { success: false, error: 'Dados de contato inválidos' };
    }
    
    // Format phone with country code
    const phoneWithCode = formatPhoneForStorage(formData);
    console.log('Formatted phone for storage:', phoneWithCode);
    
    const contactData = {
      name: formData.name,
      phone: phoneWithCode,
      country_code: formData.countryCode,
      instagram: formData.instagram,
      investimento_ads: formData.investimentoAds,
      equipe_front_office: formData.equipeFrontOffice,
      faturamento_mensal: formData.faturamentoMensal,
      trabalhou_com_agencia: formData.trabalhouComAgencia,
      experiencia_anterior: formData.experienciaAnterior || null,
      expectativas_agencia: formData.expectativasAgencia,
      origem: window.location.href,
      lead_score: calculateLeadScore(formData),
      data_submissao: new Date().toISOString()
    };

    console.log('Contact data being sent to Supabase:', contactData);

    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single();

    if (error) {
      console.error('Error saving contact to Supabase:', error);
      return { success: false, error };
    }

    console.log('Successfully saved contact to Supabase:', data);
    return { success: true, data };
  } catch (e) {
    console.error('Exception saving contact to Supabase:', e);
    return { success: false, error: e };
  }
};

export const getContactsFromSupabase = async (): Promise<{ success: boolean; data?: Contact[]; error?: any }> => {
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

export const getContactByIdFromSupabase = async (id: string): Promise<{ success: boolean; data?: Contact; error?: any }> => {
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
