import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() selectedValues: string[] = [];
  @Input() placeholder: string = 'Select...';
  @Input() label: string = '';
  @Input() searchPlaceholder: string = 'Search...';
  @Output() selectionChange = new EventEmitter<string[]>();
  @ViewChild('container') containerRef!: ElementRef;

  isOpen = false;
  searchQuery: string = '';
  filteredOptions: string[] = [];

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isOpen && this.containerRef && !this.containerRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchQuery = '';
      this.updateFilteredOptions();
    }
  }

  close(): void {
    this.isOpen = false;
    this.searchQuery = '';
    this.updateFilteredOptions();
  }

  onSearchInput(): void {
    this.updateFilteredOptions();
  }

  updateFilteredOptions(): void {
    if (!this.searchQuery.trim()) {
      this.filteredOptions = [...this.options];
      return;
    }
    const query = this.searchQuery.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(query)
    );
  }

  toggleOption(option: string): void {
    const index = this.selectedValues.indexOf(option);
    if (index > -1) {
      this.selectedValues = this.selectedValues.filter(v => v !== option);
    } else {
      this.selectedValues = [...this.selectedValues, option];
    }
    this.selectionChange.emit([...this.selectedValues]);
  }

  isSelected(option: string): boolean {
    return this.selectedValues.includes(option);
  }

  getDisplayText(): string {
    if (this.selectedValues.length === 0) {
      return this.placeholder;
    }
    if (this.selectedValues.length === 1) {
      return this.selectedValues[0];
    }
    return `${this.selectedValues.length} selected`;
  }

  removeFilter(value: string, event: Event): void {
    event.stopPropagation();
    this.selectedValues = this.selectedValues.filter(v => v !== value);
    this.selectionChange.emit([...this.selectedValues]);
  }

  selectAll(): void {
    this.selectedValues = [...this.filteredOptions];
    this.selectionChange.emit([...this.selectedValues]);
  }

  clearAll(): void {
    this.selectedValues = [];
    this.selectionChange.emit([]);
  }
}

