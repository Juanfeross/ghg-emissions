import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
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

  public barChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--muted-foreground))',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => context.parsed.x ? `${context.parsed.x.toFixed(2)} Mt` : '0 Mt'
        }
      }
    },
           scales: {
             x: {
               type: 'linear',
               grid: {
                 color: 'rgba(0, 0, 0, 0.08)',
                 lineWidth: 1
               },
               ticks: {
                 color: 'hsl(var(--muted-foreground))',
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
                 color: 'hsl(var(--muted-foreground))',
                 font: { size: 12 }
               },
               border: {
                 display: false
               }
             }
           }
  };

  public barChartType: ChartType = 'bar';

  constructor(private cdr: ChangeDetectorRef) {}

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

