import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Brain, ArrowRight, Factory } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-medium text-foreground">DNHA-M Analytics</span>
          </div>
          <Link to="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-medium text-foreground">
            Sales Forecasting Platform
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            AI-powered analytics for production planning and strategic investment decisions. 
            Get accurate sales forecasts from FY19 to FY35 with real-time insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Sales Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/capacity-planning">
              <Button size="lg" variant="outline" className="gap-2">
                <Factory className="h-5 w-5" />
                Capacity Planning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              Long-term Forecasting
            </h3>
            <p className="text-sm text-muted-foreground">
              10+ year sales projections with confidence intervals to support strategic planning
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              AI-Powered Insights
            </h3>
            <p className="text-sm text-muted-foreground">
              Get intelligent recommendations and trend analysis from our AI assistant
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border">
              <Factory className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              Capacity Planning
            </h3>
            <p className="text-sm text-muted-foreground">
              Identify expansion opportunities and optimize plant utilization with AI clustering
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              Multi-dimensional Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Filter and analyze data by product, plant, region, and time period
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          DNHA-M Analytics Platform © 2025
        </div>
      </footer>
    </div>
  );
};

export default Landing;
