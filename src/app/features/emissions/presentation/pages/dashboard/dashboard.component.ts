import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Emission, AggregatedData, FilterState } from '../../../domain/models';
import { EmissionsFacade } from '../../../state/emissions.facade';
import { MainLayoutComponent } from '../../../../../layouts/main-layout/main-layout.component';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { EmissionsLineChartComponent } from '../../components/emissions-line-chart/emissions-line-chart.component';
import { EmissionsByCountryChartComponent } from '../../components/emissions-by-country-chart/emissions-by-country-chart.component';
import { EmissionsTableComponent } from '../../components/emissions-table/emissions-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    StatCardComponent,
    FilterBarComponent,
    EmissionsLineChartComponent,
    EmissionsByCountryChartComponent,
    EmissionsTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data$: Observable<Emission[]>;
  aggregatedData$: Observable<AggregatedData>;
  filterBarData$: Observable<any>;

  constructor(private facade: EmissionsFacade) {
    this.data$ = this.facade.data$;
    this.aggregatedData$ = this.facade.aggregatedData$;
    this.filterBarData$ = this.facade.filterBarData$;
  }

  ngOnInit(): void {}

  onFiltersChange(filters: FilterState): void {
    this.facade.setFilters(filters);
  }
}

