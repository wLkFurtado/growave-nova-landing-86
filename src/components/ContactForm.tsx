
interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  // URL simples sem parâmetros extras
  const surveyUrl = "https://link.3a3r.com/widget/survey/6asdPbuLFFA4t8UV3fsN";
  
  return (
    <div className="w-full h-full">
      <iframe 
        src={surveyUrl}
        style={{ border: 'none', width: '100%', height: '100%', minHeight: '700px' }}
        scrolling="no" 
        id="6asdPbuLFFA4t8UV3fsN" 
        title="Formulário de Contato"
      />
    </div>
  );
};

export default ContactForm;
