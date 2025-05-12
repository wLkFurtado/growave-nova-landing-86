
interface ProfileHeaderProps {
  username: string;
}

const ProfileHeader = ({
  username
}: ProfileHeaderProps) => {
  return (
    <div className="text-center mb-8 px-4 w-full">
      <h3 className="text-xl md:text-2xl font-bold text-growave-green mb-3">Diagnóstico de Perfil Instagram</h3>
      <p className="text-gray-300 text-sm">
        Relatório completo do perfil @{username}
      </p>
    </div>
  );
};

export default ProfileHeader;
