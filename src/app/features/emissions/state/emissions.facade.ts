import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Emission, EmissionType } from '../domain/models/emission.model';
import { FilterState, AggregatedData } from '../domain/models/filter.model';
import { EmissionsStore } from './emissions.store';

@Injectable({
  providedIn: 'root'
})
export class EmissionsFacade {
  constructor(private store: EmissionsStore) {}

  get data$(): Observable<Emission[]> {
    return this.store.filteredData$;
  }

  get aggregatedData$(): Observable<AggregatedData> {
    return this.store.aggregatedData$;
  }

  get filters$(): Observable<FilterState> {
    return this.store.filters$;
  }

  get filterBarData$(): Observable<{
    filters: FilterState;
    countries: string[];
    activities: string[];
    emissionTypes: EmissionType[];
    yearRange: [number, number];
    emissionsRange: [number, number];
  }> {
    return combineLatest([
      this.store.filters$,
      this.store.uniqueCountries$,
      this.store.uniqueActivities$,
      this.store.uniqueEmissionTypes$,
      this.store.yearRange$,
      this.store.emissionsRange$
    ]).pipe(
      map(([filters, countries, activities, emissionTypes, yearRange, emissionsRange]) => ({
        filters,
        countries,
        activities,
        emissionTypes,
        yearRange,
        emissionsRange
      }))
    );
  }

  setFilters(filters: FilterState): void {
    this.store.setFilters(filters);
  }
}

