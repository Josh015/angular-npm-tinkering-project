import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contact-manager',
    loadChildren: async () => import('./contact-manager/contact-manager.routes')
  },
  { path: '**', redirectTo: 'contact-manager' }
];
