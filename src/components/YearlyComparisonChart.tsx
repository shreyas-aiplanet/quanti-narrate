import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ProductData } from "@/data/salesData";

interface YearlyComparisonChartProps {
  data: ProductData[];
  selectedProduct: string;
}

export const YearlyComparisonChart = ({ data, selectedProduct }: YearlyComparisonChartProps) => {
  const filteredData = data.filter(item => item.name === selectedProduct);
  
  const yearlyData = ["FY23", "FY24", "FY25"].map(year => {
    const yearSales = filteredData.reduce((acc, item) => {
      const yearData = item.data.find(d => d.fiscalYear === year && !d.forecast);
      return acc + (yearData?.sales || 0);
    }, 0);
    
    return {
      year,
      sales: yearSales,
    };
  });

  const formatCurrency = (value: number) => `$${(value / 1000000).toFixed(1)}M`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Year-over-Year Comparison</CardTitle>
        <CardDescription>Recent 3-year sales trend</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis tickFormatter={formatCurrency} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
