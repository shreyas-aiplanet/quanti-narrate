import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Home, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  chart?: {
    type: "line" | "bar";
    data: any[];
  };
}

const promptLibrary = [
  {
    id: "growth-trends",
    label: "Growth Trends Analysis",
    prompt: "What are the key growth trends for our products?",
    category: "Analytics"
  },
  {
    id: "forecast-accuracy",
    label: "Forecast Accuracy",
    prompt: "How accurate are the sales forecasts?",
    category: "Analytics"
  },
  {
    id: "market-opportunities",
    label: "Market Opportunities",
    prompt: "What market opportunities should we focus on?",
    category: "Strategy"
  },
  {
    id: "product-comparison",
    label: "Product Comparison",
    prompt: "Compare performance across different products",
    category: "Analytics"
  },
  {
    id: "regional-analysis",
    label: "Regional Performance",
    prompt: "Which regions are performing best and why?",
    category: "Analytics"
  },
  {
    id: "capacity-planning",
    label: "Capacity Planning",
    prompt: "What are the capacity planning recommendations for FY26-FY30?",
    category: "Strategy"
  },
  {
    id: "risk-assessment",
    label: "Risk Assessment",
    prompt: "What are the key risks in our sales forecasts?",
    category: "Risk"
  },
  {
    id: "electrification-trend",
    label: "Electrification Trends",
    prompt: "How is the electrification segment performing and what's the outlook?",
    category: "Analytics"
  },
  {
    id: "export-strategy",
    label: "Export Strategy",
    prompt: "What export markets should we prioritize?",
    category: "Strategy"
  },
  {
    id: "seasonal-patterns",
    label: "Seasonal Patterns",
    prompt: "What seasonal patterns exist in our sales data?",
    category: "Analytics"
  },
  {
    id: "revenue-projections",
    label: "Revenue Projections",
    prompt: "What are the projected revenues for the next 5 years by product category?",
    category: "Analytics"
  },
  {
    id: "market-share",
    label: "Market Share Analysis",
    prompt: "How does our market share compare across different regions?",
    category: "Analytics"
  },
  {
    id: "supply-chain",
    label: "Supply Chain Insights",
    prompt: "What supply chain optimizations can support our growth?",
    category: "Operations"
  },
  {
    id: "cost-efficiency",
    label: "Cost Efficiency",
    prompt: "How can we improve operational efficiency and reduce costs?",
    category: "Operations"
  },
  {
    id: "investment-priority",
    label: "Investment Priorities",
    prompt: "What areas should we prioritize for capital investment?",
    category: "Strategy"
  },
  {
    id: "product-lifecycle",
    label: "Product Lifecycle",
    prompt: "Which products are in growth vs. maturity phases?",
    category: "Analytics"
  },
  {
    id: "demand-forecasting",
    label: "Demand Forecasting",
    prompt: "What demand patterns should we prepare for in FY26?",
    category: "Analytics"
  },
  {
    id: "competitor-landscape",
    label: "Competitive Landscape",
    prompt: "What competitive threats should we be aware of?",
    category: "Risk"
  },
  {
    id: "customer-segments",
    label: "Customer Segmentation",
    prompt: "Which customer segments show the highest potential?",
    category: "Strategy"
  },
  {
    id: "production-planning",
    label: "Production Planning",
    prompt: "How should we align production with forecasted demand?",
    category: "Operations"
  },
  {
    id: "margin-analysis",
    label: "Margin Analysis",
    prompt: "Which products offer the best profit margins?",
    category: "Analytics"
  },
  {
    id: "market-volatility",
    label: "Market Volatility",
    prompt: "How should we manage market volatility risks?",
    category: "Risk"
  },
  {
    id: "technology-trends",
    label: "Technology Trends",
    prompt: "What emerging technology trends will impact our products?",
    category: "Strategy"
  },
  {
    id: "plant-utilization",
    label: "Plant Utilization",
    prompt: "How can we optimize plant capacity utilization?",
    category: "Operations"
  },
  {
    id: "new-market-entry",
    label: "New Market Entry",
    prompt: "What new markets should we consider entering?",
    category: "Strategy"
  },
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! 👋 I'm your **AI Sales Analytics Assistant**. I can help you understand:\n\n- 📈 Sales trends and growth patterns\n- 🔮 Forecast accuracy and predictions\n- 🎯 Market opportunities and expansion strategies\n- 📊 Product performance comparisons\n\nSelect a prompt below or ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response with hardcoded answers
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const generateResponse = (prompt: string): Message => {
    const lowerPrompt = prompt.toLowerCase();

    // Growth Trends Response
    if (lowerPrompt.includes("growth") || lowerPrompt.includes("trend")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Based on the analysis of historical data from FY19 to FY25, here are the key growth trends:

**Electrification Products** are showing the strongest growth at 15% YoY, driven by the global shift towards electric vehicles. The ECU for electrification segment is leading this growth.

**Power train Products** maintain steady growth at 11% YoY, with UC Injector and ACG/ACG-S showing particularly strong performance.

**Regional Performance**: Asia Pacific continues to be the fastest-growing market with 40% higher growth rates compared to other regions.

Here's a visual representation of the growth trends:`,
        chart: {
          type: "line",
          data: [
            { year: "FY19", Electrification: 18, PowerTrain: 14, Components: 12 },
            { year: "FY20", Electrification: 20, PowerTrain: 15, Components: 13 },
            { year: "FY21", Electrification: 23, PowerTrain: 16, Components: 13.5 },
            { year: "FY22", Electrification: 27, PowerTrain: 17, Components: 14 },
            { year: "FY23", Electrification: 31, PowerTrain: 18, Components: 14.5 },
            { year: "FY24", Electrification: 36, PowerTrain: 20, Components: 15 },
            { year: "FY25", Electrification: 42, PowerTrain: 22, Components: 16 },
          ],
        },
      };
    }

    // Forecast Accuracy Response
    if (lowerPrompt.includes("forecast") || lowerPrompt.includes("accuracy")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Our AI-powered forecasting model demonstrates strong accuracy:

**Historical Validation**: When tested against actual FY24-FY25 data, the model showed:
- 92% accuracy for short-term forecasts (1-2 years)
- 87% accuracy for mid-term forecasts (3-5 years)
- 78% accuracy for long-term forecasts (6-10 years)

**Key Factors in Forecast**:
- Historical sales patterns and seasonality
- Market trends and industry growth rates
- Regional economic indicators
- Product lifecycle stages

**Confidence Intervals**: All forecasts include confidence ranges that account for market uncertainty, with ranges widening for longer-term predictions.

Here's the forecast accuracy by product category:`,
        chart: {
          type: "bar",
          data: [
            { category: "Electrification", "1-2 Years": 94, "3-5 Years": 89, "6-10 Years": 81 },
            { category: "Power train", "1-2 Years": 92, "3-5 Years": 87, "6-10 Years": 78 },
            { category: "Components", "1-2 Years": 90, "3-5 Years": 85, "6-10 Years": 75 },
          ],
        },
      };
    }

    // Market Opportunities Response
    if (lowerPrompt.includes("opportunit") || lowerPrompt.includes("market")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `I've identified several high-potential market opportunities:

**1. Electrification Expansion**
The EV market is projected to grow 15% annually through FY35. Consider:
- Doubling production capacity for ECU (Electrification) by FY30
- Investing in next-gen inverter technology
- Expanding into emerging EV markets in Southeast Asia

**2. Asia Pacific Growth**
This region shows 30% higher demand growth:
- Target markets: India, Indonesia, Vietnam
- Potential revenue increase: $50M+ by FY32
- ROI timeline: 2-3 years

**3. Export Market Development**
Current export products show strong margins with untapped potential:
- 20% additional revenue possible by FY30
- Focus on North America and Europe markets
- Low competition in specialized components

Here's the opportunity size by region:`,
        chart: {
          type: "bar",
          data: [
            { region: "Asia Pacific", "Current ($M)": 45, "Potential ($M)": 72 },
            { region: "North America", "Current ($M)": 38, "Potential ($M)": 52 },
            { region: "Europe", "Current ($M)": 35, "Potential ($M)": 48 },
            { region: "Latin America", "Current ($M)": 22, "Potential ($M)": 35 },
          ],
        },
      };
    }

    // Product Comparison Response
    if (lowerPrompt.includes("compar") || lowerPrompt.includes("product")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Here's a comprehensive comparison of product performance:

**Top Performers**:
1. **ECU (Electrification)** - 15% YoY growth, highest margins
2. **ECU (Mobility)** - 13% YoY growth, strong market position
3. **Export Products** - 14% YoY growth, expanding globally

**Steady Performers**:
- UC Injector, ACG/ACG-S, 2W ECU - All showing 11-12% growth
- Motor, Alternator - Stable 10% growth

**Areas for Improvement**:
- Thermal products - 7-8% growth, below category average
- Consider product refresh or market repositioning

**Strategic Recommendations**:
- Increase investment in Electrification segment
- Maintain strong support for Mobility products
- Evaluate optimization opportunities for slower-growth products

Product performance comparison (FY25 Sales):`,
        chart: {
          type: "bar",
          data: [
            { product: "ECU (Elec.)", sales: 42, growth: 15 },
            { product: "ECU (Mob.)", sales: 35, growth: 13 },
            { product: "Export", sales: 32, growth: 14 },
            { product: "UC Injector", sales: 28, growth: 11 },
            { product: "ACG/ACG-S", sales: 26, growth: 11 },
            { product: "Motor", sales: 24, growth: 10 },
          ],
        },
      };
    }

    // Revenue Projections Response
    if (lowerPrompt.includes("revenue") || lowerPrompt.includes("projection")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Here are the revenue projections for the next 5 years by product category:

**Electrification Products** (FY26-FY30):
- FY26: $48M (15% growth)
- FY27: $55M (15% growth)
- FY28: $63M (15% growth)
- FY29: $72M (14% growth)
- FY30: $82M (14% growth)
- **Total 5-Year Revenue**: $320M

**Power Train Products** (FY26-FY30):
- FY26: $24M (11% growth)
- FY27: $27M (11% growth)
- FY28: $30M (10% growth)
- FY29: $33M (10% growth)
- FY30: $36M (10% growth)
- **Total 5-Year Revenue**: $150M

**Key Insights**:
- Electrification segment will account for 52% of total revenue growth
- Combined 5-year revenue projection: $470M+
- Highest growth period: FY26-FY28

Revenue projection by category:`,
        chart: {
          type: "line",
          data: [
            { year: "FY26", Electrification: 48, PowerTrain: 24, Components: 17 },
            { year: "FY27", Electrification: 55, PowerTrain: 27, Components: 18 },
            { year: "FY28", Electrification: 63, PowerTrain: 30, Components: 19 },
            { year: "FY29", Electrification: 72, PowerTrain: 33, Components: 20 },
            { year: "FY30", Electrification: 82, PowerTrain: 36, Components: 21 },
          ],
        },
      };
    }

    // Supply Chain Response
    if (lowerPrompt.includes("supply") || lowerPrompt.includes("chain")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Based on our growth projections, here are key supply chain optimizations:

**Immediate Priorities (FY26)**:
1. **Electrification Components** - Secure additional suppliers
   - Expected demand increase: 15%
   - Lead time reduction needed: 2 weeks
   - Supplier diversification recommended

2. **Raw Material Inventory** - Optimize stock levels
   - Reduce holding costs by 12%
   - Implement JIT for high-volume components
   - Strategic stockpiling for critical materials

3. **Logistics Network** - Expand distribution
   - Add 2 regional distribution centers
   - Reduce transportation costs by 8%
   - Improve delivery times by 15%

**Medium-Term Improvements (FY27-FY28)**:
- Implement predictive analytics for demand planning
- Establish vendor-managed inventory systems
- Develop alternative sourcing strategies for critical components

**Expected Benefits**:
- Cost reduction: $3-5M annually
- Improved service levels: 95%+ on-time delivery
- Enhanced flexibility for demand surges`,
      };
    }

    // Investment Priorities Response
    if (lowerPrompt.includes("investment") || lowerPrompt.includes("capital")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Recommended capital investment priorities based on ROI and strategic value:

**Tier 1 - High Priority** (Invest FY26):
1. **Electrification Manufacturing Capacity** - $25M
   - ROI: 3.2 years
   - Expected revenue impact: $15M/year by FY28
   - Addresses fastest-growing segment

2. **Automation & Industry 4.0** - $12M
   - ROI: 2.8 years
   - Efficiency gains: 20%
   - Quality improvement: 15%

**Tier 2 - Medium Priority** (Invest FY27):
3. **R&D Facilities** - $8M
   - Focus on next-gen EV components
   - Time to market reduction: 25%
   - Innovation pipeline development

4. **Asia Pacific Distribution** - $6M
   - Market access expansion
   - Revenue growth: $8M/year by FY29

**Tier 3 - Strategic Priority** (Invest FY28):
5. **Digital Infrastructure** - $5M
   - Data analytics platform
   - AI/ML capabilities
   - Decision support systems

**Total Recommended Investment**: $56M over 3 years
**Expected Return**: $40M+ annual revenue increase by FY30`,
        chart: {
          type: "bar",
          data: [
            { category: "Electrification Capacity", "Investment ($M)": 25, "Expected ROI (Years)": 3.2 },
            { category: "Automation", "Investment ($M)": 12, "Expected ROI (Years)": 2.8 },
            { category: "R&D", "Investment ($M)": 8, "Expected ROI (Years)": 4.1 },
            { category: "Distribution", "Investment ($M)": 6, "Expected ROI (Years)": 3.5 },
            { category: "Digital", "Investment ($M)": 5, "Expected ROI (Years)": 4.5 },
          ],
        },
      };
    }

    // Plant Utilization Response
    if (lowerPrompt.includes("plant") || lowerPrompt.includes("utilization") || lowerPrompt.includes("capacity")) {
      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Plant capacity utilization analysis and optimization recommendations:

**Current Utilization (FY25)**:
- **Plant A (Electrification)**: 78% - Nearing capacity
- **Plant B (Power Train)**: 65% - Moderate utilization
- **Plant C (Components)**: 58% - Underutilized

**Optimization Strategies**:

**Short-term (FY26)**:
1. **Shift Production** to Plant C
   - Move 15% of Component production from Plant B
   - Improve overall efficiency by 8%
   - Reduce operational costs: $1.2M

2. **Add Shifts** at Plant A
   - Implement 3rd shift for high-demand products
   - Increase capacity by 25%
   - Investment required: $800K

**Medium-term (FY27-FY28)**:
3. **Equipment Upgrades** at Plant B
   - Modernize production lines
   - Increase throughput by 20%
   - Automation benefits: 15% labor cost reduction

4. **Flexible Manufacturing** at Plant C
   - Cross-train workforce
   - Enable multi-product production
   - Increase utilization to 75%+

**Expected Results by FY28**:
- Average utilization: 82%
- Cost savings: $4M annually
- Increased capacity: 30% without new facilities

Current plant utilization:`,
        chart: {
          type: "bar",
          data: [
            { plant: "Plant A", "Current (%)": 78, "Target (%)": 85 },
            { plant: "Plant B", "Current (%)": 65, "Target (%)": 80 },
            { plant: "Plant C", "Current (%)": 58, "Target (%)": 75 },
          ],
        },
      };
    }

    // Default response
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: `I can help you with:

- **Sales Forecasting**: Understanding future trends and projections
- **Growth Analysis**: Identifying which products and markets are growing fastest
- **Market Opportunities**: Discovering untapped potential in various regions
- **Product Comparisons**: Comparing performance across different product lines
- **Strategic Insights**: Recommendations for capacity planning and investment
- **Operational Excellence**: Supply chain, plant utilization, and efficiency
- **Risk Management**: Market volatility and competitive threats

Try asking about growth trends, forecast accuracy, market opportunities, product comparisons, revenue projections, or select one of the suggested prompts!`,
    };
  };

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
              <h1 className="text-xl font-medium text-foreground">AI Chat Assistant</h1>
              <p className="text-sm text-muted-foreground">Sales Analytics & Insights</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
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
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Chat Sessions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Chat Sessions</CardTitle>
                <CardDescription>Your conversation history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="rounded-lg border bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Current Session</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {messages.length} message{messages.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-12rem)]">
              <CardHeader>
                <CardTitle>AI Sales Assistant</CardTitle>
                <CardDescription>Ask questions about your sales data and forecasts</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[calc(100%-5rem)] flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-4 py-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant={message.role === "user" ? "secondary" : "outline"}>
                              {message.role === "user" ? "You" : "AI Assistant"}
                            </Badge>
                          </div>
                          <div className={`prose prose-sm max-w-none ${
                            message.role === "user"
                              ? "prose-invert"
                              : "prose-slate"
                          }`}>
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({ node, ...props }) => <h1 className="text-lg font-bold mt-2 mb-2" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-base font-bold mt-2 mb-1" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-sm font-semibold mt-2 mb-1" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                                li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                em: ({ node, ...props }) => <em className="italic" {...props} />,
                                code: ({ node, ...props }) => <code className="bg-muted px-1 py-0.5 rounded text-xs" {...props} />,
                                a: ({ node, ...props }) => <a className="text-primary underline" {...props} />,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                          {message.chart && (
                            <div className="mt-4 h-[300px] w-full rounded-lg bg-card p-4">
                              <ResponsiveContainer width="100%" height="100%">
                                {message.chart.type === "line" ? (
                                  <LineChart data={message.chart.data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                      type="monotone"
                                      dataKey="Electrification"
                                      stroke="#8b5cf6"
                                      strokeWidth={2}
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="PowerTrain"
                                      stroke="#3b82f6"
                                      strokeWidth={2}
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="Components"
                                      stroke="#10b981"
                                      strokeWidth={2}
                                    />
                                  </LineChart>
                                ) : (
                                  <BarChart data={message.chart.data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey={
                                        message.chart.data[0].category
                                          ? "category"
                                          : message.chart.data[0].region
                                          ? "region"
                                          : "product"
                                      }
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {Object.keys(message.chart.data[0])
                                      .filter(
                                        (key) =>
                                          key !== "category" &&
                                          key !== "region" &&
                                          key !== "product"
                                      )
                                      .map((key, index) => (
                                        <Bar
                                          key={key}
                                          dataKey={key}
                                          fill={
                                            ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"][
                                              index % 4
                                            ]
                                          }
                                        />
                                      ))}
                                  </BarChart>
                                )}
                              </ResponsiveContainer>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="mt-4 flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about sales trends, forecasts, or opportunities..."
                    className="flex-1"
                  />
                  <Button onClick={() => handleSendMessage()} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prompt Library Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-12rem)]">
              <CardHeader>
                <CardTitle className="text-base">Prompt Library</CardTitle>
                <CardDescription>Quick questions to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                  <div className="space-y-3">
                    {/* Analytics Category */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Analytics</h3>
                      {promptLibrary
                        .filter(item => item.category === "Analytics")
                        .map((item) => (
                          <Button
                            key={item.id}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => handlePromptClick(item.prompt)}
                          >
                            <Sparkles className="mr-2 h-3 w-3 flex-shrink-0 text-primary" />
                            <span className="text-xs leading-tight">{item.label}</span>
                          </Button>
                        ))}
                    </div>

                    {/* Strategy Category */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Strategy</h3>
                      {promptLibrary
                        .filter(item => item.category === "Strategy")
                        .map((item) => (
                          <Button
                            key={item.id}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => handlePromptClick(item.prompt)}
                          >
                            <Sparkles className="mr-2 h-3 w-3 flex-shrink-0 text-primary" />
                            <span className="text-xs leading-tight">{item.label}</span>
                          </Button>
                        ))}
                    </div>

                    {/* Risk Category */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Risk</h3>
                      {promptLibrary
                        .filter(item => item.category === "Risk")
                        .map((item) => (
                          <Button
                            key={item.id}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => handlePromptClick(item.prompt)}
                          >
                            <Sparkles className="mr-2 h-3 w-3 flex-shrink-0 text-primary" />
                            <span className="text-xs leading-tight">{item.label}</span>
                          </Button>
                        ))}
                    </div>

                    {/* Operations Category */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Operations</h3>
                      {promptLibrary
                        .filter(item => item.category === "Operations")
                        .map((item) => (
                          <Button
                            key={item.id}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => handlePromptClick(item.prompt)}
                          >
                            <Sparkles className="mr-2 h-3 w-3 flex-shrink-0 text-primary" />
                            <span className="text-xs leading-tight">{item.label}</span>
                          </Button>
                        ))}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
