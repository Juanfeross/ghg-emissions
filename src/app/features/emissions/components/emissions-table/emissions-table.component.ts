import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Emission } from '../../../../core/models';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';

function getEmissionTypeBadgeVariant(type: string): string {
  switch (type) {
    case 'CO2':
      return 'bg-chart-co2/15 text-chart-co2 border-chart-co2/30';
    case 'N2O':
      return 'bg-chart-n2o/15 text-chart-n2o border-chart-n2o/30';
    case 'CH4':
      return 'bg-chart-ch4/15 text-chart-ch4 border-chart-ch4/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

interface TableFilters {
  search: string;
  countries: string[];
  types: string[];
  activities: string[];
  yearFrom: number | null;
  yearTo: number | null;
  sortBy: 'year' | 'country' | 'activity' | 'type' | 'emissions';
  sortOrder: 'asc' | 'desc';
}

@Component({
  selector: 'app-emissions-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BadgeComponent,
    InputComponent
  ],
  templateUrl: './emissions-table.component.html',
  styleUrl: './emissions-table.component.scss'
})
export class EmissionsTableComponent implements OnInit, OnChanges {
  @Input() data: Emission[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  tableFilters: TableFilters = {
    search: '',
    countries: [],
    types: [],
    activities: [],
    yearFrom: null,
    yearTo: null,
    sortBy: 'year',
    sortOrder: 'desc'
  };

  uniqueCountries: string[] = [];
  uniqueTypes: string[] = [];
  uniqueActivities: string[] = [];
  yearRange: [number, number] = [2015, 2023];
  isFiltersExpanded = false;

  ngOnInit(): void {
    this.updateUniqueValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateUniqueValues();
      this.currentPage = 1;
    }
  }

  updateUniqueValues(): void {
    this.uniqueCountries = [...new Set(this.data.map(item => item.country))].sort();
    this.uniqueTypes = [...new Set(this.data.map(item => item.emission_type))].sort();
    this.uniqueActivities = [...new Set(this.data.map(item => item.activity))].sort();

    if (this.data.length > 0) {
      const years = this.data.map(item => item.year);
      this.yearRange = [Math.min(...years), Math.max(...years)];
    }
  }

  get filteredData(): Emission[] {
    return this.data.filter(item => {
      if (this.tableFilters.search) {
        const searchLower = this.tableFilters.search.toLowerCase();
        const matchesSearch =
          item.country.toLowerCase().includes(searchLower) ||
          item.activity.toLowerCase().includes(searchLower) ||
          item.emission_type.toLowerCase().includes(searchLower) ||
          item.year.toString().includes(searchLower) ||
          item.emissions.toString().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (this.tableFilters.countries.length > 0 && !this.tableFilters.countries.includes(item.country)) {
        return false;
      }

      if (this.tableFilters.types.length > 0 && !this.tableFilters.types.includes(item.emission_type)) {
        return false;
      }

      if (this.tableFilters.activities.length > 0 && !this.tableFilters.activities.includes(item.activity)) {
        return false;
      }

      if (this.tableFilters.yearFrom !== null && item.year < this.tableFilters.yearFrom) {
        return false;
      }

      if (this.tableFilters.yearTo !== null && item.year > this.tableFilters.yearTo) {
        return false;
      }

      return true;
    });
  }

  get sortedData(): Emission[] {
    const data = [...this.filteredData];
    return data.sort((a, b) => {
      let comparison = 0;

      switch (this.tableFilters.sortBy) {
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

      return this.tableFilters.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  get paginatedData(): Emission[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sortedData.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.sortedData.length / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    const end = this.currentPage * this.itemsPerPage;
    return Math.min(end, this.sortedData.length);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): (number | null)[] {
    const pages: (number | null)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(null);
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(null);
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(total);
      }
    }

    return pages;
  }

  getEmissionTypeBadgeClass(type: string): string {
    return getEmissionTypeBadgeVariant(type);
  }

  onSearchChange(value: string | number): void {
    this.tableFilters.search = String(value);
    this.currentPage = 1;
  }

  toggleCountry(country: string): void {
    const index = this.tableFilters.countries.indexOf(country);
    if (index > -1) {
      this.tableFilters.countries = this.tableFilters.countries.filter(c => c !== country);
    } else {
      this.tableFilters.countries = [...this.tableFilters.countries, country];
    }
    this.currentPage = 1;
  }

  toggleType(type: string): void {
    const index = this.tableFilters.types.indexOf(type);
    if (index > -1) {
      this.tableFilters.types = this.tableFilters.types.filter(t => t !== type);
    } else {
      this.tableFilters.types = [...this.tableFilters.types, type];
    }
    this.currentPage = 1;
  }

  toggleActivity(activity: string): void {
    const index = this.tableFilters.activities.indexOf(activity);
    if (index > -1) {
      this.tableFilters.activities = this.tableFilters.activities.filter(a => a !== activity);
    } else {
      this.tableFilters.activities = [...this.tableFilters.activities, activity];
    }
    this.currentPage = 1;
  }

  onYearFromChange(value: string | number): void {
    const year = typeof value === 'string' ? parseInt(value, 10) : value;
    this.tableFilters.yearFrom = isNaN(year) ? null : year;
    this.currentPage = 1;
  }

  onYearToChange(value: string | number): void {
    const year = typeof value === 'string' ? parseInt(value, 10) : value;
    this.tableFilters.yearTo = isNaN(year) ? null : year;
    this.currentPage = 1;
  }

  setSortBy(field: 'year' | 'country' | 'activity' | 'type' | 'emissions'): void {
    if (this.tableFilters.sortBy === field) {
      this.tableFilters.sortOrder = this.tableFilters.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.tableFilters.sortBy = field;
      this.tableFilters.sortOrder = 'asc';
    }
  }

  clearTableFilters(): void {
    this.tableFilters = {
      search: '',
      countries: [],
      types: [],
      activities: [],
      yearFrom: null,
      yearTo: null,
      sortBy: 'year',
      sortOrder: 'desc'
    };
    this.currentPage = 1;
  }

  get hasTableFilters(): boolean {
    return !!(
      this.tableFilters.search ||
      this.tableFilters.countries.length > 0 ||
      this.tableFilters.types.length > 0 ||
      this.tableFilters.activities.length > 0 ||
      this.tableFilters.yearFrom !== null ||
      this.tableFilters.yearTo !== null
    );
  }

  toggleFiltersExpand(): void {
    this.isFiltersExpanded = !this.isFiltersExpanded;
  }
}

