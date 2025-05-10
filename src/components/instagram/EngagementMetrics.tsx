
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Heart, TrendingUp, ChevronDown } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EngagementMetricsProps {
  engagementPercentage: number;
  engagementRate: number;
  averageLikes: number;
  averageComments: number;
  likesScore: number;
  commentsScore: number;
  postsByType: Record<string, number>;
  performanceByType: Record<string, number>;
  isMobile?: boolean;
}

const EngagementMetrics = ({
  engagementPercentage,
  engagementRate,
  averageLikes,
  averageComments,
  likesScore,
  commentsScore,
  postsByType,
  performanceByType,
  isMobile = false
}: EngagementMetricsProps) => {
  
  // Prepare data for the content type chart
  const contentTypeData = Object.entries(performanceByType)
    .filter(([type, _]) => postsByType[type] > 0)
    .map(([type, avgLikes]) => ({
      name: type,
      engajamento: Math.round(avgLikes),
    }));

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-lg">Análise de Engajamento</CardTitle>
        <CardDescription className="text-gray-400">
          Baseada nos últimos posts
        </CardDescription>
      </CardHeader>
      {isMobile ? (
        <ScrollArea className="h-[50vh] px-1">
          <CardContent className="space-y-4 pb-16">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Métricas de Engajamento</h4>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-growave-green" />
                    Taxa de Engajamento
                  </span>
                  <span className="font-semibold">{engagementPercentage.toFixed(2)}%</span>
                </div>
                <Progress value={engagementPercentage} className="h-2" />
                <p className="text-xs text-gray-400">
                  {engagementRate < 1 ? "Baixa" : engagementRate < 3 ? "Mediana" : "Alta"} para contas do seu tamanho
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-growave-green" />
                    Média de Curtidas
                  </span>
                  <span className="font-semibold">{averageLikes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <Progress value={likesScore} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-growave-green" />
                    Média de Comentários
                  </span>
                  <span className="font-semibold">{averageComments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <Progress value={commentsScore} className="h-2" />
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Tipos de Conteúdo e Desempenho</h4>
              <div className="bg-white/5 rounded-lg p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-300">Tipo</TableHead>
                      <TableHead className="text-gray-300">Quantidade</TableHead>
                      <TableHead className="text-right text-gray-300">Média de Curtidas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(postsByType).map(([type, count]) => 
                      count > 0 ? (
                        <TableRow key={type}>
                          <TableCell className="font-medium">{type}</TableCell>
                          <TableCell>{count}</TableCell>
                          <TableCell className="text-right">
                            {Math.round(performanceByType[type]).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>

                {contentTypeData.length > 0 && (
                  <div className="h-40 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={contentTypeData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                        barSize={20}
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
                )}
              </div>
            </div>
            
            {/* Indicador de rolagem para visualização mobile */}
            <div className="text-center text-gray-400 text-sm pt-2">
              <ChevronDown className="h-4 w-4 inline animate-bounce" />
              <span className="ml-1">Role para ver mais</span>
            </div>
          </CardContent>
        </ScrollArea>
      ) : (
        <ScrollArea className="h-[40vh] px-1">
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Métricas de Engajamento</h4>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-growave-green" />
                    Taxa de Engajamento
                  </span>
                  <span className="font-semibold">{engagementPercentage.toFixed(2)}%</span>
                </div>
                <Progress value={engagementPercentage} className="h-2" />
                <p className="text-xs text-gray-400">
                  {engagementRate < 1 ? "Baixa" : engagementRate < 3 ? "Mediana" : "Alta"} para contas do seu tamanho
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-growave-green" />
                    Média de Curtidas
                  </span>
                  <span className="font-semibold">{averageLikes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <Progress value={likesScore} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-growave-green" />
                    Média de Comentários
                  </span>
                  <span className="font-semibold">{averageComments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <Progress value={commentsScore} className="h-2" />
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Tipos de Conteúdo e Desempenho</h4>
              <div className="bg-white/5 rounded-lg p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-300">Tipo</TableHead>
                      <TableHead className="text-gray-300">Quantidade</TableHead>
                      <TableHead className="text-right text-gray-300">Média de Curtidas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(postsByType).map(([type, count]) => 
                      count > 0 ? (
                        <TableRow key={type}>
                          <TableCell className="font-medium">{type}</TableCell>
                          <TableCell>{count}</TableCell>
                          <TableCell className="text-right">
                            {Math.round(performanceByType[type]).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>

                {contentTypeData.length > 0 && (
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={contentTypeData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                        barSize={40}
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
                )}
              </div>
            </div>
            
            {/* Indicador de rolagem para visualização desktop */}
            <div className="text-center text-gray-400 text-sm pt-2">
              <ChevronDown className="h-4 w-4 inline animate-bounce" />
              <span className="ml-1">Role para ver mais</span>
            </div>
          </CardContent>
        </ScrollArea>
      )}
    </Card>
  );
};

export default EngagementMetrics;
