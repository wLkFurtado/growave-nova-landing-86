
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/adminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn();
      
      if (!loggedIn) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return <AdminDashboard />;
};

export default Admin;
