
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logoutAdmin } from '@/utils/adminAuth';

const AdminHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };
  
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Growave - Painel Administrativo</h1>
        <p className="text-growave-green">Gerenciamento de leads e contatos</p>
      </div>
      <Button 
        onClick={handleLogout}
        variant="outline" 
        className="border-growave-green text-growave-green hover:bg-growave-green/20"
      >
        Sair
      </Button>
    </div>
  );
};

export default AdminHeader;
