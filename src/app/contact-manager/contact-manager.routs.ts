import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { ContactManagerComponent } from './contact-manager.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactManagerEffects, contactManagerFeature } from './store';
import { UsersService } from './services/users.service';
import { UsersConstants } from './services/users-constants';

const routes: Routes = [
  {
    path: '',
    component: ContactManagerComponent,
    providers: [
      provideEffects([ContactManagerEffects]),
      provideState(contactManagerFeature),
      UsersConstants,
      UsersService,
    ],
    children: [
      { path: ':userId', component: MainContentComponent },
      { path: '', component: MainContentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

export default routes;
