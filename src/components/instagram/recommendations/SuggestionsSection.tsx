
import { TrendingUp } from "lucide-react";

interface SuggestionsSectionProps {
  suggestions: string[];
}

const SuggestionsSection = ({ suggestions }: SuggestionsSectionProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
        <TrendingUp className="h-4 w-4 text-growave-green" />
        Sugestões Práticas para Crescimento
      </h4>
      <ul className="list-disc list-inside space-y-1 text-sm pl-1">
        {suggestions.map((suggestion, i) => (
          <li key={i} className="text-gray-300">{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsSection;
