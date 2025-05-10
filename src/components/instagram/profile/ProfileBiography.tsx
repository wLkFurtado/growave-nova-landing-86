
interface ProfileBiographyProps {
  biography: string;
}

const ProfileBiography = ({ biography }: ProfileBiographyProps) => {
  if (!biography) return null;
  
  return (
    <div className="mt-1 sm:mt-2">
      <h4 className="text-xs sm:text-sm font-medium mb-0.5">Biografia</h4>
      <p className="text-xs sm:text-sm text-gray-300 bg-white/5 p-1 rounded-lg whitespace-pre-wrap">
        {biography}
      </p>
    </div>
  );
};

export default ProfileBiography;
