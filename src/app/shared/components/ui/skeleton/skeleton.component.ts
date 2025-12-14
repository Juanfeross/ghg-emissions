import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {
  @Input() variant: 'text' | 'circular' | 'rectangular' = 'text';
  @Input() width: string | number = '100%';
  @Input() height: string | number = '1rem';
  @Input() className = '';
}

