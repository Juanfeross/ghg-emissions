import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements AfterViewInit {
  protected readonly title = signal('ghg-emissions');

  ngAfterViewInit(): void {
    // Hide initial loader once Angular is fully rendered
    // Wait a bit to ensure content is visible for Lighthouse
    setTimeout(() => {
      const loader = document.getElementById('initial-loader');
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
          if (loader.parentNode) {
            loader.remove();
          }
        }, 500);
      }
    }, 800);
  }
}
