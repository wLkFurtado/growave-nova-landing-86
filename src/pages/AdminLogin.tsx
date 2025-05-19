
import LoginForm from '@/components/admin/LoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-growave-black px-6 py-12">
      <div className="mb-8 text-center">
        <img src="/lovable-uploads/dc7d5c5c-2c27-4986-9008-acd55a89fc67.png" alt="Growave Logo" className="h-14 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white">Login Administrativo</h1>
        <p className="text-growave-green mt-2">Acesso restrito para administradores</p>
      </div>
      
      <div className="w-full max-w-md bg-growave-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
