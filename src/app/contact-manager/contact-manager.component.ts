import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContactManagerActions } from './store';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-contact-manager-app',
  template: '<app-sidenav />',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NewContactDialogComponent,
    NotesComponent,
    ReactiveFormsModule,
    SidenavComponent,
    ToolbarComponent,
  ],
})
export class ContactManagerComponent implements OnInit {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.iconRegistry.addSvgIconSet(
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'),
    );

    this.store.dispatch(ContactManagerActions.loadUsers());
  }
}
