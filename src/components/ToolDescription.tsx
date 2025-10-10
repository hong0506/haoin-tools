import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Lightbulb, Shield, Zap } from "lucide-react";

interface ToolDescriptionProps {
  title: string;
  description: string;
  features: string[];
  useCases: string[];
  tips?: string[];
  security?: string;
}

export const ToolDescription: React.FC<ToolDescriptionProps> = ({
  title,
  description,
  features,
  useCases,
  tips = [],
  security = "This tool processes data locally in your browser. No data is sent to external servers, ensuring your privacy and security.",
}) => {
  return (
    <div className="mt-12 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            About {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Key Features
            </h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Common Use Cases
            </h4>
            <div className="flex flex-wrap gap-2">
              {useCases.map((useCase, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>

          {tips.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Pro Tips
              </h4>
              <ul className="space-y-1">
                {tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-1">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              Privacy & Security
            </h4>
            <p className="text-sm text-muted-foreground">{security}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

