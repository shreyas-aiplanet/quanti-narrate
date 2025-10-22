import { useState, useMemo } from "react";
import { BarChart3, Brain } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { SalesTrendChart } from "@/components/SalesTrendChart";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { FilterPanel } from "@/components/FilterPanel";
import { generateSalesData, generateAIInsights } from "@/data/salesData";

const Index = () => {
  const products = useMemo(() => generateSalesData(), []);
  
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [selectedPlant, setSelectedPlant] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  const insights = useMemo(() => generateAIInsights(selectedProduct), [selectedProduct]);

  // Calculate metrics
  const latestHistorical = currentProduct.data.find(d => !d.forecast);
  const latestForecast = currentProduct.data[currentProduct.data.length - 1];
  const previousYear = currentProduct.data[currentProduct.data.findIndex(d => d.fiscalYear === latestHistorical?.fiscalYear) - 1];
  
  const yoyGrowth = previousYear 
    ? ((latestHistorical!.sales - previousYear.sales) / previousYear.sales) * 100 
    : 0;

  const totalHistoricalSales = currentProduct.data
    .filter(d => !d.forecast)
    .reduce((sum, d) => sum + d.sales, 0);

  const averageGrowthRate = currentProduct.data
    .filter((d, i) => i > 0 && i < 3)
    .reduce((sum, d, i, arr) => {
      const prev = currentProduct.data[i];
      return sum + ((d.sales - prev.sales) / prev.sales) * 100;
    }, 0) / 2;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">DNHA-M Analytics</h1>
              <p className="text-sm text-muted-foreground">Sales Forecasting Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Insights</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-foreground">
            Sales Trend Analysis (FY23–FY35)
          </h2>
          <p className="text-muted-foreground">
            Long-term sales forecasting to support production planning and strategic investment decisions
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <FilterPanel
              products={products}
              selectedProduct={selectedProduct}
              onProductChange={setSelectedProduct}
              selectedPlant={selectedPlant}
              onPlantChange={setSelectedPlant}
              selectedArea={selectedArea}
              onAreaChange={setSelectedArea}
            />
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Current Sales (FY25)"
                value={`$${(latestHistorical?.sales || 0 / 1000000).toFixed(1)}M`}
                change={yoyGrowth}
                description="Year-over-year growth"
              />
              <MetricCard
                title="Forecasted Sales (FY35)"
                value={`$${(latestForecast.sales / 1000000).toFixed(1)}M`}
                suffix="projected"
                description="10-year forecast"
              />
              <MetricCard
                title="Total Historical Sales"
                value={`$${(totalHistoricalSales / 1000000).toFixed(1)}M`}
                description="FY23-FY25 combined"
              />
              <MetricCard
                title="Avg. Growth Rate"
                value={`${averageGrowthRate.toFixed(1)}%`}
                change={averageGrowthRate}
                description="Historical average"
              />
            </div>

            {/* Chart */}
            <SalesTrendChart
              data={currentProduct.data}
              productName={currentProduct.name}
            />

            {/* AI Insights */}
            <AIInsightsPanel insights={insights} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
