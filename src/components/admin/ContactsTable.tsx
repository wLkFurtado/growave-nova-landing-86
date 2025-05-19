
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
import { ContactEntry } from '@/utils/contactsStorage';

interface ContactsTableProps {
  contacts: ContactEntry[];
  onViewDetails: (contactId: string) => void;
}

const ContactsTable = ({ contacts, onViewDetails }: ContactsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
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
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por nome, Instagram ou telefone..."
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
              <TableHead className="text-white">Instagram</TableHead>
              <TableHead className="text-white">Telefone</TableHead>
              <TableHead className="text-white">Data</TableHead>
              <TableHead className="text-white w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="border-white/10">
                  <TableCell className="text-white">{contact.name}</TableCell>
                  <TableCell className="text-white">{contact.instagram}</TableCell>
                  <TableCell className="text-white">{contact.phone}</TableCell>
                  <TableCell className="text-white">{formatDate(contact.dataSubmissao)}</TableCell>
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
                <TableCell colSpan={5} className="text-center text-white/60 py-8">
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
