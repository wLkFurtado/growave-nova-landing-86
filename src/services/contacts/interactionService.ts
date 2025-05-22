
import { supabase } from "@/integrations/supabase/client";

// Define type for interactions based on the database schema
type ContactInteraction = {
  id: string;
  contact_id: string;
  interaction_type: string;
  notes: string;
  interaction_date: string;
  created_by?: string | null;
};

// Contact Interactions
export const getContactInteractions = async (contactId: string): Promise<{ success: boolean; data?: ContactInteraction[]; error?: any }> => {
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
): Promise<{ success: boolean; data?: ContactInteraction; error?: any }> => {
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
