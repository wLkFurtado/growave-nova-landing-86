
import { Users, User, ChartBar } from "lucide-react";

interface ProfileStatsProps {
  followersCount: number;
  followsCount: number;
  postsCount: number;
  isMobile?: boolean;
}

const ProfileStats = ({
  followersCount,
  followsCount,
  postsCount,
  isMobile = false
}: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-center max-w-[343px] mx-auto">
      <div className={`bg-white/5 ${isMobile ? 'p-2' : 'p-3'} rounded-lg`}>
        <Users className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mx-auto ${isMobile ? 'mb-1' : 'mb-2'} text-growave-green`} />
        <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold`}>{followersCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Seguidores</div>
      </div>
      <div className={`bg-white/5 ${isMobile ? 'p-2' : 'p-3'} rounded-lg`}>
        <User className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mx-auto ${isMobile ? 'mb-1' : 'mb-2'} text-growave-green`} />
        <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold`}>{followsCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Seguindo</div>
      </div>
      <div className={`bg-white/5 ${isMobile ? 'p-2' : 'p-3'} rounded-lg`}>
        <ChartBar className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mx-auto ${isMobile ? 'mb-1' : 'mb-2'} text-growave-green`} />
        <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold`}>{postsCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Publicações</div>
      </div>
    </div>
  );
};

export default ProfileStats;
