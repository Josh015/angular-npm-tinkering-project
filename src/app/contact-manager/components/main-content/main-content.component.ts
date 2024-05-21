import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { selectCurrentUser } from '../../store';
import { NotesComponent } from '../notes/notes.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-main-content',
  standalone: true,
  templateUrl: './main-content.component.html',
  imports: [AsyncPipe, MaterialModule, NotesComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {
  private readonly store = inject(Store);

  readonly user$ = this.store.select(selectCurrentUser);
}
