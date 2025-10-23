import { useMemo } from "react";
import { BarChart3, Brain, Home, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { RegionalDemandChart } from "@/components/RegionalDemandChart";
import { PlantUtilizationChart } from "@/components/PlantUtilizationChart";
import { RecommendationMap } from "@/components/RecommendationMap";
import { CapacityInsightsPanel } from "@/components/CapacityInsightsPanel";
import {
  generateRegionData,
  generatePlantCapacity,
  generateCapacityInsights,
  calculateCapacityMetrics,
} from "@/data/capacityData";

const CapacityPlanning = () => {
  const regionData = useMemo(() => generateRegionData(), []);
  const plantData = useMemo(() => generatePlantCapacity(), []);
  const insights = useMemo(() => generateCapacityInsights(), []);
  const metrics = useMemo(() => calculateCapacityMetrics(), []);

  // Find top recommendation
  const topRecommendation = [...regionData].sort(
    (a, b) => b.recommendationScore - a.recommendationScore
  )[0];

  // Calculate total expansion potential
  const totalExpansionPotential = plantData.reduce(
    (sum, plant) => sum + plant.expansionPotential,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Factory className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-medium text-foreground">DNHA-M Analytics</h1>
              <p className="text-sm text-muted-foreground">Capacity Planning & Expansion</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered</span>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Sales Dashboard
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
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-medium text-foreground">
            Capacity Planning & Regional Expansion
          </h2>
          <p className="text-muted-foreground">
            AI-driven recommendations for new area creation and expansion based on demand forecasts,
            logistics costs, and market potential
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Current Supply Capacity"
            value={`${(metrics.totalCurrentSupply / 1000000).toFixed(1)}M`}
            suffix="units/year"
            description="Total regional supply"
          />
          <MetricCard
            title="Demand-Supply Gap"
            value={`${(metrics.demandSupplyGap / 1000000).toFixed(1)}M`}
            change={-metrics.supplyGapPercentage}
            description={`${metrics.supplyGapPercentage.toFixed(1)}% shortage`}
          />
          <MetricCard
            title="Avg. Plant Utilization"
            value={`${metrics.avgUtilization.toFixed(1)}%`}
            change={metrics.avgUtilization - 75}
            description="Across all plants"
          />
          <MetricCard
            title="Expansion Potential"
            value={`${(totalExpansionPotential / 1000000).toFixed(1)}M`}
            suffix="units"
            description="Additional capacity available"
          />
        </div>

        {/* Top Recommendation Banner */}
        <div className="mb-6 rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="mb-2 text-lg font-medium">
                🎯 Top Recommendation: {topRecommendation.name}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                {topRecommendation.country} • Growth Rate: {topRecommendation.growthRate}% CAGR •
                Logistics Cost: ${topRecommendation.logisticsCost}/unit
              </p>
              <p className="max-w-3xl text-sm">
                Based on AI clustering analysis, {topRecommendation.name} presents the highest
                opportunity score ({topRecommendation.recommendationScore}/100) with strong demand
                growth and favorable market conditions.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold text-primary">
                {topRecommendation.recommendationScore}
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <RegionalDemandChart data={regionData} />
            <PlantUtilizationChart data={plantData} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RecommendationMap data={regionData} />
          </div>
        </div>

        {/* AI Insights Panel - Full Width */}
        <div className="mt-6">
          <CapacityInsightsPanel insights={insights} />
        </div>

        {/* Methodology Section */}
        <div className="mt-8 rounded-lg border bg-muted/50 p-6">
          <h3 className="mb-4 text-lg font-medium">Methodology</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-sm">Data Sources</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Sales forecasts from demand prediction model</li>
                <li>• Regional plant capacity and production data</li>
                <li>• Logistics cost analysis by region</li>
                <li>• Market demographics and penetration rates</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-sm">AI Processing</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• K-means clustering for regional segmentation</li>
                <li>• DBSCAN for identifying underserved areas</li>
                <li>• LLM-based reasoning and ROI analysis</li>
                <li>• Multi-factor scoring (demand, cost, growth)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapacityPlanning;
