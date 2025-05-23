
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { loginWithEmail } from '@/services/auth/authService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { createAdminUser } from '@/utils/createAdminUser';

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, { message: 'E-mail é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get redirect URL from query params or default to /admin
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/admin';
  
  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          console.log('User already has active session, redirecting');
          navigate(redirectUrl);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setAuthChecked(true);
      }
    };
    
    checkSession();
  }, [navigate, redirectUrl]);
  
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
    
    console.log('LoginForm: Attempting login with username:', data.username);
    
    try {
      const result = await loginWithEmail(data.username, data.password);
      
      if (result.error) {
        console.error('LoginForm: Login failed:', result.error);
        setAuthError(result.error.message || 'Credenciais inválidas. Tente novamente.');
        return;
      }
      
      if (!result.data.session) {
        console.error('LoginForm: No session returned');
        setAuthError('Erro ao estabelecer sessão. Tente novamente.');
        return;
      }
      
      console.log('LoginForm: Login successful, redirecting to', redirectUrl);
      toast({
        title: 'Login bem-sucedido',
        description: 'Bem-vindo ao painel administrativo.',
      });
      navigate(redirectUrl);
    } catch (error) {
      console.error('LoginForm: Error during login:', error);
      setAuthError('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdminUser = async () => {
    setCreatingAdmin(true);
    try {
      const result = await createAdminUser();
      if (result.success) {
        toast({
          title: 'Usuário admin criado',
          description: 'Usuário administrativo criado com sucesso. Você pode fazer login agora.',
        });
        // Pre-fill the form with the admin email
        form.setValue('username', 'wallker.furtado@gmail.com');
      } else {
        toast({
          title: 'Erro ao criar usuário',
          description: result.message || 'Ocorreu um erro ao criar o usuário administrativo.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao criar o usuário administrativo.',
        variant: 'destructive',
      });
    } finally {
      setCreatingAdmin(false);
    }
  };
  
  if (!authChecked) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-growave-green"></div>
      </div>
    );
  }
  
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
                    type="email"
                    autoComplete="email"
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
                    autoComplete="current-password"
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
          
          <div className="mt-4">
            <Button 
              type="button" 
              variant="outline"
              className="w-full border-growave-green text-growave-green hover:bg-growave-green/10"
              onClick={handleCreateAdminUser}
              disabled={creatingAdmin}
            >
              {creatingAdmin ? 'Criando usuário...' : 'Criar usuário admin (wallker.furtado@gmail.com)'}
            </Button>
            <p className="text-center text-xs text-gray-400 mt-2">
              Este botão é apenas para uso inicial e deve ser removido após a criação do usuário.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
