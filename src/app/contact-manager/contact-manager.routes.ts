import { Routes } from '@angular/router';

import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactManagerComponent } from './contact-manager.component';
import { UserService } from './services/user.service';

const routes: Routes = [
  {
    path: '',
    component: ContactManagerComponent,
    providers: [UserService],
    children: [
      { path: ':userId', component: MainContentComponent },
      { path: '', component: MainContentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

export default routes;
