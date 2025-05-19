
import { FormValues } from '@/validators/contactFormSchema';

export interface ContactEntry extends FormValues {
  id: string;
  dataSubmissao: string;
  origem: string;
}

const STORAGE_KEY = 'admin_contacts';

// Save contact form submission
export const saveContact = (formData: FormValues): void => {
  // Get existing contacts
  const existingContacts = getContacts();
  
  // Create a new contact entry with additional metadata
  const newContact: ContactEntry = {
    ...formData,
    id: `contact-${Date.now()}`,
    dataSubmissao: new Date().toISOString(),
    origem: window.location.href,
  };
  
  // Add to contacts array
  existingContacts.push(newContact);
  
  // Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingContacts));
};

// Get all contacts
export const getContacts = (): ContactEntry[] => {
  const contactsJson = localStorage.getItem(STORAGE_KEY);
  
  if (!contactsJson) {
    return [];
  }
  
  try {
    return JSON.parse(contactsJson);
  } catch (error) {
    console.error('Error parsing contacts from localStorage:', error);
    return [];
  }
};

// Get a single contact by ID
export const getContactById = (id: string): ContactEntry | undefined => {
  const contacts = getContacts();
  return contacts.find(contact => contact.id === id);
};
