import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emission } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmissionDataService {
  constructor(private http: HttpClient) {}

  loadEmissions(): Observable<Emission[]> {
    return this.http.get<Emission[]>('/assets/data/emissions.json');
  }
}

