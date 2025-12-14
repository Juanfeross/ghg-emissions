import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild, effect } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ThemeService } from '../../../../../core/services/theme.service';
import { ChartConfigService } from '../../../../../shared/chart/chart-config.service';
import { ChartRegistryService } from '../../../../../shared/chart/chart-registry.service';

const COLORS = [
  'hsl(142, 76%, 36%)',
  'hsl(199, 89%, 58%)',
  'hsl(25, 95%, 53%)',
  'hsl(180, 70%, 45%)',
  'hsl(280, 65%, 60%)',
  'hsl(340, 82%, 52%)',
  'hsl(12, 76%, 61%)',
  'hsl(262, 83%, 58%)',
];

@Component({
  selector: 'app-emissions-by-country-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './emissions-by-country-chart.component.html',
  styleUrl: './emissions-by-country-chart.component.scss'
})
export class EmissionsByCountryChartComponent implements OnInit, OnChanges {
  @Input() data: Record<string, number> = {};
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public barChartOptions: ChartConfiguration['options'] = {};

  private getChartOptions(): ChartConfiguration['options'] {
    const baseOptions = this.chartConfigService.getBarChartOptions();
    return {
      ...baseOptions,
      plugins: {
        ...baseOptions?.plugins,
        legend: {
          display: false
        },
        tooltip: {
          ...baseOptions?.plugins?.tooltip,
          callbacks: {
            label: (context: any) => context.parsed.x ? `${context.parsed.x.toFixed(2)} Mt` : '0 Mt'
          }
        } as any
      },
      scales: {
        ...baseOptions?.scales,
        x: {
          ...(baseOptions?.scales?.['x'] || {}),
          type: 'linear' as const,
          ticks: {
            ...(baseOptions?.scales?.['x']?.ticks || {}),
            callback: (value: any) => `${value} Mt`
          }
        },
        y: {
          ...(baseOptions?.scales?.['y'] || {}),
          grid: {
            display: false
          }
        }
      } as any
    };
  }

  public barChartType: ChartType = 'bar';

  constructor(
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService,
    private chartConfigService: ChartConfigService,
    private chartRegistryService: ChartRegistryService
  ) {
    this.barChartOptions = this.getChartOptions();

    effect(() => {
      this.themeService.currentTheme();
      this.barChartOptions = this.getChartOptions();
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
    if (!this.data || Object.keys(this.data).length === 0) {
      this.barChartData = {
        labels: [],
        datasets: []
      };
      return;
    }

    const chartData = Object.entries(this.data)
      .map(([country, emissions]) => ({ country, emissions }))
      .sort((a, b) => b.emissions - a.emissions);

    const labels = chartData.map(e => e.country);
    const values = chartData.map(e => e.emissions);
    const backgroundColors = chartData.map((_, index) =>
      COLORS[index % COLORS.length]
    );

           this.barChartData = {
             labels: [...labels],
             datasets: [{
               data: [...values],
               backgroundColor: [...backgroundColors],
               borderColor: [...backgroundColors.map(c => c.replace(')', ', 0.95)'))],
               borderWidth: 2,
               borderRadius: 6,
               borderSkipped: false,
               barThickness: 'flex',
               maxBarThickness: 40
             }]
           };
  }
}

