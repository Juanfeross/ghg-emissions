import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit, OnDestroy, OnChanges {
  @Input() open = false;
  @Input() title = '';
  @Input() showClose = true;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Output() openChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.open) {
      this.setupDialog();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.open) {
      this.setupDialog();
    } else {
      this.teardownDialog();
    }
  }

  ngOnDestroy(): void {
    this.teardownDialog();
  }

  private setupDialog(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  private teardownDialog(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  handleClose(): void {
    this.open = false;
    this.openChange.emit(false);
    this.close.emit();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.handleClose();
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open) {
      this.handleClose();
    }
  }
}

