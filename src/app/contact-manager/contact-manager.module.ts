import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContactManagerRoutingModule } from './contact-manager-routing.module';
import { ContactManagerComponent } from './contact-manager.component';
import { UsersService } from './services/users.service';
import {
  ContactManagerEffects,
  contactManagerReducer,
  FEATURE_KEY,
} from './store';
import { SharedModule } from 'src/app/shared';

// NOTE: ContactManagerModule -> ContactManagerEffects -> UsersService so we
// can't use "providedIn: ContactManagerModule" for UsersService.
@NgModule({
  imports: [
    ContactManagerRoutingModule,
    EffectsModule.forFeature([ContactManagerEffects]),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(FEATURE_KEY, contactManagerReducer),
    TranslateModule.forChild({ extend: true }),
  ],
  providers: [UsersService],
  declarations: [
    ContactManagerComponent,
    ContactManagerRoutingModule.components,
    NewContactDialogComponent,
    NotesComponent,
    SidenavComponent,
    ToolbarComponent,
  ],
})
export class ContactManagerModule {}
