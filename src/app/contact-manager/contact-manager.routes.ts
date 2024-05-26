import { Routes } from '@angular/router';

import {
  MainContentComponent,
  USER_ID,
} from './components/main-content/main-content.component';
import { ContactManagerComponent } from './contact-manager.component';
import { UserService } from './services/user.service';

export const routes: Routes = [
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
export default routes;
