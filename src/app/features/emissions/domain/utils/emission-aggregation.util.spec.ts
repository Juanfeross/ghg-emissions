import { Emission } from '../models/emission.model';
import { aggregateData, extractUniqueValues } from './emission-aggregation.util';

describe('emission-aggregation.util', () => {
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

  describe('aggregateData', () => {
    it('should calculate total emissions correctly', () => {
      const result = aggregateData(mockEmissions);
      expect(result.totalEmissions).toBe(19.6);
    });

    it('should calculate average emissions correctly', () => {
      const result = aggregateData(mockEmissions);
      expect(result.averageEmissions).toBe(4.9);
    });

    it('should return average 0 for empty array', () => {
      const result = aggregateData([]);
      expect(result.averageEmissions).toBe(0);
    });

    it('should find max emission correctly', () => {
      const result = aggregateData(mockEmissions);
      expect(result.maxEmission).toBeTruthy();
      expect(result.maxEmission?.emissions).toBe(6.1);
      expect(result.maxEmission?.country).toBe('Germany');
    });

    it('should return null maxEmission for empty array', () => {
      const result = aggregateData([]);
      expect(result.maxEmission).toBeNull();
    });

    it('should aggregate emissions by type', () => {
      const result = aggregateData(mockEmissions);
      expect(result.emissionsByType['CO2']).toBe(10.3);
      expect(result.emissionsByType['CH4']).toBe(3.2);
      expect(result.emissionsByType['N2O']).toBe(6.1);
    });

    it('should aggregate emissions by country', () => {
      const result = aggregateData(mockEmissions);
      expect(result.emissionsByCountry['Spain']).toBe(10.3);
      expect(result.emissionsByCountry['France']).toBe(3.2);
      expect(result.emissionsByCountry['Germany']).toBe(6.1);
    });

    it('should aggregate emissions by year', () => {
      const result = aggregateData(mockEmissions);
      expect(result.emissionsByYear.length).toBe(2);

      const year2020 = result.emissionsByYear.find(y => y.year === 2020);
      expect(year2020).toBeTruthy();
      expect(year2020?.['CO2']).toBe(5.5);
      expect(year2020?.['CH4']).toBe(3.2);
      expect(year2020?.['N2O']).toBe(6.1);

      const year2021 = result.emissionsByYear.find(y => y.year === 2021);
      expect(year2021).toBeTruthy();
      expect(year2021?.['CO2']).toBe(4.8);
    });

    it('should sort emissions by year', () => {
      const result = aggregateData(mockEmissions);
      expect(result.emissionsByYear[0].year).toBeLessThanOrEqual(result.emissionsByYear[1].year);
    });
  });

  describe('extractUniqueValues', () => {
    it('should extract unique countries', () => {
      const result = extractUniqueValues(mockEmissions);
      expect(result.countries).toEqual(['France', 'Germany', 'Spain']);
      expect(result.countries.length).toBe(3);
    });

    it('should extract unique activities', () => {
      const result = extractUniqueValues(mockEmissions);
      expect(result.activities).toEqual(['Agriculture', 'Energy', 'Transport']);
    });

    it('should extract unique emission types', () => {
      const result = extractUniqueValues(mockEmissions);
      expect(result.emissionTypes).toEqual(['CH4', 'CO2', 'N2O']);
    });

    it('should calculate year range correctly', () => {
      const result = extractUniqueValues(mockEmissions);
      expect(result.yearRange).toEqual([2020, 2021]);
    });

    it('should calculate emissions range correctly', () => {
      const result = extractUniqueValues(mockEmissions);
      expect(result.emissionsRange).toEqual([3.2, 6.1]);
    });

    it('should return default values for empty array', () => {
      const result = extractUniqueValues([]);
      expect(result.countries).toEqual([]);
      expect(result.activities).toEqual([]);
      expect(result.emissionTypes).toEqual([]);
      expect(result.yearRange).toEqual([2015, 2023]);
      expect(result.emissionsRange).toEqual([0, 10]);
    });
  });
});

