
import { useState } from 'react';
import { migrateContactsToSupabase } from '@/services/supabaseService';
import ExportButton from '@/components/admin/ExportButton';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface AdminActionsProps {
  contacts: any[];
  onContactsUpdated: () => Promise<void>;
}

const AdminActions = ({ contacts, onContactsUpdated }: AdminActionsProps) => {
  const [isMigratingData, setIsMigratingData] = useState(false);
  const { toast } = useToast();
  
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
        onContactsUpdated();
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
  
  return (
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
  );
};

export default AdminActions;
