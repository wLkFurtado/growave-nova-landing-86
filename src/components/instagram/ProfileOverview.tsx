
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, ChartBar } from "lucide-react";
import { useEffect } from "react";

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
  averageLikes
}: ProfileOverviewProps) => {
  
  // Log profile image URL to debug
  useEffect(() => {
    console.log('Profile image URL in ProfileOverview:', profileImage);
  }, [profileImage]);

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-growave-green/30">
            {profileImage ? (
              <AvatarImage src={profileImage} alt={`@${username}`} className="object-cover" />
            ) : (
              <AvatarFallback className="bg-growave-green/20 text-growave-green">
                {username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle className="text-white">{fullName}</CardTitle>
            <CardDescription className="text-gray-400">
              @{username} • {accountType}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/5 p-3 rounded-lg">
            <Users className="h-5 w-5 mx-auto mb-1 text-growave-green" />
            <div className="text-lg font-bold">{followersCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Seguidores</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <User className="h-5 w-5 mx-auto mb-1 text-growave-green" />
            <div className="text-lg font-bold">{followsCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Seguindo</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <ChartBar className="h-5 w-5 mx-auto mb-1 text-growave-green" />
            <div className="text-lg font-bold">{postsCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Publicações</div>
          </div>
        </div>
        
        {biography && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-1">Biografia</h4>
            <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg whitespace-pre-wrap">
              {biography}
            </p>
          </div>
        )}
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Resumo Geral do Perfil</h4>
          <div className="bg-white/5 p-3 rounded-lg">
            <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
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
