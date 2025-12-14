import { Emission } from '../models/emission.model';
import { TableFilters } from '../models/filter.model';

export interface TableDataResult {
  filteredData: Emission[];
  sortedData: Emission[];
  paginatedData: Emission[];
  totalPages: number;
  startItem: number;
  endItem: number;
  uniqueCountries: string[];
  uniqueTypes: string[];
  uniqueActivities: string[];
  yearRange: [number, number];
}

export function filterData(data: Emission[], filters: TableFilters): Emission[] {
  return data.filter(item => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        item.country.toLowerCase().includes(searchLower) ||
        item.activity.toLowerCase().includes(searchLower) ||
        item.emission_type.toLowerCase().includes(searchLower) ||
        item.year.toString().includes(searchLower) ||
        item.emissions.toString().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.countries.length > 0 && !filters.countries.includes(item.country)) {
      return false;
    }

    if (filters.types.length > 0 && !filters.types.includes(item.emission_type)) {
      return false;
    }

    if (filters.activities.length > 0 && !filters.activities.includes(item.activity)) {
      return false;
    }

    if (filters.yearFrom !== null && item.year < filters.yearFrom) {
      return false;
    }

    if (filters.yearTo !== null && item.year > filters.yearTo) {
      return false;
    }

    return true;
  });
}

export function sortData(data: Emission[], sortBy: TableFilters['sortBy'], sortOrder: TableFilters['sortOrder']): Emission[] {
  const sorted = [...data];
  return sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'country':
        comparison = a.country.localeCompare(b.country);
        break;
      case 'activity':
        comparison = a.activity.localeCompare(b.activity);
        break;
      case 'type':
        comparison = a.emission_type.localeCompare(b.emission_type);
        break;
      case 'emissions':
        comparison = a.emissions - b.emissions;
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

export function paginateData(data: Emission[], currentPage: number, itemsPerPage: number): Emission[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
}

export function getTotalPages(dataLength: number, itemsPerPage: number): number {
  return Math.ceil(dataLength / itemsPerPage);
}

export function getPageRange(currentPage: number, itemsPerPage: number, totalItems: number): { start: number; end: number } {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  return { start, end };
}

export function getPageNumbers(currentPage: number, totalPages: number): (number | null)[] {
  const pages: (number | null)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push(null);
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push(null);
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(null);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(null);
      pages.push(totalPages);
    }
  }

  return pages;
}

export function extractUniqueValues(data: Emission[]): {
  countries: string[];
  types: string[];
  activities: string[];
  yearRange: [number, number];
} {
  const countries = [...new Set(data.map(item => item.country))].sort();
  const types = [...new Set(data.map(item => item.emission_type))].sort();
  const activities = [...new Set(data.map(item => item.activity))].sort();

  let yearRange: [number, number] = [2015, 2023];
  if (data.length > 0) {
    const years = data.map(item => item.year);
    yearRange = [Math.min(...years), Math.max(...years)];
  }

  return { countries, types, activities, yearRange };
}

export function processTableData(
  data: Emission[],
  filters: TableFilters,
  currentPage: number,
  itemsPerPage: number
): TableDataResult {
  const filteredData = filterData(data, filters);
  const sortedData = sortData(filteredData, filters.sortBy, filters.sortOrder);
  const paginatedData = paginateData(sortedData, currentPage, itemsPerPage);
  const totalPages = getTotalPages(sortedData.length, itemsPerPage);
  const { start: startItem, end: endItem } = getPageRange(currentPage, itemsPerPage, sortedData.length);
  const { countries: uniqueCountries, types: uniqueTypes, activities: uniqueActivities, yearRange } =
    extractUniqueValues(data);

  return {
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    startItem,
    endItem,
    uniqueCountries,
    uniqueTypes,
    uniqueActivities,
    yearRange
  };
}

