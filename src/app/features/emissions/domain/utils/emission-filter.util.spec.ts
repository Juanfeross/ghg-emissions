import { Emission } from '../models/emission.model';
import { FilterState } from '../models/filter.model';
import { applyFilters } from './emission-filter.util';

describe('applyFilters', () => {
  const mockEmissions: Emission[] = [
    {
      country: 'Spain',
      year: 2020,
      emission_type: 'CO2',
      activity: 'Energy',
      emissions: 5.5,
    },
    {
      country: 'France',
      year: 2020,
      emission_type: 'CH4',
      activity: 'Agriculture',
      emissions: 3.2,
    },
    {
      country: 'Spain',
      year: 2021,
      emission_type: 'CO2',
      activity: 'Transport',
      emissions: 4.8,
    },
    {
      country: 'Germany',
      year: 2020,
      emission_type: 'N2O',
      activity: 'Energy',
      emissions: 6.1,
    },
  ];

  it('should return all emissions when no filters are applied', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result).toEqual(mockEmissions);
    expect(result.length).toBe(4);
  });

  it('should filter by country', () => {
    const filters: FilterState = {
      countries: ['Spain'],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(2);
    expect(result.every(item => item.country === 'Spain')).toBe(true);
  });

  it('should filter by multiple countries', () => {
    const filters: FilterState = {
      countries: ['Spain', 'France'],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(3);
    expect(result.every(item => ['Spain', 'France'].includes(item.country))).toBe(true);
  });

  it('should filter by emission type', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: ['CO2'],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(2);
    expect(result.every(item => item.emission_type === 'CO2')).toBe(true);
  });

  it('should filter by activity', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: [],
      activities: ['Energy'],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(2);
    expect(result.every(item => item.activity === 'Energy')).toBe(true);
  });

  it('should filter by year range', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: [],
      activities: [],
      yearRange: [2021, 2021],
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(1);
    expect(result[0].year).toBe(2021);
  });

  it('should filter by minimum emissions', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: 5.0,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(2);
    expect(result.every(item => item.emissions >= 5.0)).toBe(true);
  });

  it('should filter by maximum emissions', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: 5.0,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(2);
    expect(result.every(item => item.emissions <= 5.0)).toBe(true);
  });

  it('should filter by emissions range', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: 4.0,
      maxEmissions: 5.5,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(2);
    expect(result.every(item => item.emissions >= 4.0 && item.emissions <= 5.5)).toBe(true);
  });

  it('should apply multiple filters simultaneously', () => {
    const filters: FilterState = {
      countries: ['Spain'],
      emissionTypes: ['CO2'],
      activities: [],
      yearRange: [2020, 2021],
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(2);
    expect(result.every(item => item.country === 'Spain' && item.emission_type === 'CO2')).toBe(true);
  });

  it('should return empty array when filters match nothing', () => {
    const filters: FilterState = {
      countries: ['NonExistent'],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters(mockEmissions, filters);
    expect(result.length).toBe(0);
  });

  it('should handle empty emissions array', () => {
    const filters: FilterState = {
      countries: [],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    };

    const result = applyFilters([], filters);
    expect(result).toEqual([]);
  });
});

