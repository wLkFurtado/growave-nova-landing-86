
import { CardDescription, CardTitle } from "@/components/ui/card";
import InstagramProfileImage from "../InstagramProfileImage";

interface ProfileHeaderProps {
  username: string;
  fullName: string;
  accountType: string;
  profileImage: string;
}

const ProfileHeader = ({
  username,
  fullName,
  accountType,
  profileImage,
}: ProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <InstagramProfileImage 
        profileUrl={profileImage} 
        username={username} 
        size="md"
      />
      <div>
        <CardTitle className="text-white text-base sm:text-lg">{fullName}</CardTitle>
        <CardDescription className="text-gray-400 text-xs sm:text-sm">
          @{username} • {accountType}
        </CardDescription>
      </div>
    </div>
  );
};

export default ProfileHeader;
