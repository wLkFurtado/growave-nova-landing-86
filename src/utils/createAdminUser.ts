
import { supabase } from "@/integrations/supabase/client";

// This is a one-time use function to create an admin user
export const createAdminUser = async () => {
  try {
    console.log("Creating admin user...");
    
    const { data, error } = await supabase.auth.signUp({
      email: 'wallker.furtado@gmail.com',
      password: 'Wlk200507!@',
    });
    
    if (error) {
      console.error("Error creating admin user:", error.message);
      return { success: false, message: error.message };
    }
    
    console.log("Admin user created successfully:", data);
    return { success: true, user: data.user };
    
  } catch (error) {
    console.error("Exception creating admin user:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
};
