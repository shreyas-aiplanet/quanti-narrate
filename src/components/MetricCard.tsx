import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  suffix?: string;
  description?: string;
}

export const MetricCard = ({ title, value, change, suffix, description }: MetricCardProps) => {
  const getTrendIcon = () => {
    if (!change) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-success" />;
    return <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  const getTrendColor = () => {
    if (!change) return "text-muted-foreground";
    if (change > 0) return "text-success";
    return "text-destructive";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
          {change !== undefined && (
            <div className={cn("flex items-center gap-1", getTrendColor())}>
              {getTrendIcon()}
              <span className="text-sm font-medium">
                {change > 0 ? "+" : ""}{change.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        {description && (
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
