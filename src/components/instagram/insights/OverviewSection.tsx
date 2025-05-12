
import ProfileOverview from "../ProfileOverview";
import ActionButton from "./ActionButton";
import { InstagramProfileData, ProfileAnalysis } from "@/hooks/use-instagram-profile";

interface OverviewSectionProps {
  profileData: InstagramProfileData;
  profileAnalysis: ProfileAnalysis;
  onReset: () => void;
  isMobile: boolean;
}

const OverviewSection = ({ profileData, profileAnalysis, onReset, isMobile }: OverviewSectionProps) => {
  const {
    username,
    fullName,
    followersCount,
    followsCount,
    postsCount,
    biography
  } = profileData;
  
  const {
    profileImage,
    accountTypeLabel,
    engagementMetrics: { engagement_rate, average_likes }
  } = profileAnalysis;
  
  return (
    <div className={`flex flex-col w-full mx-auto ${isMobile ? 'max-w-[375px] px-4 gap-2' : 'max-w-[375px]'}`}>
      <ProfileOverview
        username={username}
        fullName={fullName}
        followersCount={followersCount}
        followsCount={followsCount}
        postsCount={postsCount}
        biography={biography}
        profileImage={profileImage}
        accountType={accountTypeLabel}
        engagementRate={engagement_rate}
        averageLikes={average_likes}
        isMobile={isMobile}
      />
      
      <ActionButton onReset={onReset} isMobile={isMobile} />
    </div>
  );
};

export default OverviewSection;
