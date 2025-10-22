export interface SalesDataPoint {
  fiscalYear: string;
  sales: number;
  forecast?: boolean;
  confidence?: {
    lower: number;
    upper: number;
  };
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  plant: string;
  area: string;
  data: SalesDataPoint[];
}

// Generate realistic sales data with seasonal patterns and growth trends
export const generateSalesData = (): ProductData[] => {
  const products = [
    { id: 'prod-a', name: 'Product A - Industrial Components', category: 'Industrial', baseValue: 12000000, growth: 0.09 },
    { id: 'prod-b', name: 'Product B - Consumer Goods', category: 'Consumer', baseValue: 20000000, growth: 0.13 },
    { id: 'prod-c', name: 'Product C - Raw Materials', category: 'Materials', baseValue: 15000000, growth: 0.07 },
    { id: 'prod-d', name: 'Product D - Finished Goods', category: 'Finished', baseValue: 25000000, growth: 0.11 },
  ];

  const plantMultipliers: Record<string, number> = {
    'plant-1': 1.2,  // North Plant - Higher capacity
    'plant-2': 0.9,  // South Plant - Smaller operations
    'plant-3': 1.1,  // East Plant - Medium capacity
    'plant-4': 0.85, // West Plant - Newer facility
  };

  const areaMultipliers: Record<string, number> = {
    'area-1': 1.3,  // North America - Largest market
    'area-2': 1.1,  // Europe - Mature market
    'area-3': 1.4,  // Asia Pacific - Growing market
    'area-4': 0.8,  // Latin America - Emerging market
  };

  const results: ProductData[] = [];

  products.forEach(product => {
    plants.forEach(plant => {
      areas.forEach(area => {
        const plantMultiplier = plantMultipliers[plant.id];
        const areaMultiplier = areaMultipliers[area.id];
        const baseValue = product.baseValue * plantMultiplier * areaMultiplier;
        
        // Add product-specific variations
        const productVariation = product.id === 'prod-b' ? 1.15 : 
                                 product.id === 'prod-d' ? 1.1 : 1.0;
        
        const data: SalesDataPoint[] = [];
        
        // Historical data (FY19-FY25) - 7 years of actual data
        for (let year = 19; year <= 25; year++) {
          const yearIndex = year - 19;
          const baseGrowth = Math.pow(1 + product.growth, yearIndex);
          const seasonalVariation = Math.sin(yearIndex * Math.PI / 3) * 0.08 + 1;
          const cyclicalPattern = Math.cos(yearIndex * Math.PI / 4) * 0.05 + 1;
          
          // Add market events (e.g., 2020 disruption)
          const marketEvent = year === 20 ? 0.85 : year === 21 ? 0.92 : 1.0;
          
          const sales = Math.round(
            baseValue * baseGrowth * seasonalVariation * cyclicalPattern * 
            marketEvent * productVariation * (0.95 + Math.random() * 0.1)
          );
          
          data.push({
            fiscalYear: `FY${year}`,
            sales,
            forecast: false,
          });
        }
        
        // Forecasted data (FY26-FY35) - 10 years of forecast
        for (let year = 26; year <= 35; year++) {
          const yearIndex = year - 19;
          const baseGrowth = Math.pow(1 + product.growth, yearIndex);
          const seasonalVariation = Math.sin(yearIndex * Math.PI / 3) * 0.08 + 1;
          const cyclicalPattern = Math.cos(yearIndex * Math.PI / 4) * 0.05 + 1;
          
          // Add market maturation in later years
          const maturation = year > 30 ? 0.96 : year > 32 ? 0.93 : 1;
          
          const forecastValue = Math.round(
            baseValue * baseGrowth * seasonalVariation * cyclicalPattern * 
            maturation * productVariation
          );
          
          // Increase uncertainty over time
          const uncertaintyFactor = 0.85 - (year - 26) * 0.01;
          const upperUncertainty = 1.15 + (year - 26) * 0.01;
          
          data.push({
            fiscalYear: `FY${year}`,
            sales: forecastValue,
            forecast: true,
            confidence: {
              lower: Math.round(forecastValue * uncertaintyFactor),
              upper: Math.round(forecastValue * upperUncertainty),
            },
          });
        }
        
        results.push({
          id: `${product.id}-${plant.id}-${area.id}`,
          name: product.name,
          category: product.category,
          plant: plant.id,
          area: area.id,
          data,
        });
      });
    });
  });

  return results;
};

export interface AIInsight {
  id: string;
  type: 'trend' | 'alert' | 'opportunity';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  fiscalYear?: string;
}

export const generateAIInsights = (productId: string): AIInsight[] => {
  const insightMap: Record<string, AIInsight[]> = {
    'prod-a': [
      {
        id: 'ins-1',
        type: 'trend',
        title: 'Steady Growth Pattern',
        description: 'Product A shows consistent 8% YoY growth driven by industrial sector expansion and increased demand for automation components.',
        impact: 'high',
      },
      {
        id: 'ins-2',
        type: 'alert',
        title: 'Market Saturation Risk',
        description: 'Forecast indicates potential market saturation in FY32-FY33. Consider diversification or market expansion strategies.',
        impact: 'medium',
        fiscalYear: 'FY32',
      },
    ],
    'prod-b': [
      {
        id: 'ins-3',
        type: 'opportunity',
        title: 'Strong Consumer Demand',
        description: 'Product B demonstrates robust 12% YoY growth, indicating strong consumer market positioning and brand strength.',
        impact: 'high',
      },
      {
        id: 'ins-4',
        type: 'trend',
        title: 'Seasonal Peak Patterns',
        description: 'Analysis reveals Q4 peaks correlating with holiday seasons. Inventory planning should account for 25% surge during these periods.',
        impact: 'medium',
      },
    ],
    'prod-c': [
      {
        id: 'ins-5',
        type: 'alert',
        title: 'Moderate Growth Trajectory',
        description: 'Product C shows 6% YoY growth, below industry average. Raw material pricing pressures may impact margins.',
        impact: 'medium',
      },
      {
        id: 'ins-6',
        type: 'opportunity',
        title: 'Supply Chain Optimization',
        description: 'Predictable demand patterns present opportunity for just-in-time inventory systems, potentially reducing carrying costs by 15%.',
        impact: 'high',
      },
    ],
    'prod-d': [
      {
        id: 'ins-7',
        type: 'trend',
        title: 'Market Leadership Position',
        description: 'Product D maintains strong 10% YoY growth with highest absolute revenue. Market share expansion continues across all regions.',
        impact: 'high',
      },
      {
        id: 'ins-8',
        type: 'opportunity',
        title: 'Export Market Potential',
        description: 'Forecast models suggest untapped export markets could add 20% additional revenue by FY30 with targeted expansion.',
        impact: 'high',
        fiscalYear: 'FY30',
      },
    ],
  };

  return insightMap[productId] || [];
};

export const plants = [
  { id: 'plant-1', name: 'North Plant' },
  { id: 'plant-2', name: 'South Plant' },
  { id: 'plant-3', name: 'East Plant' },
  { id: 'plant-4', name: 'West Plant' },
];

export const areas = [
  { id: 'area-1', name: 'North America' },
  { id: 'area-2', name: 'Europe' },
  { id: 'area-3', name: 'Asia Pacific' },
  { id: 'area-4', name: 'Latin America' },
];
