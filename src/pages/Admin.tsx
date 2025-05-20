
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/adminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Admin: Checking authentication status...');
        const loggedIn = await isLoggedIn();
        console.log('Admin: Authentication check result:', loggedIn);
        setIsAuthenticated(loggedIn);
        
        if (!loggedIn) {
          console.log('Admin: Not authenticated, redirecting to login');
          navigate('/admin/login');
        }
        
        setAuthChecked(true);
      } catch (error) {
        console.error('Admin: Auth check error:', error);
        navigate('/admin/login');
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Admin: Auth state changed:', event);
        const newAuthState = session !== null;
        setIsAuthenticated(newAuthState);
        
        if (!newAuthState) {
          console.log('Admin: Session lost, redirecting to login');
          navigate('/admin/login');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-growave-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-growave-green"></div>
      </div>
    );
  }
  
  // If authenticated, show the dashboard
  return isAuthenticated ? <AdminDashboard /> : null;
};

export default Admin;
