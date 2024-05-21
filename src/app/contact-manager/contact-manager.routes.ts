import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactManagerComponent } from './contact-manager.component';
import { ContactManagerService } from './contact-manager.service';
import { ContactManagerEffects, contactManagerFeature } from './store';

const routes: Routes = [
  {
    path: '',
    component: ContactManagerComponent,
    providers: [
      provideEffects([ContactManagerEffects]),
      provideState(contactManagerFeature),
      ContactManagerService,
    ],
    children: [
      { path: ':userId', component: MainContentComponent },
      { path: '', component: MainContentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

export default routes;
