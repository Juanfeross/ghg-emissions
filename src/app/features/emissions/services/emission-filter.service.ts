import { Injectable } from '@angular/core';
import { Emission, FilterState } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class EmissionFilterService {
  applyFilters(emissions: Emission[], criteria: FilterState): Emission[] {
    return emissions.filter(item => {
      if (criteria.country && item.country !== criteria.country) return false;
      if (criteria.emissionType && item.emission_type !== criteria.emissionType) return false;
      if (criteria.activity && item.activity !== criteria.activity) return false;
      if (criteria.yearRange) {
        if (item.year < criteria.yearRange[0] || item.year > criteria.yearRange[1]) return false;
      }
      return true;
    });
  }
}

