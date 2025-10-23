import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIInsight } from "@/data/salesData";
import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightsCardProps {
  insights: AIInsight[];
}

export const InsightsCard = ({ insights }: InsightsCardProps) => {
  const getIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'opportunity':
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'trend':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'alert':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'opportunity':
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  // Take only first 3 insights
  const displayInsights = insights.slice(0, 3);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Key Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayInsights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "flex gap-3 rounded-lg border p-3 transition-all hover:shadow-sm",
              getTypeColor(insight.type)
            )}
          >
            <div className="mt-0.5 flex-shrink-0">
              {getIcon(insight.type)}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-tight">
                {insight.title}
              </p>
              <p className="text-xs leading-relaxed opacity-90">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
