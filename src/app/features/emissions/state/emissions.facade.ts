import { Injectable, computed } from '@angular/core';
import { EmissionType } from '../domain/models/emission.model';
import { FilterState } from '../domain/models/filter.model';
import { EmissionsStore } from './emissions.store';

@Injectable({
  providedIn: 'root'
})
export class EmissionsFacade {
  readonly data;
  readonly aggregatedData;
  readonly filters;
  readonly filterBarData;

  constructor(private store: EmissionsStore) {
    this.data = this.store.filteredData;
    this.aggregatedData = this.store.aggregatedData;
    this.filters = this.store.filters;

    this.filterBarData = computed(() => ({
      filters: this.store.filters(),
      countries: this.store.uniqueCountries(),
      activities: this.store.uniqueActivities(),
      emissionTypes: this.store.uniqueEmissionTypes(),
      yearRange: this.store.yearRange(),
      emissionsRange: this.store.emissionsRange()
    }));
  }

  setFilters(filters: FilterState): void {
    this.store.setFilters(filters);
  }
}

