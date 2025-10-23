import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { SalesDataPoint } from "@/data/salesData";
import { Loader2 } from "lucide-react";

interface SalesTrendChartProps {
  data: SalesDataPoint[];
  productName: string;
}

export const SalesTrendChart = ({ data, productName }: SalesTrendChartProps) => {
  const [showForecast, setShowForecast] = useState(false);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);

  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const handleGenerateForecast = async () => {
    setIsLoadingForecast(true);
    // Simulate loading time for forecast generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoadingForecast(false);
    setShowForecast(true);
  };

  // Filter data based on forecast visibility
  const displayData = showForecast ? data : data.filter((d) => !d.forecast);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-card p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{data.fiscalYear}</p>
          <p className="text-sm text-primary">
            Sales: {formatCurrency(data.sales)}
            {data.forecast && " (Forecast)"}
          </p>
          {data.confidence && (
            <div className="mt-1 text-xs text-muted-foreground">
              <p>Range: {formatCurrency(data.confidence.lower)} - {formatCurrency(data.confidence.upper)}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <CardTitle>Sales Trend Analysis</CardTitle>
            <CardDescription>
              {showForecast
                ? `Historical data (FY23-FY25) and AI-powered forecast (FY26-FY35) for ${productName}`
                : `Historical sales data for ${productName}`}
            </CardDescription>
          </div>
          {!showForecast && (
            <Button
              onClick={handleGenerateForecast}
              disabled={isLoadingForecast}
              className="ml-4"
            >
              {isLoadingForecast ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Forecast"
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={displayData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="fiscalYear"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              
              {/* Confidence interval area */}
              <Area
                type="monotone"
                dataKey="confidence.upper"
                stroke="none"
                fill="url(#confidenceGradient)"
                name="Confidence Range"
              />
              <Area
                type="monotone"
                dataKey="confidence.lower"
                stroke="none"
                fill="url(#confidenceGradient)"
              />
              
              {/* Historical sales line */}
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (!payload.forecast) {
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="hsl(var(--chart-1))"
                        stroke="hsl(var(--card))"
                        strokeWidth={2}
                      />
                    );
                  }
                  return null;
                }}
                name="Actual Sales"
              />
              
              {/* Forecasted sales line */}
              <Line
                type="monotone"
                dataKey={(entry: SalesDataPoint) => entry.forecast ? entry.sales : null}
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (payload.forecast) {
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={3}
                        fill="hsl(var(--chart-2))"
                        stroke="hsl(var(--card))"
                        strokeWidth={2}
                      />
                    );
                  }
                  return null;
                }}
                name="Forecasted Sales"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
