
interface ProfileSummaryProps {
  followersCount: number;
  postsCount: number;
  accountType: string;
  engagementRate: number;
  averageLikes: number;
}

const ProfileSummary = ({
  followersCount,
  postsCount,
  accountType,
  engagementRate,
  averageLikes,
}: ProfileSummaryProps) => {
  return (
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
  );
};

export default ProfileSummary;
