import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getCurrentUser, State } from '../../state';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
  readonly user$ = this.store.select(getCurrentUser);

  constructor(private readonly store: Store<State>) {}
}
