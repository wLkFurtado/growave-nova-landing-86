
interface ProfileHeaderProps {
  username: string;
  isMobile?: boolean;
}

const ProfileHeader = ({
  username,
  isMobile = false
}: ProfileHeaderProps) => {
  return (
    <div className={`text-center ${isMobile ? 'mb-2 px-2 py-2' : 'mb-8 px-4 w-full py-4'}`}>
      <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-growave-green ${isMobile ? 'mb-1' : 'mb-4'}`}>Diagnóstico de Perfil Instagram</h3>
      <p className="text-gray-300 text-sm">
        Relatório completo do perfil @{username}
      </p>
    </div>
  );
};

export default ProfileHeader;
