import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emission } from '../domain/models/emission.model';
import { EmissionsDatasource } from './emissions.datasource';

@Injectable({
  providedIn: 'root'
})
export class EmissionsRepository {
  constructor(private datasource: EmissionsDatasource) {}

  getAll(): Observable<Emission[]> {
    return this.datasource.loadEmissions();
  }
}

