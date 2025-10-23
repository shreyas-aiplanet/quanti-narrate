import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SalesDataPoint } from "@/data/salesData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ForecastDataTableProps {
  data: SalesDataPoint[];
  showForecast: boolean;
}

export const ForecastDataTable = ({ data, showForecast }: ForecastDataTableProps) => {
  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  // Get only forecast data
  const forecastData = data.filter((d) => d.forecast);

  // Calculate growth rate compared to last historical year
  const lastHistorical = data.filter((d) => !d.forecast).slice(-1)[0];

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (growth < 0) return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  if (!showForecast || forecastData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed bg-muted/20 p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Generate forecast to view predictions
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Click "Generate Forecast" to see the data table
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Forecast Data</h3>
          <p className="text-xs text-muted-foreground">FY26 - FY35 Projections</p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1">
          <span className="text-xs font-medium text-primary">AI Generated</span>
        </div>
      </div>

      <div className="max-h-[340px] overflow-y-auto rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur">
            <TableRow>
              <TableHead className="w-[90px] font-semibold">Year</TableHead>
              <TableHead className="text-right font-semibold">Sales</TableHead>
              <TableHead className="text-right font-semibold">Growth</TableHead>
              <TableHead className="text-right font-semibold">Range</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forecastData.map((item, index) => {
              const previousValue = index === 0 ? lastHistorical?.sales : forecastData[index - 1].sales;
              const growth = previousValue ? calculateGrowth(item.sales, previousValue) : 0;

              return (
                <TableRow key={item.fiscalYear} className="group hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.fiscalYear}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-foreground">
                      {formatCurrency(item.sales)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {getGrowthIcon(growth)}
                      <span
                        className={cn(
                          "text-xs font-medium",
                          growth > 0 && "text-green-600",
                          growth < 0 && "text-red-600",
                          growth === 0 && "text-muted-foreground"
                        )}
                      >
                        {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.confidence ? (
                      <div className="text-xs text-muted-foreground">
                        <div>{formatCurrency(item.confidence.lower)}</div>
                        <div className="text-[10px]">to</div>
                        <div>{formatCurrency(item.confidence.upper)}</div>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg bg-muted/30 p-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground">Avg. Growth</p>
            <p className="mt-1 font-semibold text-foreground">
              {forecastData.length > 1
                ? `${(
                    forecastData.slice(1).reduce((sum, item, idx) => {
                      const prev = forecastData[idx].sales;
                      return sum + calculateGrowth(item.sales, prev);
                    }, 0) / (forecastData.length - 1)
                  ).toFixed(1)}%`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Forecast</p>
            <p className="mt-1 font-semibold text-foreground">
              {formatCurrency(forecastData.reduce((sum, item) => sum + item.sales, 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
