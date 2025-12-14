export interface Emission {
  year: number;
  emissions: number;
  emission_type: string;
  country: string;
  activity: string;
}

export type EmissionType = 'CO2' | 'N2O' | 'CH4';

