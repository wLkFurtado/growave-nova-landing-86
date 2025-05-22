
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CREDENTIALS } from '@/integrations/supabase/client';

// Create a specialized client for anonymous submissions without session persistence
export const anonymousSupabase = createClient(
  SUPABASE_CREDENTIALS.url, 
  SUPABASE_CREDENTIALS.key,
  { 
    auth: { 
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false // Disable session detection in URL
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Info': 'growave-form-submission'
      }
    },
    // Set longer timeout for potentially slow networks
    db: {
      schema: 'public'
    }
  }
);

// Function to test if the anonymous client can access the database
export const testAnonymousAccess = async () => {
  try {
    const { data, error } = await anonymousSupabase
      .from('contacts')
      .select('id')
      .limit(1);
      
    if (error) {
      console.log('Anonymous access test result:', {
        success: false,
        error: error.message
      });
      return false;
    }
    
    console.log('Anonymous access test successful - RLS policies appear to be working correctly');
    return true;
  } catch (e) {
    console.error('Exception testing anonymous access:', e);
    return false;
  }
};
