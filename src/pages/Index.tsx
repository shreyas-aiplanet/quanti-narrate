import { useState, useMemo } from "react";
import { BarChart3, Brain } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { SalesTrendChart } from "@/components/SalesTrendChart";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { FilterPanel } from "@/components/FilterPanel";
import { generateSalesData, generateAIInsights } from "@/data/salesData";

const Index = () => {
  const allData = useMemo(() => generateSalesData(), []);
  
  // Get unique products for the filter
  const uniqueProducts = useMemo(() => {
    const seen = new Set();
    return allData.filter(item => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
  }, [allData]);
  
  const [selectedProduct, setSelectedProduct] = useState(uniqueProducts[0].name);
  const [selectedPlant, setSelectedPlant] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");

  // Filter and aggregate data based on selections
  const filteredData = useMemo(() => {
    return allData.filter(item => {
      const matchesProduct = item.name === selectedProduct;
      const matchesPlant = selectedPlant === "all" || item.plant === selectedPlant;
      const matchesArea = selectedArea === "all" || item.area === selectedArea;
      return matchesProduct && matchesPlant && matchesArea;
    });
  }, [allData, selectedProduct, selectedPlant, selectedArea]);

  // Aggregate sales data across filtered items
  const currentProduct = useMemo(() => {
    if (filteredData.length === 0) return uniqueProducts[0];
    
    // Aggregate sales by fiscal year
    const aggregatedData = new Map<string, { sales: number; count: number; forecast: boolean; lower?: number; upper?: number }>();
    
    filteredData.forEach(item => {
      item.data.forEach(point => {
        const existing = aggregatedData.get(point.fiscalYear);
        if (existing) {
          existing.sales += point.sales;
          existing.count += 1;
          if (point.confidence) {
            existing.lower = (existing.lower || 0) + point.confidence.lower;
            existing.upper = (existing.upper || 0) + point.confidence.upper;
          }
        } else {
          aggregatedData.set(point.fiscalYear, {
            sales: point.sales,
            count: 1,
            forecast: point.forecast || false,
            lower: point.confidence?.lower,
            upper: point.confidence?.upper,
          });
        }
      });
    });

    const data = Array.from(aggregatedData.entries())
      .map(([fiscalYear, values]) => ({
        fiscalYear,
        sales: values.sales,
        forecast: values.forecast,
        confidence: values.lower && values.upper ? {
          lower: values.lower,
          upper: values.upper,
        } : undefined,
      }))
      .sort((a, b) => a.fiscalYear.localeCompare(b.fiscalYear));

    return {
      id: filteredData[0].id,
      name: selectedProduct,
      category: filteredData[0].category,
      plant: selectedPlant,
      area: selectedArea,
      data,
    };
  }, [filteredData, selectedProduct, selectedPlant, selectedArea, uniqueProducts]);

  const insights = useMemo(() => generateAIInsights(currentProduct.id.split('-')[0]), [currentProduct.id]);

  // Calculate metrics
  const historicalData = currentProduct.data.filter(d => !d.forecast);
  const latestHistorical = historicalData[historicalData.length - 1];
  const latestForecast = currentProduct.data[currentProduct.data.length - 1];
  const previousYear = historicalData[historicalData.length - 2];
  
  const yoyGrowth = previousYear && latestHistorical
    ? ((latestHistorical.sales - previousYear.sales) / previousYear.sales) * 100 
    : 0;

  const totalHistoricalSales = historicalData.reduce((sum, d) => sum + d.sales, 0);

  const averageGrowthRate = historicalData.length > 1
    ? historicalData.slice(1).reduce((sum, d, i) => {
        const prev = historicalData[i];
        return sum + ((d.sales - prev.sales) / prev.sales) * 100;
      }, 0) / (historicalData.length - 1)
    : 0;

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
            Sales Trend Analysis (FY19–FY35)
          </h2>
          <p className="text-muted-foreground">
            Long-term sales forecasting to support production planning and strategic investment decisions
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <FilterPanel
              products={uniqueProducts}
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
                value={`$${((latestHistorical?.sales || 0) / 1000000).toFixed(1)}M`}
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
                description="FY19-FY25 combined"
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
