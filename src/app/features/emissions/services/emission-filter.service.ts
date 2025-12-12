import { Injectable } from '@angular/core';
import { Emission, FilterCriteria } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class EmissionFilterService {
  applyFilters(emissions: Emission[], criteria: FilterCriteria): Emission[] {
    return emissions;
  }
}

