import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ProductData } from "@/data/salesData";

interface PlantAnalysisChartProps {
  data: ProductData[];
  selectedProduct: string;
}

export const PlantAnalysisChart = ({ data, selectedProduct }: PlantAnalysisChartProps) => {
  const plantData = data
    .filter(item => item.name === selectedProduct)
    .reduce((acc, item) => {
      const latestData = item.data.filter(d => !d.forecast && d.fiscalYear === "FY25")[0];
      if (latestData) {
        const existing = acc.find(p => p.plant === item.plant);
        if (existing) {
          existing.sales += latestData.sales;
        } else {
          acc.push({ plant: item.plant, sales: latestData.sales });
        }
      }
      return acc;
    }, [] as Array<{ plant: string; sales: number }>);

  const formatCurrency = (value: number) => `$${(value / 1000000).toFixed(1)}M`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plant-wise Sales Distribution (FY25)</CardTitle>
        <CardDescription>Current year sales performance across plants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={plantData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="plant" stroke="hsl(var(--muted-foreground))" />
              <YAxis tickFormatter={formatCurrency} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
