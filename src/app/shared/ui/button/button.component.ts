import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn.util';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  @Input() className = '';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;

  get buttonClasses(): string {
    return cn(
      'button',
      `button--${this.variant}`,
      `button--${this.size}`,
      this.disabled && 'button--disabled',
      this.className
    );
  }
}

