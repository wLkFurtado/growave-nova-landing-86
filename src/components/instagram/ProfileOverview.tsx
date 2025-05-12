
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileStats from "./profile/ProfileStats";
import ProfileBiography from "./profile/ProfileBiography";
import ProfileSummary from "./profile/ProfileSummary";

interface ProfileOverviewProps {
  username: string;
  fullName: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  biography: string;
  profileImage: string;
  accountType: string;
  engagementRate: number;
  averageLikes: number;
  isMobile?: boolean;
}

const ProfileOverview = ({
  username,
  fullName,
  followersCount,
  followsCount,
  postsCount,
  biography,
  profileImage,
  accountType,
  engagementRate,
  averageLikes,
  isMobile = false
}: ProfileOverviewProps) => {
  
  // Log profile image URL to debug
  useEffect(() => {
    console.log('Profile image URL in ProfileOverview:', profileImage);
  }, [profileImage]);

  return (
    <Card className={`bg-black/40 border-white/10 w-full mx-auto ${isMobile ? 'p-0' : 'max-w-[375px]'}`}>
      <CardHeader className={isMobile ? "py-2 px-3" : "py-4 px-5"}>
        <ProfileHeader
          username={username}
          fullName={fullName}
          accountType={accountType}
          profileImage={profileImage}
        />
      </CardHeader>
      
      <CardContent className={isMobile ? "space-y-2 px-3 py-2" : "space-y-4 px-5 py-4"}>
        <ProfileStats
          followersCount={followersCount}
          followsCount={followsCount}
          postsCount={postsCount}
          isMobile={isMobile}
        />
        
        <ProfileBiography 
          biography={biography} 
          isMobile={isMobile}
        />
        
        <ProfileSummary
          followersCount={followersCount}
          postsCount={postsCount}
          accountType={accountType}
          engagementRate={engagementRate}
          averageLikes={averageLikes}
          isMobile={isMobile}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
