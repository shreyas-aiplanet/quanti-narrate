import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RegionData } from "@/data/capacityData";

interface RegionalDemandChartProps {
  data: RegionData[];
}

export const RegionalDemandChart = ({ data }: RegionalDemandChartProps) => {
  const chartData = data.map(region => ({
    name: region.name,
    demand: region.currentDemand / 1000000, // Convert to millions
    supply: region.currentSupply / 1000000,
    forecasted: region.forecastedDemand / 1000000,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Demand vs Supply Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-xs"
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis
              className="text-xs"
              label={{ value: 'Units (Millions)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
              formatter={(value: number) => `${value.toFixed(1)}M units`}
            />
            <Legend />
            <Bar dataKey="demand" fill="hsl(var(--primary))" name="Current Demand" />
            <Bar dataKey="supply" fill="hsl(var(--chart-2))" name="Current Supply" />
            <Bar dataKey="forecasted" fill="hsl(var(--chart-3))" name="Forecasted Demand" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
