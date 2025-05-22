
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CREDENTIALS } from '@/integrations/supabase/client';

// Create a specialized client for anonymous submissions without session persistence
export const anonymousSupabase = createClient(
  SUPABASE_CREDENTIALS.url, 
  SUPABASE_CREDENTIALS.key,
  { 
    auth: { 
      persistSession: false,
      autoRefreshToken: false
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
);
