
import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { getContactInteractions } from '@/services/contacts/interactionService';
import { Button } from '@/components/ui/button';

interface Interaction {
  id: string;
  interaction_type: string;
  interaction_date: string;
  notes: string;
}

interface InteractionsHistoryProps {
  contactId: string;
  onAddInteraction: () => void;
}

const InteractionsHistory = ({ contactId, onAddInteraction }: InteractionsHistoryProps) => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInteractions = async () => {
      setIsLoading(true);
      const result = await getContactInteractions(contactId);
      if (result.success && result.data) {
        setInteractions(result.data);
      }
      setIsLoading(false);
    };

    loadInteractions();
  }, [contactId]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return 'Data inválida';
    }
  };

  // Get interaction type label
  const getInteractionTypeLabel = (type: string): string => {
    switch (type) {
      case 'call':
        return 'Ligação';
      case 'email':
        return 'E-mail';
      case 'meeting':
        return 'Reunião';
      case 'whatsapp':
        return 'WhatsApp';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-growave-green">Histórico de Interações</h3>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-growave-green text-growave-green hover:bg-growave-green/20"
          onClick={onAddInteraction}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Nova Interação</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-growave-green"></div>
        </div>
      ) : interactions.length > 0 ? (
        <div className="space-y-3">
          {interactions.map((interaction) => (
            <div 
              key={interaction.id} 
              className="bg-white/5 border border-white/10 rounded-md p-3"
            >
              <div className="flex justify-between items-start">
                <span className="inline-block bg-growave-green/20 text-growave-green text-xs px-2 py-1 rounded">
                  {getInteractionTypeLabel(interaction.interaction_type)}
                </span>
                <span className="text-xs text-white/60">
                  {formatDate(interaction.interaction_date)}
                </span>
              </div>
              <p className="mt-2 text-sm whitespace-pre-wrap">{interaction.notes}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-white/60">
          Nenhuma interação registrada com este contato.
        </div>
      )}
    </div>
  );
};

export default InteractionsHistory;
