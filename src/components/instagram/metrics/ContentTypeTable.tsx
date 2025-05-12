
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ContentTypeTableProps {
  postsByType: Record<string, number>;
  performanceByType: Record<string, number>;
}

const ContentTypeTable = ({ postsByType, performanceByType }: ContentTypeTableProps) => {
  // Only show types that have posts
  const filteredTypes = Object.entries(postsByType).filter(([_, count]) => count > 0);
  
  // If no types have posts, don't render the table
  if (filteredTypes.length === 0) {
    return (
      <div className="text-center text-sm text-gray-400 py-2">
        Não há dados suficientes para análise por tipo de conteúdo.
      </div>
    );
  }
  
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Tipo</TableHead>
            <TableHead className="text-gray-300">Quantidade</TableHead>
            <TableHead className="text-right text-gray-300">Média de Curtidas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTypes.map(([type, count]) => (
            <TableRow key={type}>
              <TableCell className="font-medium">{type}</TableCell>
              <TableCell>{count}</TableCell>
              <TableCell className="text-right">
                {Math.round(performanceByType[type]).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentTypeTable;
