import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value: string | number = '';
  @Input() subtitle = '';
  @Input() delay = 0;

  get displayValue(): string {
    return typeof this.value === 'number' ? this.value.toFixed(2) : this.value;
  }

  get animationDelay(): string {
    return `${this.delay}ms`;
  }
}

