import { Emission } from '../models/emission.model';
import { TableFilters } from '../models/filter.model';
import {
  filterData,
  sortData,
  paginateData,
  getTotalPages,
  getPageRange,
  getPageNumbers,
  processTableData,
} from './table-data.util';

describe('table-data.util', () => {
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
      year: 2021,
      emission_type: 'CH4',
      activity: 'Agriculture',
      emissions: 3.2,
    },
    {
      country: 'Germany',
      year: 2020,
      emission_type: 'N2O',
      activity: 'Energy',
      emissions: 6.1,
    },
    {
      country: 'Italy',
      year: 2022,
      emission_type: 'CO2',
      activity: 'Transport',
      emissions: 4.8,
    },
  ];

  describe('filterData', () => {
    it('should return all data when no filters applied', () => {
      const filters: TableFilters = {
        search: '',
        countries: [],
        types: [],
        activities: [],
        yearFrom: null,
        yearTo: null,
        sortBy: 'year',
        sortOrder: 'desc',
      };

      const result = filterData(mockEmissions, filters);
      expect(result.length).toBe(4);
    });

    it('should filter by search term', () => {
      const filters: TableFilters = {
        search: 'Spain',
        countries: [],
        types: [],
        activities: [],
        yearFrom: null,
        yearTo: null,
        sortBy: 'year',
        sortOrder: 'desc',
      };

      const result = filterData(mockEmissions, filters);
      expect(result.length).toBe(1);
      expect(result[0].country).toBe('Spain');
    });

    it('should filter by country', () => {
      const filters: TableFilters = {
        search: '',
        countries: ['Spain', 'France'],
        types: [],
        activities: [],
        yearFrom: null,
        yearTo: null,
        sortBy: 'year',
        sortOrder: 'desc',
      };

      const result = filterData(mockEmissions, filters);
      expect(result.length).toBe(2);
    });

    it('should filter by year range', () => {
      const filters: TableFilters = {
        search: '',
        countries: [],
        types: [],
        activities: [],
        yearFrom: 2021,
        yearTo: 2021,
        sortBy: 'year',
        sortOrder: 'desc',
      };

      const result = filterData(mockEmissions, filters);
      expect(result.length).toBe(1);
      expect(result[0].year).toBe(2021);
    });
  });

  describe('sortData', () => {
    it('should sort by year ascending', () => {
      const result = sortData(mockEmissions, 'year', 'asc');
      expect(result[0].year).toBe(2020);
      expect(result[result.length - 1].year).toBe(2022);
    });

    it('should sort by year descending', () => {
      const result = sortData(mockEmissions, 'year', 'desc');
      expect(result[0].year).toBe(2022);
      expect(result[result.length - 1].year).toBe(2020);
    });

    it('should sort by country alphabetically', () => {
      const result = sortData(mockEmissions, 'country', 'asc');
      expect(result[0].country).toBe('France');
      expect(result[result.length - 1].country).toBe('Spain');
    });

    it('should sort by emissions ascending', () => {
      const result = sortData(mockEmissions, 'emissions', 'asc');
      expect(result[0].emissions).toBe(3.2);
      expect(result[result.length - 1].emissions).toBe(6.1);
    });
  });

  describe('paginateData', () => {
    it('should return first page with correct items', () => {
      const result = paginateData(mockEmissions, 1, 2);
      expect(result.length).toBe(2);
    });

    it('should return second page with correct items', () => {
      const result = paginateData(mockEmissions, 2, 2);
      expect(result.length).toBe(2);
    });

    it('should return empty array for page beyond data', () => {
      const result = paginateData(mockEmissions, 5, 2);
      expect(result.length).toBe(0);
    });
  });

  describe('getTotalPages', () => {
    it('should calculate total pages correctly', () => {
      expect(getTotalPages(10, 3)).toBe(4);
      expect(getTotalPages(10, 5)).toBe(2);
      expect(getTotalPages(10, 10)).toBe(1);
    });

    it('should round up for partial pages', () => {
      expect(getTotalPages(11, 3)).toBe(4);
    });
  });

  describe('getPageRange', () => {
    it('should calculate page range for first page', () => {
      const result = getPageRange(1, 3, 10);
      expect(result.start).toBe(1);
      expect(result.end).toBe(3);
    });

    it('should calculate page range for middle page', () => {
      const result = getPageRange(2, 3, 10);
      expect(result.start).toBe(4);
      expect(result.end).toBe(6);
    });

    it('should cap end to total items', () => {
      const result = getPageRange(4, 3, 10);
      expect(result.start).toBe(10);
      expect(result.end).toBe(10);
    });
  });

  describe('getPageNumbers', () => {
    it('should return all pages when total pages <= 7', () => {
      const result = getPageNumbers(1, 5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should show ellipsis when current page near start', () => {
      const result = getPageNumbers(2, 10);
      expect(result).toContain(1);
      expect(result).toContain(5);
      expect(result).toContain(null);
      expect(result).toContain(10);
    });

    it('should show ellipsis when current page near end', () => {
      const result = getPageNumbers(9, 10);
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(null);
    });
  });

  describe('processTableData', () => {
    it('should process data with filters, sorting and pagination', () => {
      const filters: TableFilters = {
        search: '',
        countries: [],
        types: [],
        activities: [],
        yearFrom: null,
        yearTo: null,
        sortBy: 'year',
        sortOrder: 'asc',
      };

      const result = processTableData(mockEmissions, filters, 1, 2);
      expect(result.filteredData.length).toBe(4);
      expect(result.sortedData.length).toBe(4);
      expect(result.paginatedData.length).toBe(2);
      expect(result.totalPages).toBe(2);
      expect(result.startItem).toBe(1);
      expect(result.endItem).toBe(2);
    });

    it('should extract unique values correctly', () => {
      const filters: TableFilters = {
        search: '',
        countries: [],
        types: [],
        activities: [],
        yearFrom: null,
        yearTo: null,
        sortBy: 'year',
        sortOrder: 'asc',
      };

      const result = processTableData(mockEmissions, filters, 1, 10);
      expect(result.uniqueCountries).toContain('Spain');
      expect(result.uniqueTypes).toContain('CO2');
      expect(result.uniqueActivities).toContain('Energy');
    });
  });
});

