
interface ProfileHeaderProps {
  username: string;
}

const ProfileHeader = ({ username }: ProfileHeaderProps) => {
  return (
    <div className="text-center mb-6 px-4 max-w-[375px] mx-auto box-border">
      <h3 className="text-xl font-bold text-growave-green mb-2">Diagnóstico de Perfil Instagram</h3>
      <p className="text-gray-300">
        Relatório completo do perfil @{username}
      </p>
    </div>
  );
};

export default ProfileHeader;
