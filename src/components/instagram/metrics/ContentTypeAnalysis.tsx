
import ContentTypeTable from "./ContentTypeTable";
import ContentTypeChart from "./ContentTypeChart";

interface ContentTypeAnalysisProps {
  postsByType: Record<string, number>;
  performanceByType: Record<string, number>;
  isMobile?: boolean;
}

const ContentTypeAnalysis = ({
  postsByType,
  performanceByType,
  isMobile = false
}: ContentTypeAnalysisProps) => {
  // Prepare data for the content type chart
  const contentTypeData = Object.entries(performanceByType)
    .filter(([type, _]) => postsByType[type] > 0)
    .map(([type, avgLikes]) => ({
      name: type,
      engajamento: Math.round(avgLikes),
    }));

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium mb-3">Tipos de Conteúdo e Desempenho</h4>
      <div className="bg-white/5 rounded-lg p-4">
        <ContentTypeTable 
          postsByType={postsByType} 
          performanceByType={performanceByType} 
        />

        <ContentTypeChart 
          contentTypeData={contentTypeData} 
          isMobile={isMobile} 
        />
      </div>
    </div>
  );
};

export default ContentTypeAnalysis;
