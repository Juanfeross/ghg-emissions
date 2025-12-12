import { Routes } from '@angular/router';
import { emissionsRoutes } from './features/emissions/emissions.routes';

export const routes: Routes = [
  {
    path: 'emissions',
    children: emissionsRoutes
  },
  {
    path: '',
    redirectTo: '/emissions',
    pathMatch: 'full'
  }
];
