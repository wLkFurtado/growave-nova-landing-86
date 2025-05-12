
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
    <div className="mt-6 mb-4">
      <h4 className="text-sm font-medium mb-3">Resumo Geral do Perfil</h4>
      <div className="bg-white/5 p-4 rounded-lg">
        <ul className="list-disc list-inside text-sm space-y-3 text-gray-300">
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
