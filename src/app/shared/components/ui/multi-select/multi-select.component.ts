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
  private focusedOptionIndex: number = -1;
  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('optionsContainer') optionsContainerRef?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isOpen && this.containerRef && !this.containerRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  toggle(event: MouseEvent | KeyboardEvent): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchQuery = '';
      this.updateFilteredOptions();
      this.focusedOptionIndex = -1;
      setTimeout(() => {
        if (this.searchInputRef?.nativeElement) {
          this.searchInputRef.nativeElement.focus();
        }
      }, 0);
    }
  }

  handleTriggerKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.isOpen) {
        this.toggle(event);
      }
    } else if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  close(): void {
    this.isOpen = false;
    this.searchQuery = '';
    this.updateFilteredOptions();
  }

  onSearchInput(): void {
    this.updateFilteredOptions();
    this.focusedOptionIndex = -1;
  }

  focusFirstOption(): void {
    if (this.filteredOptions.length > 0) {
      this.focusedOptionIndex = 0;
      this.scrollToOption(0);
    }
  }

  handleOptionKeyDown(event: KeyboardEvent, option: string, index: number): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleOption(option);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (index < this.filteredOptions.length - 1) {
          this.focusedOptionIndex = index + 1;
          this.scrollToOption(this.focusedOptionIndex);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (index > 0) {
          this.focusedOptionIndex = index - 1;
          this.scrollToOption(this.focusedOptionIndex);
        } else {
          this.focusedOptionIndex = -1;
          if (this.searchInputRef?.nativeElement) {
            this.searchInputRef.nativeElement.focus();
          }
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusedOptionIndex = 0;
        this.scrollToOption(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusedOptionIndex = this.filteredOptions.length - 1;
        this.scrollToOption(this.focusedOptionIndex);
        break;
    }
  }

  handleSearchKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusFirstOption();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  private scrollToOption(index: number): void {
    setTimeout(() => {
      const optionElements = this.optionsContainerRef?.nativeElement?.querySelectorAll('.multi-select__option');
      if (optionElements && optionElements[index]) {
        (optionElements[index] as HTMLElement).focus();
      }
    }, 0);
  }

  isFocused(index: number): boolean {
    return this.focusedOptionIndex === index;
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

