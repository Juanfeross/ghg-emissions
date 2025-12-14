import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Emission, EmissionType } from '../domain/models/emission.model';
import { FilterState, AggregatedData } from '../domain/models/filter.model';
import { applyFilters } from '../domain/utils/emission-filter.util';
import { aggregateData, extractUniqueValues } from '../domain/utils/emission-aggregation.util';
import { EmissionsRepository } from '../data/emissions.repository';

@Injectable({
  providedIn: 'root'
})
export class EmissionsStore {
  private dataSubject = new BehaviorSubject<Emission[]>([]);
  private filtersSubject = new BehaviorSubject<FilterState>({
    countries: [],
    emissionTypes: [],
    activities: [],
    yearRange: null,
    minEmissions: null,
    maxEmissions: null,
  });

  data$ = this.dataSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();

  constructor(private repository: EmissionsRepository) {
    this.repository.getAll().subscribe({
      next: (data) => {
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('Error loading emissions data:', error);
        this.dataSubject.next([]);
      }
    });
  }

  setFilters(filters: FilterState): void {
    this.filtersSubject.next(filters);
  }

  get filteredData$(): Observable<Emission[]> {
    return combineLatest([this.data$, this.filters$]).pipe(
      map(([data, filters]) => {
        if (!data || data.length === 0) {
          return [];
        }
        return applyFilters(data, filters);
      })
    );
  }

  get aggregatedData$(): Observable<AggregatedData> {
    return this.filteredData$.pipe(
      map(filteredData => aggregateData(filteredData))
    );
  }

  get uniqueCountries$(): Observable<string[]> {
    return this.data$.pipe(
      map(data => extractUniqueValues(data).countries)
    );
  }

  get uniqueActivities$(): Observable<string[]> {
    return this.data$.pipe(
      map(data => extractUniqueValues(data).activities)
    );
  }

  get uniqueEmissionTypes$(): Observable<EmissionType[]> {
    return this.data$.pipe(
      map(data => extractUniqueValues(data).emissionTypes as EmissionType[])
    );
  }

  get yearRange$(): Observable<[number, number]> {
    return this.data$.pipe(
      map(data => extractUniqueValues(data).yearRange)
    );
  }

  get emissionsRange$(): Observable<[number, number]> {
    return this.data$.pipe(
      map(data => extractUniqueValues(data).emissionsRange)
    );
  }
}

