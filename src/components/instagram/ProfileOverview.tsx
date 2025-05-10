
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, ChartBar } from "lucide-react";
import { useEffect } from "react";
import InstagramProfileImage from "./InstagramProfileImage";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <Card className="bg-black/40 border-white/10">
      <CardHeader className="py-1 px-2 sm:px-3 sm:py-2">
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
      </CardHeader>
      <CardContent className="space-y-1 sm:space-y-2 px-2 py-1 sm:px-3">
        <div className="grid grid-cols-3 gap-1 text-center">
          <div className="bg-white/5 p-1 rounded-lg">
            <Users className="h-4 w-4 mx-auto mb-0.5 text-growave-green" />
            <div className="text-base font-bold">{followersCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Seguidores</div>
          </div>
          <div className="bg-white/5 p-1 rounded-lg">
            <User className="h-4 w-4 mx-auto mb-0.5 text-growave-green" />
            <div className="text-base font-bold">{followsCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Seguindo</div>
          </div>
          <div className="bg-white/5 p-1 rounded-lg">
            <ChartBar className="h-4 w-4 mx-auto mb-0.5 text-growave-green" />
            <div className="text-base font-bold">{postsCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Publicações</div>
          </div>
        </div>
        
        {biography && (
          <div className="mt-1 sm:mt-2">
            <h4 className="text-xs sm:text-sm font-medium mb-0.5">Biografia</h4>
            <p className="text-xs sm:text-sm text-gray-300 bg-white/5 p-1 rounded-lg whitespace-pre-wrap">
              {biography}
            </p>
          </div>
        )}
        
        <div className="mt-1 sm:mt-2">
          <h4 className="text-xs sm:text-sm font-medium mb-1">Resumo Geral do Perfil</h4>
          <div className="bg-white/5 p-1 rounded-lg">
            <ul className="list-disc list-inside text-xs sm:text-sm space-y-0.5 text-gray-300">
              <li>Conta com {followersCount.toLocaleString()} seguidores e {postsCount.toLocaleString()} publicações</li>
              <li>Tipo de conta: {accountType}</li>
              <li>Taxa de engajamento média: {engagementRate.toFixed(2)}%</li>
              <li>Média de curtidas por post: {Math.round(averageLikes).toLocaleString()}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
