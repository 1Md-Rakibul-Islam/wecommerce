import { Check } from "lucide-react";

interface KeyFeaturesProps {
  features: string[];
}

export function KeyFeatures({ features }: KeyFeaturesProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Key Features</h3>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <Check size={16} className="text-success mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
