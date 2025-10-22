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
  data: SalesDataPoint[];
}

// Generate realistic sales data with seasonal patterns and growth trends
export const generateSalesData = (): ProductData[] => {
  const products = [
    { id: 'prod-a', name: 'Product A - Industrial Components', category: 'Industrial', baseValue: 15000000, growth: 0.08 },
    { id: 'prod-b', name: 'Product B - Consumer Goods', category: 'Consumer', baseValue: 25000000, growth: 0.12 },
    { id: 'prod-c', name: 'Product C - Raw Materials', category: 'Materials', baseValue: 18000000, growth: 0.06 },
    { id: 'prod-d', name: 'Product D - Finished Goods', category: 'Finished', baseValue: 30000000, growth: 0.10 },
  ];

  return products.map(product => {
    const data: SalesDataPoint[] = [];
    
    // Historical data (FY23-FY25)
    for (let year = 23; year <= 25; year++) {
      const yearIndex = year - 23;
      const baseGrowth = Math.pow(1 + product.growth, yearIndex);
      const seasonalVariation = Math.sin(yearIndex * Math.PI / 2) * 0.1 + 1;
      const randomVariation = 0.95 + Math.random() * 0.1;
      
      data.push({
        fiscalYear: `FY${year}`,
        sales: Math.round(product.baseValue * baseGrowth * seasonalVariation * randomVariation),
        forecast: false,
      });
    }
    
    // Forecasted data (FY26-FY35)
    for (let year = 26; year <= 35; year++) {
      const yearIndex = year - 23;
      const baseGrowth = Math.pow(1 + product.growth, yearIndex);
      const seasonalVariation = Math.sin(yearIndex * Math.PI / 2) * 0.1 + 1;
      
      // Add some market correction in later years
      const marketCorrection = year > 30 ? 0.95 : 1;
      
      const forecastValue = Math.round(
        product.baseValue * baseGrowth * seasonalVariation * marketCorrection
      );
      
      data.push({
        fiscalYear: `FY${year}`,
        sales: forecastValue,
        forecast: true,
        confidence: {
          lower: Math.round(forecastValue * 0.85),
          upper: Math.round(forecastValue * 1.15),
        },
      });
    }
    
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      data,
    };
  });
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
