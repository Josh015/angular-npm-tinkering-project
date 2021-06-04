import { SharedModule } from 'src/app/shared';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { MainContentComponent } from './components/main-content/main-content.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContactManagerRoutingModule } from './contact-manager-routing.module';
import { ContactManagerComponent } from './contact-manager.component';
import { UsersService } from './services/users.service';
import { ContactManagerEffects, contactManagerReducer } from './state';

@NgModule({
  imports: [
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('contact-manager', contactManagerReducer),
    EffectsModule.forFeature([ContactManagerEffects]),
    TranslateModule.forChild({ extend: true }),
    ContactManagerRoutingModule,
    SharedModule,
  ],
  providers: [UsersService],
  declarations: [
    ContactManagerComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent,
    NewContactDialogComponent,
  ],
})
export class ContactManagerModule {}
