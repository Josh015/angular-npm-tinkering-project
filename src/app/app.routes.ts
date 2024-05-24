import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contact-manager',
    loadChildren: async () =>
      import('./contact-manager/contact-manager.routes').then(
        (r) => r.CONTACT_MANAGER_ROUTES,
      ),
  },
  { path: '**', redirectTo: 'contact-manager' },
];
