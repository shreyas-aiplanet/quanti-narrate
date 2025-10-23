export interface RegionData {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  currentDemand: number; // Annual demand in units
  forecastedDemand: number; // Forecasted demand for next 5 years
  currentSupply: number; // Current supply capacity
  growthRate: number; // CAGR percentage
  logisticsCost: number; // Cost per unit
  populationDensity: number; // People per sq km
  marketPenetration: number; // Percentage
  competitionLevel: 'low' | 'medium' | 'high';
  recommendationScore: number; // 0-100
}

export interface PlantCapacity {
  plantId: string;
  plantName: string;
  currentCapacity: number; // Units per year
  utilizationRate: number; // Percentage
  expansionPotential: number; // Additional capacity possible
  operatingCost: number; // Cost per unit
}

export interface CapacityInsight {
  id: string;
  type: 'expansion' | 'new-region' | 'optimization' | 'risk';
  title: string;
  description: string;
  region?: string;
  expectedROI: number; // Percentage
  investmentRequired: number; // USD
  timeToMarket: string; // e.g., "18-24 months"
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
}

// Generate regional capacity and demand data
export const generateRegionData = (): RegionData[] => {
  return [
    {
      id: 'reg-1',
      name: 'Southeast Asia',
      country: 'Vietnam/Thailand',
      coordinates: { lat: 13.7563, lng: 100.5018 },
      currentDemand: 25000000,
      forecastedDemand: 35000000,
      currentSupply: 18000000,
      growthRate: 12.5,
      logisticsCost: 45,
      populationDensity: 289,
      marketPenetration: 35,
      competitionLevel: 'medium',
      recommendationScore: 92,
    },
    {
      id: 'reg-2',
      name: 'Eastern Europe',
      country: 'Poland',
      coordinates: { lat: 52.2297, lng: 21.0122 },
      currentDemand: 18000000,
      forecastedDemand: 23000000,
      currentSupply: 19000000,
      growthRate: 7.8,
      logisticsCost: 52,
      populationDensity: 124,
      marketPenetration: 58,
      competitionLevel: 'high',
      recommendationScore: 73,
    },
    {
      id: 'reg-3',
      name: 'West Africa',
      country: 'Nigeria',
      coordinates: { lat: 9.0820, lng: 8.6753 },
      currentDemand: 12000000,
      forecastedDemand: 19000000,
      currentSupply: 7000000,
      growthRate: 15.2,
      logisticsCost: 68,
      populationDensity: 226,
      marketPenetration: 22,
      competitionLevel: 'low',
      recommendationScore: 85,
    },
    {
      id: 'reg-4',
      name: 'South America',
      country: 'Brazil',
      coordinates: { lat: -23.5505, lng: -46.6333 },
      currentDemand: 22000000,
      forecastedDemand: 28000000,
      currentSupply: 21000000,
      growthRate: 8.3,
      logisticsCost: 58,
      populationDensity: 25,
      marketPenetration: 48,
      competitionLevel: 'medium',
      recommendationScore: 68,
    },
    {
      id: 'reg-5',
      name: 'Middle East',
      country: 'UAE',
      coordinates: { lat: 25.2048, lng: 55.2708 },
      currentDemand: 15000000,
      forecastedDemand: 21000000,
      currentSupply: 12000000,
      growthRate: 10.5,
      logisticsCost: 62,
      populationDensity: 118,
      marketPenetration: 42,
      competitionLevel: 'medium',
      recommendationScore: 79,
    },
    {
      id: 'reg-6',
      name: 'Central Asia',
      country: 'India',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      currentDemand: 35000000,
      forecastedDemand: 48000000,
      currentSupply: 32000000,
      growthRate: 11.2,
      logisticsCost: 38,
      populationDensity: 464,
      marketPenetration: 52,
      competitionLevel: 'high',
      recommendationScore: 88,
    },
  ];
};

// Generate plant capacity data
export const generatePlantCapacity = (): PlantCapacity[] => {
  return [
    {
      plantId: 'plant-1',
      plantName: 'North Plant',
      currentCapacity: 45000000,
      utilizationRate: 87,
      expansionPotential: 15000000,
      operatingCost: 32,
    },
    {
      plantId: 'plant-2',
      plantName: 'South Plant',
      currentCapacity: 32000000,
      utilizationRate: 72,
      expansionPotential: 8000000,
      operatingCost: 38,
    },
    {
      plantId: 'plant-3',
      plantName: 'East Plant',
      currentCapacity: 38000000,
      utilizationRate: 91,
      expansionPotential: 12000000,
      operatingCost: 35,
    },
    {
      plantId: 'plant-4',
      plantName: 'West Plant',
      currentCapacity: 28000000,
      utilizationRate: 65,
      expansionPotential: 10000000,
      operatingCost: 41,
    },
  ];
};

// Generate AI-powered capacity insights
export const generateCapacityInsights = (): CapacityInsight[] => {
  return [
    {
      id: 'cap-ins-1',
      type: 'new-region',
      title: 'Recommended: Southeast Asia Expansion',
      description: 'Establish new manufacturing facility in Vietnam or Thailand to capitalize on high growth market with 12.5% CAGR.',
      region: 'Southeast Asia',
      expectedROI: 24.5,
      investmentRequired: 45000000,
      timeToMarket: '18-24 months',
      priority: 'high',
      reasoning: 'Strong demand-supply gap of 7M units annually. Low logistics costs ($45/unit) and proximity to raw material suppliers make this region highly attractive. Growing middle class and favorable trade agreements further enhance market potential.',
    },
    {
      id: 'cap-ins-2',
      type: 'expansion',
      title: 'Expand East Plant Capacity',
      description: 'East Plant operating at 91% capacity. Expand by 12M units to meet increasing regional demand.',
      expectedROI: 18.3,
      investmentRequired: 22000000,
      timeToMarket: '12-15 months',
      priority: 'high',
      reasoning: 'Current utilization rate of 91% indicates near-maximum capacity. Expansion will prevent production bottlenecks and enable capture of growing market share in Asia Pacific region. Lower operating costs ($35/unit) ensure strong margins.',
    },
    {
      id: 'cap-ins-3',
      type: 'new-region',
      title: 'Evaluate West Africa Market Entry',
      description: 'Consider establishing operations in Nigeria to serve rapidly growing West African market (15.2% CAGR).',
      region: 'West Africa',
      expectedROI: 22.8,
      investmentRequired: 38000000,
      timeToMarket: '24-30 months',
      priority: 'medium',
      reasoning: 'Highest growth rate at 15.2% CAGR with massive demand-supply gap of 5M units. Low competition and untapped market (22% penetration) present first-mover advantage. Higher logistics costs offset by market potential.',
    },
    {
      id: 'cap-ins-4',
      type: 'optimization',
      title: 'Optimize West Plant Utilization',
      description: 'West Plant operating at only 65% capacity. Optimize production scheduling and reduce operating costs.',
      expectedROI: 12.5,
      investmentRequired: 3000000,
      timeToMarket: '6-9 months',
      priority: 'medium',
      reasoning: 'Low utilization indicates operational inefficiency. Process optimization and demand reallocation can improve capacity usage to 80%+, reducing per-unit costs from $41 to $35 and improving overall profitability.',
    },
    {
      id: 'cap-ins-5',
      type: 'new-region',
      title: 'Strategic Entry: Central Asia (India)',
      description: 'Establish presence in India to serve large, growing market with 11.2% CAGR and lowest logistics costs.',
      region: 'Central Asia',
      expectedROI: 21.2,
      investmentRequired: 52000000,
      timeToMarket: '20-26 months',
      priority: 'high',
      reasoning: 'Largest total demand (35M units currently, 48M forecasted) with competitive logistics costs at $38/unit. High population density and growing middle class create sustained demand. Despite high competition, market size justifies entry.',
    },
    {
      id: 'cap-ins-6',
      type: 'risk',
      title: 'Monitor South America Capacity Surplus',
      description: 'Current supply exceeds demand in Brazil market. Monitor closely to avoid overproduction.',
      region: 'South America',
      expectedROI: 0,
      investmentRequired: 0,
      timeToMarket: 'N/A',
      priority: 'low',
      reasoning: 'Supply-demand balance is healthy (21M supply vs 22M demand), but modest 8.3% growth rate and medium competition suggest cautious approach. Focus on market penetration improvement rather than capacity expansion.',
    },
  ];
};

// Calculate overall capacity metrics
export const calculateCapacityMetrics = () => {
  const regions = generateRegionData();
  const plants = generatePlantCapacity();

  const totalCurrentDemand = regions.reduce((sum, r) => sum + r.currentDemand, 0);
  const totalForecastedDemand = regions.reduce((sum, r) => sum + r.forecastedDemand, 0);
  const totalCurrentSupply = regions.reduce((sum, r) => sum + r.currentSupply, 0);
  const totalPlantCapacity = plants.reduce((sum, p) => sum + p.currentCapacity, 0);
  const avgUtilization = plants.reduce((sum, p) => sum + p.utilizationRate, 0) / plants.length;
  const demandSupplyGap = totalCurrentDemand - totalCurrentSupply;
  const forecastedGap = totalForecastedDemand - totalCurrentSupply;

  return {
    totalCurrentDemand,
    totalForecastedDemand,
    totalCurrentSupply,
    totalPlantCapacity,
    avgUtilization,
    demandSupplyGap,
    forecastedGap,
    supplyGapPercentage: (demandSupplyGap / totalCurrentDemand) * 100,
  };
};
