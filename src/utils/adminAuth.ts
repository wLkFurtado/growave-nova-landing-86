
import { supabase } from "@/integrations/supabase/client";
import { loginWithEmail, logoutUser } from "@/services/supabaseService";

// Check if user is logged in
export const isLoggedIn = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session !== null;
};

// Login function
export const loginAdmin = async (username: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await loginWithEmail(username, password);
    if (error) {
      console.error('Login error:', error.message);
      return false;
    }
    return data.session !== null;
  } catch (error) {
    console.error('Login exception:', error);
    return false;
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
