
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { loginAdmin } from '@/utils/adminAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, { message: 'E-mail é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get redirect URL from query params or default to /admin
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/admin';
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const result = await loginAdmin(data.username, data.password);
      
      if (result.success) {
        toast({
          title: 'Login bem-sucedido',
          description: 'Bem-vindo ao painel administrativo.',
        });
        navigate(redirectUrl);
      } else {
        setAuthError(result.error || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setAuthError('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md">
      {authError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">E-mail</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite seu e-mail" 
                    className="bg-white/10 border-white/20 text-white"
                    type="text"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Senha</FormLabel>
                <FormControl>
                  <Input 
                    type="password"
                    placeholder="Digite sua senha" 
                    className="bg-white/10 border-white/20 text-white"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-growave-green text-black hover:bg-growave-green-light"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-400 mt-4">
            <p>Credenciais de demonstração</p>
            <p>E-mail: admin@growave.com</p>
            <p>Senha: adminGrowave123</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
