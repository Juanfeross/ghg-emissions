import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterState, EmissionType } from '../../../domain/models';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { MultiSelectComponent } from '../../../../../shared/ui/multi-select/multi-select.component';
import { InputComponent } from '../../../../../shared/ui/input/input.component';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MultiSelectComponent, InputComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Input() filters!: FilterState;
  @Input() countries: string[] = [];
  @Input() activities: string[] = [];
  @Input() emissionTypes: EmissionType[] = [];
  @Input() yearRange: [number, number] = [2015, 2023];
  @Input() emissionsRange: [number, number] = [0, 10];
  @Output() filtersChange = new EventEmitter<FilterState>();

  isExpanded = false;

  get hasActiveFilters(): boolean {
    return (
      this.filters.countries.length > 0 ||
      this.filters.emissionTypes.length > 0 ||
      this.filters.activities.length > 0 ||
      this.filters.yearRange !== null ||
      this.filters.minEmissions !== null ||
      this.filters.maxEmissions !== null
    );
  }

  onCountriesChange(countries: string[]): void {
    this.filtersChange.emit({
      ...this.filters,
      countries
    });
  }

  onEmissionTypesChange(types: string[]): void {
    this.filtersChange.emit({
      ...this.filters,
      emissionTypes: types
    });
  }

  onActivitiesChange(activities: string[]): void {
    this.filtersChange.emit({
      ...this.filters,
      activities
    });
  }

  onYearMinChange(value: string | number): void {
    const minYear = typeof value === 'string' ? parseInt(value, 10) : value;
    const maxYear = this.filters.yearRange ? this.filters.yearRange[1] : this.yearRange[1];

    if (isNaN(minYear) || minYear < this.yearRange[0]) {
      this.filtersChange.emit({
        ...this.filters,
        yearRange: null
      });
      return;
    }

    this.filtersChange.emit({
      ...this.filters,
      yearRange: [minYear, maxYear]
    });
  }

  onYearMaxChange(value: string | number): void {
    const maxYear = typeof value === 'string' ? parseInt(value, 10) : value;
    const minYear = this.filters.yearRange ? this.filters.yearRange[0] : this.yearRange[0];

    if (isNaN(maxYear) || maxYear > this.yearRange[1]) {
      this.filtersChange.emit({
        ...this.filters,
        yearRange: null
      });
      return;
    }

    this.filtersChange.emit({
      ...this.filters,
      yearRange: [minYear, maxYear]
    });
  }

  onMinEmissionsChange(value: string | number): void {
    const minEmissions = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(minEmissions) || minEmissions < this.emissionsRange[0]) {
      this.filtersChange.emit({
        ...this.filters,
        minEmissions: null
      });
      return;
    }

    this.filtersChange.emit({
      ...this.filters,
      minEmissions
    });
  }

  onMaxEmissionsChange(value: string | number): void {
    const maxEmissions = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(maxEmissions) || maxEmissions > this.emissionsRange[1]) {
      this.filtersChange.emit({
        ...this.filters,
        maxEmissions: null
      });
      return;
    }

    this.filtersChange.emit({
      ...this.filters,
      maxEmissions
    });
  }

  clearFilters(): void {
    this.filtersChange.emit({
      countries: [],
      emissionTypes: [],
      activities: [],
      yearRange: null,
      minEmissions: null,
      maxEmissions: null,
    });
  }

  getActiveFiltersCount(): number {
    let count = 0;
    count += this.filters.countries.length;
    count += this.filters.emissionTypes.length;
    count += this.filters.activities.length;
    if (this.filters.yearRange) count++;
    if (this.filters.minEmissions !== null) count++;
    if (this.filters.maxEmissions !== null) count++;
    return count;
  }

  removeCountryFilter(country: string): void {
    this.onCountriesChange(this.filters.countries.filter(c => c !== country));
  }

  removeTypeFilter(type: string): void {
    this.onEmissionTypesChange(this.filters.emissionTypes.filter(t => t !== type));
  }

  removeActivityFilter(activity: string): void {
    this.onActivitiesChange(this.filters.activities.filter(a => a !== activity));
  }

  removeYearFilter(): void {
    this.filtersChange.emit({
      ...this.filters,
      yearRange: null
    });
  }

  removeMinEmissionsFilter(): void {
    this.filtersChange.emit({
      ...this.filters,
      minEmissions: null
    });
  }

  removeMaxEmissionsFilter(): void {
    this.filtersChange.emit({
      ...this.filters,
      maxEmissions: null
    });
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
