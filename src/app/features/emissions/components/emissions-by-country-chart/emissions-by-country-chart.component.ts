import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild, effect } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ThemeService } from '../../../../core/services/theme.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

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
    const isDark = this.themeService.isDarkMode();
    const textColor = this.getCSSVariableValue('--muted-foreground');
    const foregroundColor = this.getCSSVariableValue('--foreground');

    return {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
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
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          callbacks: {
            label: (context: any) => context.parsed.x ? `${context.parsed.x.toFixed(2)} Mt` : '0 Mt'
          }
        } as any
      },
      scales: {
        x: {
          type: 'linear',
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
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: textColor,
            font: { size: 12 }
          },
          border: {
            display: false
          }
        }
      }
    };
  }

  public barChartType: ChartType = 'bar';

  constructor(
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService
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

