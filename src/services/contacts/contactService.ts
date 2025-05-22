
import { supabase } from "@/integrations/supabase/client";
import { FormValues } from '@/validators/contactFormSchema';
import { countries } from "@/data/countries";
import { calculateLeadScore } from "../utils/scoreUtils";

// Function to format phone number with country code for storage
export const formatPhoneForStorage = (formData: FormValues): string => {
  const country = countries.find(c => c.code === formData.countryCode) || countries[0];
  const dialCode = country.dial_code;
  // Ensure the phone number is properly formatted with a + prefix for the country code
  return `+${dialCode}${formData.phone.replace(/\D/g, '')}`;
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

// Contacts
export const saveContactToSupabase = async (formData: FormValues): Promise<{ success: boolean; data?: Contact; error?: any }> => {
  try {
    console.log('Saving contact to Supabase with data:', formData);
    
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
      experiencia_anterior: formData.experienciaAnterior,
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
