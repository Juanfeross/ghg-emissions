import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Emission, TableFilters } from '../../../domain/models';
import { BadgeComponent } from '../../../../../shared/ui/badge/badge.component';
import { InputComponent } from '../../../../../shared/ui/input/input.component';
import { EmptyStateComponent } from '../../../../../shared/ui/empty-state/empty-state.component';
import { getEmissionTypeBadgeVariant } from '../../../../../shared/utils/badge.util';
import { TableDataResult, processTableData, getPageNumbers } from '../../../domain/utils/table-data.util';

@Component({
  selector: 'app-emissions-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BadgeComponent,
    InputComponent,
    EmptyStateComponent
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

  tableResult: TableDataResult = {
    filteredData: [],
    sortedData: [],
    paginatedData: [],
    totalPages: 0,
    startItem: 0,
    endItem: 0,
    uniqueCountries: [],
    uniqueTypes: [],
    uniqueActivities: [],
    yearRange: [2015, 2023]
  };

  isFiltersExpanded = false;


  ngOnInit(): void {
    this.updateTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.currentPage = 1;
    }
    this.updateTableData();
  }

  updateTableData(): void {
    this.tableResult = processTableData(
      this.data,
      this.tableFilters,
      this.currentPage,
      this.itemsPerPage
    );
  }

  get paginatedData(): Emission[] {
    return this.tableResult.paginatedData;
  }

  get totalPages(): number {
    return this.tableResult.totalPages;
  }

  get startItem(): number {
    return this.tableResult.startItem;
  }

  get endItem(): number {
    return this.tableResult.endItem;
  }

  get uniqueCountries(): string[] {
    return this.tableResult.uniqueCountries;
  }

  get uniqueTypes(): string[] {
    return this.tableResult.uniqueTypes;
  }

  get uniqueActivities(): string[] {
    return this.tableResult.uniqueActivities;
  }

  get yearRange(): [number, number] {
    return this.tableResult.yearRange;
  }

  get sortedDataLength(): number {
    return this.tableResult.sortedData.length;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTableData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateTableData();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTableData();
    }
  }

  getPageNumbers(): (number | null)[] {
    return getPageNumbers(this.currentPage, this.totalPages);
  }

  getEmissionTypeBadgeClass(type: string): string {
    return getEmissionTypeBadgeVariant(type);
  }

  onSearchChange(value: string | number): void {
    this.tableFilters.search = String(value);
    this.currentPage = 1;
    this.updateTableData();
  }

  toggleCountry(country: string): void {
    const index = this.tableFilters.countries.indexOf(country);
    if (index > -1) {
      this.tableFilters.countries = this.tableFilters.countries.filter((c: string) => c !== country);
    } else {
      this.tableFilters.countries = [...this.tableFilters.countries, country];
    }
    this.currentPage = 1;
    this.updateTableData();
  }

  toggleType(type: string): void {
    const index = this.tableFilters.types.indexOf(type);
    if (index > -1) {
      this.tableFilters.types = this.tableFilters.types.filter((t: string) => t !== type);
    } else {
      this.tableFilters.types = [...this.tableFilters.types, type];
    }
    this.currentPage = 1;
    this.updateTableData();
  }

  toggleActivity(activity: string): void {
    const index = this.tableFilters.activities.indexOf(activity);
    if (index > -1) {
      this.tableFilters.activities = this.tableFilters.activities.filter((a: string) => a !== activity);
    } else {
      this.tableFilters.activities = [...this.tableFilters.activities, activity];
    }
    this.currentPage = 1;
    this.updateTableData();
  }

  onYearFromChange(value: string | number): void {
    const year = typeof value === 'string' ? parseInt(value, 10) : value;
    this.tableFilters.yearFrom = isNaN(year) ? null : year;
    this.currentPage = 1;
    this.updateTableData();
  }

  onYearToChange(value: string | number): void {
    const year = typeof value === 'string' ? parseInt(value, 10) : value;
    this.tableFilters.yearTo = isNaN(year) ? null : year;
    this.currentPage = 1;
    this.updateTableData();
  }

  setSortBy(field: 'year' | 'country' | 'activity' | 'type' | 'emissions'): void {
    if (this.tableFilters.sortBy === field) {
      this.tableFilters.sortOrder = this.tableFilters.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.tableFilters.sortBy = field;
      this.tableFilters.sortOrder = 'asc';
    }
    this.updateTableData();
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
    this.updateTableData();
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

