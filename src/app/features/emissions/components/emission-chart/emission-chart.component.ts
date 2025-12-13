import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmissionDataService } from '../../../../core/services/emission-data.service';
import { Emission, AggregatedData, FilterState, EmissionType } from '../../../../core/models';
import { HeaderComponent } from '../header/header.component';
import { StatCardComponent } from '../stat-card/stat-card.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { EmissionsLineChartComponent } from '../emissions-line-chart/emissions-line-chart.component';
import { EmissionsByCountryChartComponent } from '../emissions-by-country-chart/emissions-by-country-chart.component';
import { EmissionsTableComponent } from '../emissions-table/emissions-table.component';

interface FilterBarData {
  filters: FilterState;
  countries: string[];
  activities: string[];
  emissionTypes: EmissionType[];
  yearRange: [number, number];
  emissionsRange: [number, number];
}

@Component({
  selector: 'app-emission-chart',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    StatCardComponent,
    FilterBarComponent,
    EmissionsLineChartComponent,
    EmissionsByCountryChartComponent,
    EmissionsTableComponent
  ],
  templateUrl: './emission-chart.component.html',
  styleUrl: './emission-chart.component.scss'
})
export class EmissionChartComponent implements OnInit {
  data$: Observable<Emission[]>;
  aggregatedData$: Observable<AggregatedData>;
  filterBarData$: Observable<FilterBarData>;

  constructor(private emissionsService: EmissionDataService) {
    this.data$ = this.emissionsService.filteredData$;
    this.aggregatedData$ = this.emissionsService.aggregatedData$;
    
    this.filterBarData$ = combineLatest([
      this.emissionsService.filters$,
      this.emissionsService.uniqueCountries$,
      this.emissionsService.uniqueActivities$,
      this.emissionsService.uniqueEmissionTypes$,
      this.emissionsService.yearRange$,
      this.emissionsService.emissionsRange$
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

  ngOnInit(): void {}

  onFiltersChange(filters: FilterState): void {
    this.emissionsService.setFilters(filters);
  }
}
