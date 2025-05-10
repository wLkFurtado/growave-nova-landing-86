
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ContentTypeChartProps {
  contentTypeData: Array<{ name: string; engajamento: number }>;
  isMobile?: boolean;
}

const ContentTypeChart = ({ contentTypeData, isMobile = false }: ContentTypeChartProps) => {
  if (!contentTypeData.length) return null;
  
  return (
    <div className={`${isMobile ? 'h-40' : 'h-64'} mt-4`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={contentTypeData}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          barSize={isMobile ? 20 : 40}
        >
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
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
