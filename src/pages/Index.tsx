import { useState, useMemo, useEffect } from "react";
import { BarChart3, Brain, Home, Factory, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/MetricCard";
import { SalesTrendChart } from "@/components/SalesTrendChart";
import { FilterPanel } from "@/components/FilterPanel";
import { ForecastDataTable } from "@/components/ForecastDataTable";
import { InsightsCard } from "@/components/InsightsCard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { generateSalesData, generateAIInsights } from "@/data/salesData";
import { MessageCircle } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [tableViewProduct, setTableViewProduct] = useState(uniqueProducts[0].name);
  const [showForecast, setShowForecast] = useState(false);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);

  // Handle initial data loading
  const handleLoadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDataLoaded(true);
      setIsLoading(false);
    }, 2500); // 2.5 seconds
  };

  // Handle switching to dashboard view
  const handleShowDashboard = () => {
    setShowDashboard(true);
  };

  // Handle filter changes with loading delay
  const handleProductChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProduct(value);
      setIsLoading(false);
    }, 5000);
  };

  const handlePlantChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedPlant(value);
      setIsLoading(false);
    }, 5000);
  };

  const handleAreaChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedArea(value);
      setIsLoading(false);
    }, 5000);
  };

  const handleCategoryChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(value);
      setIsLoading(false);
    }, 5000);
  };

  const handleGenerateForecast = async () => {
    setIsLoadingForecast(true);
    // Simulate loading time for forecast generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoadingForecast(false);
    setShowForecast(true);
  };

  // Filter and aggregate data based on selections
  const filteredData = useMemo(() => {
    return allData.filter(item => {
      const matchesProduct = item.name === selectedProduct;
      const matchesPlant = selectedPlant === "all" || item.plant === selectedPlant;
      const matchesArea = selectedArea === "all" || item.area === selectedArea;
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesProduct && matchesPlant && matchesArea && matchesCategory;
    });
  }, [allData, selectedProduct, selectedPlant, selectedArea, selectedCategory]);

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

  // Show initial load button if data not loaded
  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-background">
        {isLoading && <LoadingScreen />}
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-foreground">DNHA-M Analytics</h1>
                <p className="text-sm text-muted-foreground">Sales Forecasting Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">AI-Powered</span>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="flex min-h-[70vh] flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="rounded-full bg-primary/10 p-6">
                <BarChart3 className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-medium text-foreground">
                  Sales Analytics Dashboard
                </h2>
                <p className="text-lg text-muted-foreground max-w-md">
                  AI-powered sales forecasting and analytics to support production planning and strategic decision-making
                </p>
              </div>
              <Button
                onClick={handleLoadData}
                size="lg"
                className="mt-4"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Load Sales Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show table view after data is loaded but before dashboard
  if (dataLoaded && !showDashboard) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-foreground">DNHA-M Analytics</h1>
                <p className="text-sm text-muted-foreground">Sales Forecasting Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">AI-Powered</span>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Page Title */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-medium text-foreground">
                Historical Sales Data
              </h2>
              <p className="text-muted-foreground">
                Actual sales data across all products, plants, and geographical areas
              </p>
            </div>
            <Button onClick={handleShowDashboard} size="lg">
              <BarChart3 className="mr-2 h-5 w-5" />
              View Analytics Dashboard
            </Button>
          </div>

          {/* Product Selector */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground">
                Select Product:
              </label>
              <Select value={tableViewProduct} onValueChange={setTableViewProduct}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {uniqueProducts.map((product) => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table View */}
          <Card>
            <CardHeader>
              <CardTitle>{tableViewProduct}</CardTitle>
              <CardDescription>
                Category: {uniqueProducts.find(p => p.name === tableViewProduct)?.category}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plant</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Fiscal Year</TableHead>
                      <TableHead className="text-right">Sales ($M)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allData
                      .filter(item => item.name === tableViewProduct)
                      .flatMap((item) =>
                        item.data
                          .filter((dataPoint) => !dataPoint.forecast)
                          .map((dataPoint, idx) => (
                            <TableRow key={`${item.id}-${idx}`}>
                              <TableCell className="font-medium">{item.plant}</TableCell>
                              <TableCell>{item.area}</TableCell>
                              <TableCell>{dataPoint.fiscalYear}</TableCell>
                              <TableCell className="text-right">
                                ${(dataPoint.sales / 1000000).toFixed(2)}M
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingScreen />}
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-medium text-foreground">DNHA-M Analytics</h1>
              <p className="text-sm text-muted-foreground">Sales Forecasting Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered</span>
            </div>
            <Link to="/capacity-planning">
              <Button variant="default" size="sm">
                <Factory className="mr-2 h-4 w-4" />
                Capacity Planning
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-medium text-foreground">
              Sales Analytics Dashboard
            </h2>
            <p className="text-muted-foreground">
              AI-powered sales forecasting and analytics to support production planning and strategic decision-making
            </p>
          </div>
          {!showForecast && (
            <Button
              onClick={handleGenerateForecast}
              disabled={isLoadingForecast}
              size="lg"
              className="ml-4"
            >
              {isLoadingForecast ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Forecast"
              )}
            </Button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <FilterPanel
              products={uniqueProducts}
              selectedProduct={selectedProduct}
              onProductChange={handleProductChange}
              selectedPlant={selectedPlant}
              onPlantChange={handlePlantChange}
              selectedArea={selectedArea}
              onAreaChange={handleAreaChange}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
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

            {/* Forecast Table on Top */}
            <ForecastDataTable data={currentProduct.data} showForecast={showForecast} />

            {/* Chart and Insights Side by Side */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <SalesTrendChart
                  data={currentProduct.data}
                  productName={currentProduct.name}
                  showForecast={showForecast}
                  onForecastToggle={setShowForecast}
                />
              </div>
              <div className="lg:col-span-1">
                <InsightsCard insights={insights} />
              </div>
            </div>

            {/* AI Chat Button */}
            <div className="flex justify-center pt-4">
              <Link to="/ai-chat">
                <Button size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Chat Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
