
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ContentTypeTableProps {
  postsByType: Record<string, number>;
  performanceByType: Record<string, number>;
}

const ContentTypeTable = ({ postsByType, performanceByType }: ContentTypeTableProps) => {
  return (
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
  );
};

export default ContentTypeTable;
