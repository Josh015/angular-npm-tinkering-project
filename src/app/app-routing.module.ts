import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contact-manager',
    loadChildren: () =>
      import('./features/contact-manager/contact-manager.module').then(
        (m) => m.ContactManagerModule
      ),
  },
  { path: '**', redirectTo: 'contact-manager' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
