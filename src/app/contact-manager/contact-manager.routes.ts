import { Routes } from '@angular/router';

import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactManagerComponent } from './contact-manager.component';
import { UserService } from './services/user.service';

export const USER_ID = 'userId';
export const CONTACT_MANAGER_ROUTES: Routes = [
  {
    path: '',
    component: ContactManagerComponent,
    providers: [UserService],
    children: [
      { path: `:${USER_ID}`, component: MainContentComponent },
      { path: '', component: MainContentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
