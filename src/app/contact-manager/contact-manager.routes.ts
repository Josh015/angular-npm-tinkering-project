import { Routes } from '@angular/router';

import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactManagerComponent } from './contact-manager.component';
import { USER_ID_PARAM } from './models';
import { UserService } from './services/user.service';

export const routes: Routes = [
  {
    path: '',
    component: ContactManagerComponent,
    providers: [UserService],
    children: [
      {
        path: `:${USER_ID_PARAM}`,
        component: MainContentComponent
      },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
export default routes;
