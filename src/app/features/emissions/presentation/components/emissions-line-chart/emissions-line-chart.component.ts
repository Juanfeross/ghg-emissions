import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild, effect } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataPoint } from '../../../domain/models';
import { ThemeService } from '../../../../../core/services/theme.service';
import { ChartConfigService } from '../../../../../shared/chart/chart-config.service';
import { ChartRegistryService } from '../../../../../shared/chart/chart-registry.service';

@Component({
  selector: 'app-emissions-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './emissions-line-chart.component.html',
  styleUrl: './emissions-line-chart.component.scss'
})
export class EmissionsLineChartComponent implements OnInit, OnChanges {
  @Input() data: ChartDataPoint[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {};

  private getChartOptions(): ChartConfiguration['options'] {
    return this.chartConfigService.getLineChartOptions();
  }

  public lineChartType: ChartType = 'line';

  constructor(
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService,
    private chartConfigService: ChartConfigService,
    private chartRegistryService: ChartRegistryService
  ) {
    this.lineChartOptions = this.getChartOptions();

    effect(() => {
      this.themeService.currentTheme();
      this.lineChartOptions = this.getChartOptions();
      if (this.chart?.chart) {
        this.chart.update();
      }
    });
  }

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChartData();
      this.cdr.detectChanges();
      setTimeout(() => {
        if (this.chart && this.chart.chart) {
          this.chart.update();
        }
      }, 0);
    }
  }


  private updateChartData(): void {
    if (!this.data || this.data.length === 0) {
      this.lineChartData = {
        labels: [],
        datasets: []
      };
      return;
    }

    const labels = this.data.map(d => d.year.toString());
    const co2Data = this.data.map(d => d.CO2 || 0);
    const n2oData = this.data.map(d => d.N2O || 0);
    const ch4Data = this.data.map(d => d.CH4 || 0);

    this.lineChartData = {
      labels: [...labels],
      datasets: [
        {
          data: [...co2Data],
          label: 'CO2',
          borderColor: 'hsl(142, 76%, 36%)',
          backgroundColor: 'hsla(142, 76%, 36%, 0.15)',
          fill: true,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: 'hsl(142, 76%, 36%)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'hsl(142, 76%, 36%)',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          tension: 0.4
        },
        {
          data: [...n2oData],
          label: 'N2O',
          borderColor: 'hsl(199, 89%, 58%)',
          backgroundColor: 'hsla(199, 89%, 58%, 0.15)',
          fill: true,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: 'hsl(199, 89%, 58%)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'hsl(199, 89%, 58%)',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          tension: 0.4
        },
        {
          data: [...ch4Data],
          label: 'CH4',
          borderColor: 'hsl(25, 95%, 53%)',
          backgroundColor: 'hsla(25, 95%, 53%, 0.15)',
          fill: true,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: 'hsl(25, 95%, 53%)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'hsl(25, 95%, 53%)',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
          tension: 0.4
        }
      ]
    };
  }
}

