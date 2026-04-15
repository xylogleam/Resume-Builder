import {Routes} from '@angular/router';
import { LandingComponent } from './pages/landing';
import { DashboardComponent } from './pages/dashboard';
import { BuilderComponent } from './pages/builder';
import { AboutComponent } from './pages/about';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'builder/:id', component: BuilderComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
