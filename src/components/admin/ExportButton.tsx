
import { Button } from '@/components/ui/button';
import { downloadContactsCSV } from '@/utils/exportUtils';
import { ContactEntry } from '@/utils/contactsStorage';

interface ExportButtonProps {
  contacts: ContactEntry[];
}

const ExportButton = ({ contacts }: ExportButtonProps) => {
  const handleExport = () => {
    downloadContactsCSV(contacts);
  };
  
  return (
    <Button
      variant="outline"
      className="border-growave-green text-growave-green hover:bg-growave-green/20"
      onClick={handleExport}
      disabled={contacts.length === 0}
    >
      Exportar Dados (CSV)
    </Button>
  );
};

export default ExportButton;
