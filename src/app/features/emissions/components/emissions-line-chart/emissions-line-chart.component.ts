import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild, effect } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartDataPoint } from '../../../../core/models';
import { ThemeService } from '../../../../core/services/theme.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

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
    const isDark = this.themeService.isDarkMode();
    const textColor = this.getCSSVariableValue('--muted-foreground');
    const foregroundColor = this.getCSSVariableValue('--foreground');

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 13,
              weight: 500
            },
            color: foregroundColor
          }
        },
        tooltip: {
          backgroundColor: isDark ? 'hsl(150, 15%, 12%)' : 'hsl(0, 0%, 100%)',
          borderColor: isDark ? 'hsl(var(--border))' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          titleColor: isDark ? 'hsl(150, 10%, 95%)' : 'hsl(0, 0%, 0%)',
          bodyColor: isDark ? 'hsl(150, 10%, 95%)' : 'hsl(0, 0%, 0%)',
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          boxPadding: 6,
          boxShadow: isDark
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.3)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
        } as any
      },
      scales: {
        x: {
          grid: {
            color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            lineWidth: 1
          },
          ticks: {
            color: textColor,
            font: { size: 12 }
          },
          border: {
            display: false
          }
        },
        y: {
          grid: {
            color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            lineWidth: 1
          },
          ticks: {
            color: textColor,
            font: { size: 12 },
            callback: (value) => `${value} Mt`
          },
          border: {
            display: false
          }
        }
      }
    };
  }

  public lineChartType: ChartType = 'line';

  constructor(
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService
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

  private getCSSVariableValue(variable: string): string {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return '#000000';
    }
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(variable).trim();
    if (value && !value.startsWith('hsl')) {
      return `hsl(${value})`;
    }
    return value || '#000000';
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

