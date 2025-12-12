import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterState, EmissionType } from '../../../../core/models';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { SelectComponent } from '../../../../shared/components/ui/select/select.component';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SelectComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Input() filters!: FilterState;
  @Input() countries: string[] = [];
  @Input() activities: string[] = [];
  @Input() emissionTypes: EmissionType[] = [];
  @Output() filtersChange = new EventEmitter<FilterState>();

  get hasActiveFilters(): boolean {
    return !!(this.filters.country || this.filters.emissionType || this.filters.activity);
  }

  get selectedCountry(): string {
    return this.filters.country || 'all';
  }

  get selectedEmissionType(): string {
    return this.filters.emissionType || 'all';
  }

  get selectedActivity(): string {
    return this.filters.activity || 'all';
  }

  onCountryChange(value: string): void {
    this.filtersChange.emit({
      ...this.filters,
      country: value === 'all' ? null : value
    });
    this.closeSelects();
  }

  onEmissionTypeChange(value: string): void {
    this.filtersChange.emit({
      ...this.filters,
      emissionType: value === 'all' ? null : value
    });
    this.closeSelects();
  }

  onActivityChange(value: string): void {
    this.filtersChange.emit({
      ...this.filters,
      activity: value === 'all' ? null : value
    });
    this.closeSelects();
  }

  private closeSelects(): void {
    const selects = document.querySelectorAll('.select');
    selects.forEach((select: Element) => {
      const button = select.querySelector('.select__trigger');
      if (button) {
        (button as HTMLElement).blur();
      }
    });
  }

  clearFilters(): void {
    this.filtersChange.emit({
      country: null,
      emissionType: null,
      activity: null,
      yearRange: null,
    });
  }
}

