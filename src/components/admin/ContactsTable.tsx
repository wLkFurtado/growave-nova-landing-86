
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ContactEntry {
  id: string;
  name: string;
  email: string;
  instagram: string;
  phone: string;
  data_submissao: string;
  lead_status?: string;
  lead_score?: number;
  [key: string]: any;
}

interface ContactsTableProps {
  contacts: ContactEntry[];
  onViewDetails: (contactId: string) => void;
  isLoading?: boolean;
}

const ContactsTable = ({ contacts, onViewDetails, isLoading = false }: ContactsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.instagram?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone?.includes(searchTerm)
  );
  
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
  
  // Get lead status badge color
  const getLeadStatusColor = (status?: string): string => {
    switch (status) {
      case 'quente':
        return 'bg-red-500/20 text-red-400';
      case 'morno':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'frio':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  // Get lead score class based on score
  const getLeadScoreClass = (score?: number): string => {
    if (!score && score !== 0) return 'bg-gray-500/20 text-gray-400';
    
    if (score >= 50) return 'bg-red-500/20 text-red-400';
    if (score >= 30) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-blue-500/20 text-blue-400';
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por nome, email, Instagram ou telefone..."
          className="pl-10 bg-white/10 border-white/20 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="border border-white/20 rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-white/10">
            <TableRow>
              <TableHead className="text-white">Nome</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Instagram</TableHead>
              <TableHead className="text-white">Telefone</TableHead>
              <TableHead className="text-white">Classificação</TableHead>
              <TableHead className="text-white">Data</TableHead>
              <TableHead className="text-white w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-growave-green"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="border-white/10">
                  <TableCell className="text-white">{contact.name}</TableCell>
                  <TableCell className="text-white">{contact.email}</TableCell>
                  <TableCell className="text-white">{contact.instagram}</TableCell>
                  <TableCell className="text-white">{contact.phone}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getLeadScoreClass(contact.lead_score)}`}>
                          {contact.lead_score || 0} pts
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>Pontuação calculada com base nos dados do formulário</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-white">{formatDate(contact.data_submissao)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="text-growave-green hover:text-growave-green/80 hover:bg-white/10 p-2 h-auto"
                      onClick={() => onViewDetails(contact.id)}
                    >
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-white/60 py-8">
                  {searchTerm ? 'Nenhum contato encontrado' : 'Nenhum contato registrado'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-white/60 text-sm">
        Total de contatos: {filteredContacts.length}
      </div>
    </div>
  );
};

export default ContactsTable;
