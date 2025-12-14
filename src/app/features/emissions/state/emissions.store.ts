import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Emission, EmissionType } from '../domain/models/emission.model';
import { FilterState, AggregatedData } from '../domain/models/filter.model';
import { applyFilters } from '../domain/utils/emission-filter.util';
import { aggregateData, extractUniqueValues } from '../domain/utils/emission-aggregation.util';
import { EmissionsRepository } from '../data/emissions.repository';

@Injectable({
  providedIn: 'root'
})
export class EmissionsStore {
  private dataSignal: WritableSignal<Emission[]>;
  private filtersSignal = signal<FilterState>({
    countries: [],
    emissionTypes: [],
    activities: [],
    yearRange: null,
    minEmissions: null,
    maxEmissions: null,
  });

  data = computed(() => this.dataSignal());
  filters = computed(() => this.filtersSignal());

  constructor(private repository: EmissionsRepository) {
    this.dataSignal = toSignal(
      this.repository.getAll().pipe(
        catchError((error) => {
          console.error('Error loading emissions data:', error);
          return of([]);
        })
      ),
      { initialValue: [] }
    ) as WritableSignal<Emission[]>;
  }

  setFilters(filters: FilterState): void {
    this.filtersSignal.set(filters);
  }

  filteredData = computed(() => {
    const data = this.dataSignal();
    const filters = this.filtersSignal();
    if (!data || data.length === 0) {
      return [];
    }
    return applyFilters(data, filters);
  });

  aggregatedData = computed(() => {
    const filtered = this.filteredData();
    return aggregateData(filtered);
  });

  uniqueCountries = computed(() => {
    const data = this.dataSignal();
    return extractUniqueValues(data).countries;
  });

  uniqueActivities = computed(() => {
    const data = this.dataSignal();
    return extractUniqueValues(data).activities;
  });

  uniqueEmissionTypes = computed(() => {
    const data = this.dataSignal();
    return extractUniqueValues(data).emissionTypes as EmissionType[];
  });

  yearRange = computed(() => {
    const data = this.dataSignal();
    return extractUniqueValues(data).yearRange;
  });

  emissionsRange = computed(() => {
    const data = this.dataSignal();
    return extractUniqueValues(data).emissionsRange;
  });
}

