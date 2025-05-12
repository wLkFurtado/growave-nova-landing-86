
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ContentTypeChartProps {
  contentTypeData: Array<{ name: string; engajamento: number }>;
  isMobile?: boolean;
}

const ContentTypeChart = ({ contentTypeData, isMobile = false }: ContentTypeChartProps) => {
  if (!contentTypeData.length) return null;
  
  // Altura dinâmica baseada no número de itens para mobile
  const mobileHeight = Math.max(180, contentTypeData.length * 40);
  
  return (
    <div className={`mt-4 ${isMobile ? `h-[${mobileHeight}px]` : 'h-64'}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={contentTypeData}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          barSize={isMobile ? 20 : 40}
          layout={isMobile && contentTypeData.length > 3 ? "vertical" : "horizontal"}
        >
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            tick={{ fontSize: isMobile ? 12 : 14 }}
            interval={0}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fontSize: isMobile ? 12 : 14 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#18181B',
              borderColor: '#3F3F46',
              color: '#E4E4E7'
            }}
          />
          <Bar 
            dataKey="engajamento" 
            name="Média de Curtidas"
            fill="#4ade80" 
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContentTypeChart;
