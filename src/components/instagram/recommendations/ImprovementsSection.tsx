
import { ArrowUp } from "lucide-react";

interface ImprovementsSectionProps {
  improvementAreas: string[];
}

const ImprovementsSection = ({ improvementAreas }: ImprovementsSectionProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
        <ArrowUp className="h-4 w-4 text-growave-green" />
        Oportunidades de Melhoria
      </h4>
      <ul className="list-disc list-inside space-y-1 text-sm pl-1">
        {improvementAreas.map((area, i) => (
          <li key={i} className="text-gray-300">{area}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImprovementsSection;
