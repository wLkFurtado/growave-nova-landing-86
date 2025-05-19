
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/adminAuth';
import { getContacts, ContactEntry, getContactById } from '@/utils/contactsStorage';
import AdminHeader from '@/components/admin/AdminHeader';
import ContactsTable from '@/components/admin/ContactsTable';
import ContactDetails from '@/components/admin/ContactDetails';
import ExportButton from '@/components/admin/ExportButton';

const Admin = () => {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactEntry | null>(null);
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is logged in
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Load contacts on mount
  useEffect(() => {
    const loadContacts = () => {
      try {
        setIsLoading(true);
        const contactsData = getContacts();
        // Sort by date, newest first
        const sortedContacts = [...contactsData].sort(
          (a, b) => new Date(b.dataSubmissao).getTime() - new Date(a.dataSubmissao).getTime()
        );
        setContacts(sortedContacts);
      } catch (error) {
        console.error('Erro ao carregar contatos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContacts();
    
    // Set up a listener to reload contacts when localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_contacts') {
        loadContacts();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleViewContactDetails = (contactId: string) => {
    const contact = getContactById(contactId);
    if (contact) {
      setSelectedContact(contact);
      setIsContactDetailsOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-growave-black text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <AdminHeader />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Lista de Contatos</h2>
          <ExportButton contacts={contacts} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-growave-green"></div>
          </div>
        ) : (
          <ContactsTable 
            contacts={contacts} 
            onViewDetails={handleViewContactDetails}
          />
        )}
        
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
