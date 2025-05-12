
import { Star } from "lucide-react";

interface StrengthsSectionProps {
  strengths: string[];
}

const StrengthsSection = ({ strengths }: StrengthsSectionProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
        <Star className="h-4 w-4 text-growave-green" />
        Pontos Fortes do Perfil
      </h4>
      <ul className="list-disc list-inside space-y-1 text-sm pl-1">
        {strengths.map((strength, i) => (
          <li key={i} className="text-gray-300">{strength}</li>
        ))}
      </ul>
    </div>
  );
};

export default StrengthsSection;
