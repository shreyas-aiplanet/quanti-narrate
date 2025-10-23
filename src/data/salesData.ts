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
    { id: 'prod-1', name: 'UC Injector', category: 'Power train', plant: 'DNHA_M', baseValue: 18000000, growth: 0.11 },
    { id: 'prod-2', name: 'ECU', category: 'Mobility', plant: 'DNHA_M', baseValue: 22000000, growth: 0.13 },
    { id: 'prod-3', name: 'ECU', category: 'Electrification', plant: 'DNHA_M', baseValue: 25000000, growth: 0.15 },
    { id: 'prod-4', name: 'INV', category: 'Elefie', plant: 'DNHA-J', baseValue: 16000000, growth: 0.09 },
    { id: 'prod-5', name: 'Motor', category: 'Thermal', plant: 'DNHA-J', baseValue: 19000000, growth: 0.10 },
    { id: 'prod-6', name: 'MG', category: 'Elefie', plant: 'DNIN', baseValue: 14000000, growth: 0.08 },
    { id: 'prod-7', name: '2W ECU', category: 'Power train', plant: 'DNIN', baseValue: 17000000, growth: 0.12 },
    { id: 'prod-8', name: 'ACG/ACG-S', category: 'Power train', plant: 'DNIN', baseValue: 21000000, growth: 0.11 },
    { id: 'prod-9', name: 'Starter', category: 'Power train', plant: 'DNIN', baseValue: 15000000, growth: 0.09 },
    { id: 'prod-10', name: 'Alternator', category: 'Power train', plant: 'DNIN', baseValue: 16000000, growth: 0.10 },
    { id: 'prod-11', name: 'Thermal', category: 'Components', plant: 'DNKI', baseValue: 13000000, growth: 0.07 },
    { id: 'prod-12', name: 'Export', category: 'Components', plant: 'DNKI', baseValue: 20000000, growth: 0.14 },
    { id: 'prod-13', name: 'AC', category: 'Components', plant: 'DNKI', baseValue: 18000000, growth: 0.10 },
    { id: 'prod-14', name: 'Tube&Hose', category: 'Components', plant: 'DNKI', baseValue: 12000000, growth: 0.08 },
    { id: 'prod-15', name: 'TMU', category: 'Components', plant: 'DNKI', baseValue: 14000000, growth: 0.09 },
  ];

  const areaMultipliers: Record<string, number> = {
    'area-1': 1.3,  // North America - Largest market
    'area-2': 1.1,  // Europe - Mature market
    'area-3': 1.4,  // Asia Pacific - Growing market
    'area-4': 0.8,  // Latin America - Emerging market
  };

  const results: ProductData[] = [];

  products.forEach(product => {
    areas.forEach(area => {
      const areaMultiplier = areaMultipliers[area.id];
      const baseValue = product.baseValue * areaMultiplier;

      // Add product-specific variations
      const productVariation = product.category === 'Electrification' ? 1.15 :
                               product.category === 'Power train' ? 1.1 : 1.0;
        
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
          id: `${product.id}-${area.id}`,
          name: product.name,
          category: product.category,
          plant: product.plant,
          area: area.id,
          data,
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
    'prod-1': [
      {
        id: 'ins-1',
        type: 'trend',
        title: 'Strong Powertrain Demand',
        description: 'UC Injector shows robust 11% YoY growth driven by automotive sector expansion.',
        impact: 'high',
      },
      {
        id: 'ins-2',
        type: 'opportunity',
        title: 'Asia Pacific Expansion',
        description: 'Emerging markets show 30% higher demand. Consider capacity expansion in FY28-FY30.',
        impact: 'high',
        fiscalYear: 'FY28',
      },
      {
        id: 'ins-3',
        type: 'alert',
        title: 'Supply Chain Optimization Needed',
        description: 'Monitor component availability as demand increases to prevent bottlenecks.',
        impact: 'medium',
      },
    ],
    'prod-2': [
      {
        id: 'ins-4',
        type: 'trend',
        title: 'Mobility ECU Growth',
        description: 'Strong 13% YoY growth reflecting mobility sector transformation and digitalization.',
        impact: 'high',
      },
      {
        id: 'ins-5',
        type: 'opportunity',
        title: 'Smart Mobility Integration',
        description: 'Connected vehicle trends creating new revenue streams. Forecast shows 25% upside by FY32.',
        impact: 'high',
        fiscalYear: 'FY32',
      },
      {
        id: 'ins-6',
        type: 'alert',
        title: 'Technology Refresh Cycle',
        description: 'Plan for product updates to maintain competitive edge in rapidly evolving market.',
        impact: 'medium',
      },
    ],
    'prod-3': [
      {
        id: 'ins-7',
        type: 'trend',
        title: 'Electrification Leading Growth',
        description: 'ECU for electrification shows exceptional 15% YoY growth as EV adoption accelerates.',
        impact: 'high',
      },
      {
        id: 'ins-8',
        type: 'opportunity',
        title: 'EV Market Expansion',
        description: 'Electric vehicle penetration driving sustained demand. Consider doubling capacity by FY30.',
        impact: 'high',
        fiscalYear: 'FY30',
      },
      {
        id: 'ins-9',
        type: 'alert',
        title: 'Regulatory Compliance',
        description: 'Monitor evolving emission standards to ensure product alignment with regulations.',
        impact: 'medium',
      },
    ],
  };

  // Return specific insights if available, otherwise return generic insights
  if (insightMap[productId]) {
    return insightMap[productId];
  }

  // Generic insights for other products
  return [
    {
      id: 'ins-generic-1',
      type: 'trend',
      title: 'Stable Growth Pattern',
      description: 'Product shows consistent growth aligned with industry trends and market demand.',
      impact: 'medium',
    },
    {
      id: 'ins-generic-2',
      type: 'opportunity',
      title: 'Market Expansion Potential',
      description: 'Analysis indicates opportunities for geographic expansion and market penetration.',
      impact: 'medium',
    },
    {
      id: 'ins-generic-3',
      type: 'alert',
      title: 'Monitor Competition',
      description: 'Keep track of competitive dynamics and adjust strategy as market evolves.',
      impact: 'low',
    },
  ];
};

export const plants = [
  { id: 'DNHA_M', name: 'DNHA-M' },
  { id: 'DNHA-J', name: 'DNHA-J' },
  { id: 'DNIN', name: 'DNIN' },
  { id: 'DNKI', name: 'DNKI' },
];

export const categories = [
  { id: 'Power train', name: 'Power train' },
  { id: 'Mobility', name: 'Mobility' },
  { id: 'Electrification', name: 'Electrification' },
  { id: 'Elefie', name: 'Elefie' },
  { id: 'Thermal', name: 'Thermal' },
  { id: 'Components', name: 'Components' },
];

export const areas = [
  { id: 'area-1', name: 'North America' },
  { id: 'area-2', name: 'Europe' },
  { id: 'area-3', name: 'Asia Pacific' },
  { id: 'area-4', name: 'Latin America' },
];
