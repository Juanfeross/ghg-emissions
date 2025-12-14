import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ThemeService } from '../../core/services/theme.service';
import { getCSSVariableValue } from '../utils/css.util';

@Injectable({
  providedIn: 'root'
})
export class ChartConfigService {
  constructor(private themeService: ThemeService) {}

  getBaseChartOptions(): ChartConfiguration['options'] {
    const isDark = this.themeService.isDarkMode();
    const textColor = getCSSVariableValue('--muted-foreground');
    const foregroundColor = getCSSVariableValue('--foreground');

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
            font: { size: 12 }
          },
          border: {
            display: false
          }
        }
      }
    };
  }

  getLineChartOptions(): ChartConfiguration['options'] {
    const baseOptions = this.getBaseChartOptions();
    return {
      ...baseOptions,
      scales: {
        ...baseOptions?.scales,
        y: {
          ...(baseOptions?.scales?.['y'] || {}),
          ticks: {
            ...(baseOptions?.scales?.['y']?.ticks || {}),
            callback: (value) => `${value} Mt`
          }
        }
      }
    };
  }

  getBarChartOptions(): ChartConfiguration['options'] {
    const baseOptions = this.getBaseChartOptions();
    return {
      ...baseOptions,
      indexAxis: 'y' as const
    };
  }
}

