import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { loadUsers, State } from './state';

@Component({
  selector: 'app-contact-manager-app',
  template: '<app-sidenav></app-sidenav>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactManagerComponent implements OnInit {
  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
    private readonly store: Store<State>
  ) {}

  ngOnInit(): void {
    this.iconRegistry.addSvgIconSet(
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );

    this.store.dispatch(loadUsers());
  }
}
