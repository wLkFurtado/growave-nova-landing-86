
import { supabase } from "@/integrations/supabase/client";
import { loginWithEmail, logoutUser } from "@/services/supabaseService";

// Check if user is logged in
export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Session check error:', error);
      return false;
    }
    return !!data.session;
  } catch (error) {
    console.error('Session check exception:', error);
    return false;
  }
};

// Login function
export const loginAdmin = async (username: string, password: string): Promise<{success: boolean; error?: string}> => {
  try {
    console.log('loginAdmin: Starting login process for', username);
    const { data, error } = await loginWithEmail(username, password);
    
    if (error) {
      console.error('Login error:', error.message);
      return { success: false, error: error.message };
    }
    
    if (!data.session) {
      console.error('Login failed: No session returned');
      return { success: false, error: 'Erro de autenticação. Tente novamente.' };
    }
    
    console.log('loginAdmin: Login successful');
    return { success: true };
  } catch (error) {
    console.error('Login exception:', error);
    return { success: false, error: 'Ocorreu um erro inesperado. Tente novamente mais tarde.' };
  }
};

// Logout function
export const logoutAdmin = async (): Promise<void> => {
  try {
    await logoutUser();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Protected route HOC (Higher-Order Component)
export const requireAuth = (nextUrl: string): string => {
  // We'll check auth status in the component directly
  return nextUrl;
};
