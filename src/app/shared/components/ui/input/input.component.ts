import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string | number = '';
  @Input() className: string = '';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() id?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Output() valueChange = new EventEmitter<string | number>();
  @Output() inputChange = new EventEmitter<Event>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = this.type === 'number' ? parseFloat(target.value) || 0 : target.value;
    this.valueChange.emit(newValue);
    this.inputChange.emit(event);
  }
}

