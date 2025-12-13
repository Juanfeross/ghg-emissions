import { Injectable } from '@angular/core';
import { Emission, FilterState } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class EmissionFilterService {
  applyFilters(emissions: Emission[], criteria: FilterState): Emission[] {
    return emissions.filter(item => {
      if (criteria.countries.length > 0 && !criteria.countries.includes(item.country)) return false;
      if (criteria.emissionTypes.length > 0 && !criteria.emissionTypes.includes(item.emission_type)) return false;
      if (criteria.activities.length > 0 && !criteria.activities.includes(item.activity)) return false;
      if (criteria.yearRange) {
        if (item.year < criteria.yearRange[0] || item.year > criteria.yearRange[1]) return false;
      }
      if (criteria.minEmissions !== null && item.emissions < criteria.minEmissions) return false;
      if (criteria.maxEmissions !== null && item.emissions > criteria.maxEmissions) return false;
      return true;
    });
  }
}

