import { Emission } from '../models/emission.model';
import { AggregatedData, ChartDataPoint } from '../models/filter.model';

export function aggregateData(filteredData: Emission[]): AggregatedData {
  const totalEmissions = filteredData.reduce((sum, item) => sum + item.emissions, 0);
  const averageEmissions = filteredData.length > 0 ? totalEmissions / filteredData.length : 0;

  const maxEmission = filteredData.reduce<Emission | null>((max, item) => {
    if (!max || item.emissions > max.emissions) return item;
    return max;
  }, null);

  const emissionsByType = filteredData.reduce<Record<string, number>>((acc, item) => {
    acc[item.emission_type] = (acc[item.emission_type] || 0) + item.emissions;
    return acc;
  }, {});

  const emissionsByCountry = filteredData.reduce<Record<string, number>>((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + item.emissions;
    return acc;
  }, {});

  const emissionsByYear = aggregateByYear(filteredData);

  return {
    totalEmissions,
    averageEmissions,
    maxEmission,
    emissionsByType,
    emissionsByCountry,
    emissionsByYear,
  };
}

function aggregateByYear(filteredData: Emission[]): ChartDataPoint[] {
  const yearMap = new Map<number, ChartDataPoint>();

  filteredData.forEach(item => {
    const existing = yearMap.get(item.year) || { year: item.year };

    if (item.emission_type === 'CO2') {
      existing.CO2 = ((existing.CO2 || 0) + item.emissions);
    } else if (item.emission_type === 'N2O') {
      existing.N2O = ((existing.N2O || 0) + item.emissions);
    } else if (item.emission_type === 'CH4') {
      existing.CH4 = ((existing.CH4 || 0) + item.emissions);
    }

    existing.total = (existing.total || 0) + item.emissions;
    yearMap.set(item.year, existing);
  });

  return Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
}

export function extractUniqueValues(data: Emission[]): {
  countries: string[];
  activities: string[];
  emissionTypes: string[];
  yearRange: [number, number];
  emissionsRange: [number, number];
} {
  if (!data || data.length === 0) {
    return {
      countries: [],
      activities: [],
      emissionTypes: [],
      yearRange: [2015, 2023],
      emissionsRange: [0, 10]
    };
  }

  const countries = [...new Set(data.map(item => item.country))].sort();
  const activities = [...new Set(data.map(item => item.activity))].sort();
  const emissionTypes = [...new Set(data.map(item => item.emission_type))].sort();

  const years = data.map(item => item.year);
  const yearRange: [number, number] = [Math.min(...years), Math.max(...years)];

  const emissions = data.map(item => item.emissions);
  const emissionsRange: [number, number] = [Math.min(...emissions), Math.max(...emissions)];

  return {
    countries,
    activities,
    emissionTypes: emissionTypes as string[],
    yearRange,
    emissionsRange
  };
}

