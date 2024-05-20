import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { getCurrentUser, State } from '../../store';
import { NotesComponent } from '../notes/notes.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-main-content',
  standalone: true,
  templateUrl: './main-content.component.html',
  imports: [CommonModule, MaterialModule, NotesComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {
  private readonly store = inject(Store<State>);

  readonly user$ = this.store.select(getCurrentUser);
}
