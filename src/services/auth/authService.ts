
import { supabase, SUPABASE_CREDENTIALS } from "@/integrations/supabase/client";

// Authentication functions
export const loginWithEmail = async (email: string, password: string) => {
  console.log('Attempting login with:', email);
  try {
    // Try direct REST API authentication first to avoid NULL conversion issues
    console.log('Using direct API authentication approach');
    
    try {
      const sessionResponse = await fetch(`${SUPABASE_CREDENTIALS.url}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_CREDENTIALS.key
        },
        body: JSON.stringify({ email, password })
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        console.log('Direct API login successful');
        
        // Create session object
        const session = {
          access_token: sessionData.access_token,
          refresh_token: sessionData.refresh_token,
          user: sessionData.user
        };
        
        // Update Supabase client with the new session
        await supabase.auth.setSession({
          access_token: sessionData.access_token,
          refresh_token: sessionData.refresh_token
        });
        
        // Verify session was set properly
        const sessionCheck = await supabase.auth.getSession();
        console.log('Session validation:', !!sessionCheck.data.session);
        
        return { 
          data: { session, user: sessionData.user },
          error: null 
        };
      } else {
        // If the API approach fails, try the standard method
        console.log('Direct API login failed, falling back to standard login');
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) {
          console.error('Standard login failed:', error.message);
          return { 
            data: { session: null, user: null }, 
            error: { message: 'Credenciais inválidas ou problema de autenticação.' }
          };
        }
        
        return { data, error: null };
      }
    } catch (directApiError) {
      console.error('Direct API authentication exception:', directApiError);
      
      // Last resort - try standard login method
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Standard login failed after API error:', error);
        return { 
          data: { session: null, user: null }, 
          error: { message: 'Erro de autenticação. Por favor, tente novamente.' }
        };
      }
      
      return { data, error: null };
    }
  } catch (err) {
    console.error('Exception during login process:', err);
    return { 
      data: { session: null, user: null },
      error: { message: 'Ocorreu um erro inesperado durante o login. Tente novamente.' }
    };
  }
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
