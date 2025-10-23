import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PlantCapacity } from "@/data/capacityData";

interface PlantUtilizationChartProps {
  data: PlantCapacity[];
}

export const PlantUtilizationChart = ({ data }: PlantUtilizationChartProps) => {
  const chartData = data.map(plant => ({
    name: plant.plantName,
    utilization: plant.utilizationRate,
    available: 100 - plant.utilizationRate,
  }));

  // Color code based on utilization
  const getColor = (utilization: number) => {
    if (utilization >= 85) return 'hsl(var(--destructive))'; // Red - near capacity
    if (utilization >= 70) return 'hsl(var(--primary))'; // Primary - healthy
    return 'hsl(var(--chart-3))'; // Green - underutilized
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plant Capacity Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" domain={[0, 100]} className="text-xs" />
            <YAxis dataKey="name" type="category" className="text-xs" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Bar dataKey="utilization" stackId="a" name="Utilized">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.utilization)} />
              ))}
            </Bar>
            <Bar dataKey="available" stackId="a" fill="hsl(var(--muted))" name="Available" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(var(--destructive))' }} />
            <span>High (≥85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(var(--primary))' }} />
            <span>Optimal (70-84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-3))' }} />
            <span>Low (&lt;70%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
