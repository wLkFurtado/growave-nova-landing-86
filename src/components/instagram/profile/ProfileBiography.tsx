
interface ProfileBiographyProps {
  biography: string;
}

const ProfileBiography = ({ biography }: ProfileBiographyProps) => {
  if (!biography) return null;
  
  return (
    <div className="mt-4 mb-4">
      <h4 className="text-sm font-medium mb-2">Biografia</h4>
      <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg whitespace-pre-wrap max-h-[150px] overflow-y-auto">
        {biography}
      </p>
    </div>
  );
};

export default ProfileBiography;
