import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RegionData } from "@/data/capacityData";
import { MapPin, TrendingUp, DollarSign, Users } from "lucide-react";

interface RecommendationMapProps {
  data: RegionData[];
}

export const RecommendationMap = ({ data }: RecommendationMapProps) => {
  // Sort regions by recommendation score
  const sortedRegions = [...data].sort((a, b) => b.recommendationScore - a.recommendationScore);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'default';
    if (score >= 70) return 'secondary';
    return 'outline';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Expansion Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedRegions.map((region, index) => (
            <div
              key={region.id}
              className="rounded-lg border bg-card p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">{region.name}</h4>
                    <Badge variant={getScoreBadge(region.recommendationScore)}>
                      Rank #{index + 1}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{region.country}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="font-medium">{region.growthRate}% CAGR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3.5 w-3.5 text-blue-600" />
                      <span className="text-muted-foreground">Logistics:</span>
                      <span className="font-medium">${region.logisticsCost}/unit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-purple-600" />
                      <span className="text-muted-foreground">Market Penetration:</span>
                      <span className="font-medium">{region.marketPenetration}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Competition:</span>
                      <Badge variant="outline" className="capitalize">
                        {region.competitionLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Demand Gap:</span>
                    <span className="text-xs font-medium text-destructive">
                      {((region.currentDemand - region.currentSupply) / 1000000).toFixed(1)}M units
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getScoreColor(region.recommendationScore)}`} />
                    <span className="text-2xl font-semibold">{region.recommendationScore}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Score</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
