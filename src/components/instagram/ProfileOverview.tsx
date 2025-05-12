
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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

  const ContentWrapper = isMobile ? ScrollArea : 'div';

  return (
    <Card className="bg-black/40 border-white/10 w-full max-w-[375px] mx-auto">
      <CardHeader className="py-3 px-4">
        <ProfileHeader
          username={username}
          fullName={fullName}
          accountType={accountType}
          profileImage={profileImage}
        />
      </CardHeader>
      
      <CardContent className="space-y-4 px-4 py-3">
        <ProfileStats
          followersCount={followersCount}
          followsCount={followsCount}
          postsCount={postsCount}
        />
        
        <ProfileBiography biography={biography} />
        
        <ProfileSummary
          followersCount={followersCount}
          postsCount={postsCount}
          accountType={accountType}
          engagementRate={engagementRate}
          averageLikes={averageLikes}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
