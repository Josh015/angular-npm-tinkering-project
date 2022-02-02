import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getCurrentUser, State } from '../../store';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {
  readonly user$ = this.store.select(getCurrentUser);

  constructor(private readonly store: Store<State>) {}
}
