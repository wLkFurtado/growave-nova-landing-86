
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/adminAuth';
import { getContactsFromSupabase, getContactByIdFromSupabase, migrateContactsToSupabase } from '@/services/supabaseService';
import AdminHeader from '@/components/admin/AdminHeader';
import ContactsTable from '@/components/admin/ContactsTable';
import ContactDetails from '@/components/admin/ContactDetails';
import ExportButton from '@/components/admin/ExportButton';
import { useToast } from '@/hooks/use-toast';
import { ContactEntry } from '@/utils/contactsStorage';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactEntry | null>(null);
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMigratingData, setIsMigratingData] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn();
      setIsAuthenticated(loggedIn);
      
      if (!loggedIn) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const newAuthState = session !== null;
        setIsAuthenticated(newAuthState);
        
        if (!newAuthState) {
          navigate('/admin/login');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  // Load contacts on mount and when auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      loadContacts();
    }
  }, [isAuthenticated]);
  
  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const result = await getContactsFromSupabase();
      
      if (result.success && result.data) {
        setContacts(result.data);
      } else {
        console.error('Error loading contacts:', result.error);
        toast({
          title: 'Erro ao carregar contatos',
          description: 'Não foi possível carregar os dados. Tente novamente.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Exception loading contacts:', error);
      toast({
        title: 'Erro ao carregar contatos',
        description: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewContactDetails = async (contactId: string) => {
    try {
      const result = await getContactByIdFromSupabase(contactId);
      
      if (result.success && result.data) {
        // Transform the data from Supabase format to the expected ContactEntry format
        const contactEntry: ContactEntry = {
          id: result.data.id,
          name: result.data.name,
          phone: result.data.phone,
          instagram: result.data.instagram,
          investimentoAds: result.data.investimento_ads,
          equipeFrontOffice: result.data.equipe_front_office,
          faturamentoMensal: result.data.faturamento_mensal,
          trabalhouComAgencia: result.data.trabalhou_com_agencia,
          experienciaAnterior: result.data.experiencia_anterior,
          expectativasAgencia: result.data.expectativas_agencia,
          dataSubmissao: result.data.data_submissao,
          origem: result.data.origem
        };
        
        setSelectedContact(contactEntry);
        setIsContactDetailsOpen(true);
      } else {
        console.error('Error fetching contact:', result.error);
        toast({
          title: 'Erro ao carregar contato',
          description: 'Não foi possível carregar os detalhes do contato.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Exception fetching contact:', error);
      toast({
        title: 'Erro ao carregar contato',
        description: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        variant: 'destructive'
      });
    }
  };
  
  const handleMigrateData = async () => {
    if (isMigratingData) return;
    
    try {
      setIsMigratingData(true);
      
      toast({
        title: 'Migração de dados',
        description: 'Migrando dados do armazenamento local para o Supabase...',
      });
      
      const result = await migrateContactsToSupabase();
      
      if (result.success) {
        toast({
          title: 'Migração concluída',
          description: `${result.count} contatos foram migrados com sucesso.`,
        });
        
        // Reload contacts after migration
        loadContacts();
      } else {
        toast({
          title: 'Erro na migração',
          description: 'Não foi possível migrar os dados. Tente novamente.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: 'Erro na migração',
        description: 'Ocorreu um erro inesperado durante a migração.',
        variant: 'destructive'
      });
    } finally {
      setIsMigratingData(false);
    }
  };
  
  // If authentication is still being checked, show loading
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-growave-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-growave-green"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect handled by useEffect
  if (isAuthenticated === false) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-growave-black text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <AdminHeader />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Lista de Contatos</h2>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={handleMigrateData}
              disabled={isMigratingData}
            >
              {isMigratingData ? 'Migrando...' : 'Migrar dados locais'}
            </Button>
            <ExportButton contacts={contacts} />
          </div>
        </div>
        
        <ContactsTable 
          contacts={contacts} 
          onViewDetails={handleViewContactDetails}
          isLoading={isLoading}
        />
        
        <ContactDetails
          contact={selectedContact}
          isOpen={isContactDetailsOpen}
          onClose={() => setIsContactDetailsOpen(false)}
        />
      </div>
    </div>
  );
};

export default Admin;
