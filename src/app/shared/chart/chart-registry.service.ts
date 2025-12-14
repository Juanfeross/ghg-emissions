import { Injectable } from '@angular/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartRegistryService {
  private static registered = false;

  constructor() {
    if (!ChartRegistryService.registered) {
      this.registerChartComponents();
      ChartRegistryService.registered = true;
    }
  }

  private registerChartComponents(): void {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      LineController,
      BarElement,
      BarController,
      Title,
      Tooltip,
      Legend
    );
  }
}

