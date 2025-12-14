import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Emission } from '../domain/models/emission.model';

@Injectable({
  providedIn: 'root'
})
export class EmissionsDatasource {
  constructor(private http: HttpClient) {}

  loadEmissions(): Observable<Emission[]> {
    return this.http.get<Emission[]>('/assets/data/emissions.json').pipe(
      shareReplay(1)
    );
  }
}

