import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
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

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--muted-foreground))',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(var(--border))',
          lineWidth: 1
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: { size: 12 }
        }
      },
      y: {
        grid: {
          color: 'hsl(var(--border))',
          lineWidth: 1
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: { size: 12 },
          callback: (value) => `${value} Mt`
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';

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
          borderColor: 'hsl(var(--chart-co2))',
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4
        },
        {
          data: [...n2oData],
          label: 'N2O',
          borderColor: 'hsl(var(--chart-n2o))',
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4
        },
        {
          data: [...ch4Data],
          label: 'CH4',
          borderColor: 'hsl(var(--chart-ch4))',
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4
        }
      ]
    };
  }
}

