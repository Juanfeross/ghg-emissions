import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Emission, EmissionType } from '../models/emission.interface';
import { FilterState, AggregatedData, ChartDataPoint } from '../models/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class EmissionDataService {
  private dataSubject = new BehaviorSubject<Emission[]>([]);
  private filtersSubject = new BehaviorSubject<FilterState>({
    country: null,
    emissionType: null,
    activity: null,
    yearRange: null,
  });

  data$ = this.dataSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmissions().subscribe({
      next: (data) => {
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('Error loading emissions data:', error);
        this.dataSubject.next([]);
      }
    });
  }

  loadEmissions(): Observable<Emission[]> {
    return this.http.get<Emission[]>('/assets/data/emissions.json').pipe(
      shareReplay(1)
    );
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
        return this.filterData(data, filters);
      })
    );
  }

  get aggregatedData$(): Observable<AggregatedData> {
    return this.filteredData$.pipe(
      map(filteredData => this.aggregateData(filteredData))
    );
  }

  get uniqueCountries$(): Observable<string[]> {
    return this.data$.pipe(
      map(data => [...new Set(data.map(item => item.country))].sort())
    );
  }

  get uniqueActivities$(): Observable<string[]> {
    return this.data$.pipe(
      map(data => [...new Set(data.map(item => item.activity))].sort())
    );
  }

  get uniqueEmissionTypes$(): Observable<EmissionType[]> {
    return this.data$.pipe(
      map(data => [...new Set(data.map(item => item.emission_type))] as EmissionType[])
    );
  }

  private filterData(data: Emission[], filters: FilterState): Emission[] {
    return data.filter(item => {
      if (filters.country && item.country !== filters.country) return false;
      if (filters.emissionType && item.emission_type !== filters.emissionType) return false;
      if (filters.activity && item.activity !== filters.activity) return false;
      if (filters.yearRange) {
        if (item.year < filters.yearRange[0] || item.year > filters.yearRange[1]) return false;
      }
      return true;
    });
  }

  private aggregateData(filteredData: Emission[]): AggregatedData {
    const totalEmissions = filteredData.reduce((sum, item) => sum + item.emissions, 0);
    const averageEmissions = filteredData.length > 0 ? totalEmissions / filteredData.length : 0;

    const maxEmission = filteredData.reduce<Emission | null>((max, item) => {
      if (!max || item.emissions > max.emissions) return item;
      return max;
    }, null);

    const emissionsByType = filteredData.reduce<Record<string, number>>((acc, item) => {
      acc[item.emission_type] = (acc[item.emission_type] || 0) + item.emissions;
      return acc;
    }, {});

    const emissionsByCountry = filteredData.reduce<Record<string, number>>((acc, item) => {
      acc[item.country] = (acc[item.country] || 0) + item.emissions;
      return acc;
    }, {});

    const yearMap = new Map<number, ChartDataPoint>();
    filteredData.forEach(item => {
      const existing = yearMap.get(item.year) || { year: item.year };

      if (item.emission_type === 'CO2') {
        existing.CO2 = ((existing.CO2 || 0) + item.emissions);
      } else if (item.emission_type === 'N2O') {
        existing.N2O = ((existing.N2O || 0) + item.emissions);
      } else if (item.emission_type === 'CH4') {
        existing.CH4 = ((existing.CH4 || 0) + item.emissions);
      }

      existing.total = (existing.total || 0) + item.emissions;
      yearMap.set(item.year, existing);
    });

    const emissionsByYear = Array.from(yearMap.values()).sort((a, b) => a.year - b.year);

    return {
      totalEmissions,
      averageEmissions,
      maxEmission,
      emissionsByType,
      emissionsByCountry,
      emissionsByYear,
    };
  }
}
