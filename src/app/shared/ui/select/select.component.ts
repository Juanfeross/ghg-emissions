import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() value = '';
  @Input() placeholder = 'Select...';
  @Input() className = '';
  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    setTimeout(() => {
      this.isOpen = false;
    }, 150);
  }

  handleOptionClick(): void {
    this.close();
  }
}

