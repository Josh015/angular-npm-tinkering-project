import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { selectCurrentUser } from '../../store';
import { NotesComponent } from '../notes/notes.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, MaterialModule, NotesComponent, TranslateModule],
})
export class MainContentComponent {
  private readonly store = inject(Store);

  readonly user$ = this.store.select(selectCurrentUser);
}
