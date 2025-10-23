import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Settings,
  Send,
  DollarSign,
  Clock,
} from "lucide-react";
import { CapacityInsight } from "@/data/capacityData";

interface CapacityInsightsPanelProps {
  insights: CapacityInsight[];
}

export const CapacityInsightsPanel = ({ insights }: CapacityInsightsPanelProps) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; text: string }>>([
    {
      type: 'assistant',
      text: 'Hello! I can help you understand capacity planning recommendations. Try asking: "Why is Southeast Asia recommended?" or "What are the expansion opportunities?"'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'new-region':
        return <MapPin className="h-5 w-5" />;
      case 'expansion':
        return <TrendingUp className="h-5 w-5" />;
      case 'optimization':
        return <Settings className="h-5 w-5" />;
      case 'risk':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new-region':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'expansion':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'optimization':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'risk':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary',
    };
    return variants[priority] || 'default';
  };

  const handleQuery = () => {
    if (!query.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: query }]);

    // Simple AI response logic
    setTimeout(() => {
      let response = '';

      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('southeast asia') || lowerQuery.includes('vietnam') || lowerQuery.includes('thailand')) {
        const insight = insights.find(i => i.region === 'Southeast Asia');
        response = insight ? insight.reasoning : 'Southeast Asia shows strong potential with 12.5% CAGR and low logistics costs.';
      } else if (lowerQuery.includes('expansion') || lowerQuery.includes('opportunities')) {
        response = 'Top expansion opportunities include: 1) Southeast Asia (ROI: 24.5%), 2) East Plant expansion (ROI: 18.3%), and 3) Central Asia/India (ROI: 21.2%). All show strong market fundamentals.';
      } else if (lowerQuery.includes('roi') || lowerQuery.includes('return')) {
        response = 'Expected ROI ranges from 18.3% to 24.5% across major initiatives. Southeast Asia offers the highest ROI at 24.5% with 18-24 month time to market.';
      } else if (lowerQuery.includes('cost') || lowerQuery.includes('investment')) {
        response = 'Investment requirements range from $22M (East Plant expansion) to $52M (India market entry). Total capital needed for all high-priority initiatives: approximately $119M.';
      } else if (lowerQuery.includes('africa') || lowerQuery.includes('nigeria')) {
        const insight = insights.find(i => i.region === 'West Africa');
        response = insight ? insight.reasoning : 'West Africa shows highest growth rate at 15.2% CAGR but faces higher logistics costs.';
      } else {
        response = 'Based on demand forecasts and logistics analysis, I recommend prioritizing: 1) Southeast Asia expansion, 2) East Plant capacity increase, and 3) India market entry. These offer the best balance of ROI, market potential, and operational efficiency.';
      }

      setMessages(prev => [...prev, { type: 'assistant', text: response }]);
    }, 500);

    setQuery('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI-Powered Capacity Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Insights List */}
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`rounded-lg border p-4 ${getTypeColor(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIcon(insight.type)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium leading-tight">{insight.title}</h4>
                      <Badge variant={getPriorityBadge(insight.priority)} className="capitalize shrink-0">
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-90">{insight.description}</p>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5" />
                        <span className="font-medium">ROI: {insight.expectedROI}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{insight.timeToMarket}</span>
                      </div>
                    </div>

                    {insight.investmentRequired > 0 && (
                      <div className="text-sm pt-1">
                        <span className="opacity-75">Investment: </span>
                        <span className="font-medium">
                          ${(insight.investmentRequired / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    )}

                    <details className="pt-2">
                      <summary className="cursor-pointer text-sm font-medium hover:underline">
                        View Reasoning
                      </summary>
                      <p className="mt-2 text-sm opacity-75">{insight.reasoning}</p>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Chat Interface */}
          <div className="border-t pt-4">
            <h4 className="mb-3 text-sm font-medium">Ask AI Assistant</h4>
            <div className="mb-3 max-h-48 space-y-2 overflow-y-auto rounded-lg bg-muted/50 p-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded px-3 py-2 text-sm ${
                    msg.type === 'user'
                      ? 'ml-8 bg-primary text-primary-foreground'
                      : 'mr-8 bg-card'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask about capacity recommendations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
              />
              <Button onClick={handleQuery} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
