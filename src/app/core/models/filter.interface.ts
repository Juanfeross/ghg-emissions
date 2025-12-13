import { Emission } from './emission.interface';

export interface FilterState {
  countries: string[];
  emissionTypes: string[];
  activities: string[];
  yearRange: [number, number] | null;
  minEmissions: number | null;
  maxEmissions: number | null;
}

export interface ChartDataPoint {
  year: number;
  CO2?: number;
  N2O?: number;
  CH4?: number;
  total?: number;
}

export interface AggregatedData {
  totalEmissions: number;
  averageEmissions: number;
  maxEmission: Emission | null;
  emissionsByType: Record<string, number>;
  emissionsByCountry: Record<string, number>;
  emissionsByYear: ChartDataPoint[];
}

