
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ContactEntry } from '@/utils/contactsStorage';

interface ContactDetailsProps {
  contact: ContactEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContactDetails = ({ contact, isOpen, onClose }: ContactDetailsProps) => {
  if (!contact) {
    return null;
  }

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
  
  // Map investmentAds values to readable labels
  const getInvestimentoAdsLabel = (value: string): string => {
    const mapping: Record<string, string> = {
      nao_invisto: 'Não invisto',
      menos_1000: 'Menos de R$1.000',
      entre_1000_3000: 'Entre R$1.000 e R$3.000',
      entre_3000_5000: 'Entre R$3.000 e R$5.000',
      acima_5000: 'Acima de R$5.000'
    };
    return mapping[value] || value;
  };
  
  // Map equipeFrontOffice values to readable labels
  const getEquipeFrontOfficeLabel = (value: string): string => {
    const mapping: Record<string, string> = {
      secretaria: 'Tenho secretária',
      equipe: 'Tenho equipe',
      atendo_sozinho: 'Atendo sozinho',
      procurando: 'Estou procurando'
    };
    return mapping[value] || value;
  };
  
  // Map faturamentoMensal values to readable labels
  const getFaturamentoMensalLabel = (value: string): string => {
    const mapping: Record<string, string> = {
      ate_10mil: 'Até R$10 mil',
      entre_10mil_30mil: 'Entre R$10 mil e R$30 mil',
      entre_30mil_50mil: 'Entre R$30 mil e R$50 mil',
      acima_50mil: 'Acima de R$50 mil',
      nao_informar: 'Prefiro não informar'
    };
    return mapping[value] || value;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-growave-black border-growave-green/20 text-white max-w-xl overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalhes do Contato</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-growave-green">Informações de Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-white/60 mb-1 text-sm">Nome</p>
                <p>{contact.name}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-sm">Telefone</p>
                <p>{contact.phone}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-sm">Instagram</p>
                <p>{contact.instagram}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-sm">Data de Submissão</p>
                <p>{formatDate(contact.dataSubmissao)}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-growave-green">Questionário</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-white/60 mb-1 text-sm">Investimento em Ads</p>
                <p>{getInvestimentoAdsLabel(contact.investimentoAds)}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-sm">Equipe Front Office</p>
                <p>{getEquipeFrontOfficeLabel(contact.equipeFrontOffice)}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-sm">Faturamento Mensal</p>
                <p>{getFaturamentoMensalLabel(contact.faturamentoMensal)}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-sm">Trabalhou com Agência?</p>
                <p>{contact.trabalhouComAgencia ? 'Sim' : 'Não'}</p>
              </div>
            </div>
            
            {contact.trabalhouComAgencia && (
              <div>
                <p className="text-white/60 mb-1 text-sm">Experiência Anterior</p>
                <p>{contact.experienciaAnterior || 'Não informado'}</p>
              </div>
            )}
            
            <div>
              <p className="text-white/60 mb-1 text-sm">Expectativas</p>
              <p>{contact.expectativasAgencia}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-growave-green">Metadados</h3>
            <div>
              <p className="text-white/60 mb-1 text-sm">Origem</p>
              <p className="break-all">{contact.origem}</p>
            </div>
          </div>
        </div>
        
        <DialogClose asChild>
          <Button className="bg-growave-green text-black hover:bg-growave-green-light">
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetails;
