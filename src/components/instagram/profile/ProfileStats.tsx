
import { Users, User, ChartBar } from "lucide-react";

interface ProfileStatsProps {
  followersCount: number;
  followsCount: number;
  postsCount: number;
}

const ProfileStats = ({
  followersCount,
  followsCount,
  postsCount,
}: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center max-w-[343px] mx-auto px-1 box-border">
      <div className="bg-white/5 p-2 rounded-lg">
        <Users className="h-4 w-4 mx-auto mb-1 text-growave-green" />
        <div className="text-sm font-bold">{followersCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Seguidores</div>
      </div>
      <div className="bg-white/5 p-2 rounded-lg">
        <User className="h-4 w-4 mx-auto mb-1 text-growave-green" />
        <div className="text-sm font-bold">{followsCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Seguindo</div>
      </div>
      <div className="bg-white/5 p-2 rounded-lg">
        <ChartBar className="h-4 w-4 mx-auto mb-1 text-growave-green" />
        <div className="text-sm font-bold">{postsCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Publicações</div>
      </div>
    </div>
  );
};

export default ProfileStats;
