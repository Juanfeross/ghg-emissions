import { TestBed } from '@angular/core/testing';
import { provideZoneChangeDetection } from '@angular/core';

export function configureTestBed(): typeof TestBed {
  return TestBed.configureTestingModule({
    providers: [provideZoneChangeDetection({ eventCoalescing: true })],
  });
}

