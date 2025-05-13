
interface ProfileHeaderProps {
  username: string;
  isMobile?: boolean;
  currentStep?: number;
  totalSteps?: number;
  isQuestionnaire?: boolean;
}

const ProfileHeader = ({
  username,
  isMobile = false,
  currentStep,
  totalSteps,
  isQuestionnaire = false
}: ProfileHeaderProps) => {
  return (
    <div className={`text-center ${isMobile ? 'mb-1 px-2 py-1' : 'mb-4 px-4 w-full py-2'}`}>
      <h3 className={`${isMobile ? 'text-base' : 'text-xl md:text-2xl'} font-bold text-growave-green ${isMobile ? 'mb-1' : 'mb-2'}`}>
        {isQuestionnaire ? 'Qualificação' : 'Diagnóstico de Perfil Instagram'}
      </h3>
      <p className="text-gray-300 text-xs sm:text-sm">
        {isQuestionnaire 
          ? `Pergunta ${currentStep} de ${totalSteps}`
          : `Relatório completo do perfil @${username}`
        }
      </p>
    </div>
  );
};

export default ProfileHeader;
