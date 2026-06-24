import { Routes } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { BuilderComponent } from './screens/builder/builder.component';
import { PlayComponent } from './screens/play/play.component';
import { PrintComponent } from './screens/print/print.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'play', component: PlayComponent },
  { path: 'print', component: PrintComponent },
  { path: '**', redirectTo: '' }
];
