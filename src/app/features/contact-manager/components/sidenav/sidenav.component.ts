import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  getIsDarkTheme,
  getTextDirection,
  toggleDarkTheme,
  toggleTextDirection,
} from 'src/app/state';

import { getUsers, getUsersLoading, State } from '../../state';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit, OnDestroy {
  static readonly smallWidthBreakpoint = 720;

  readonly usersLoading$ = this.store.select(getUsersLoading);
  readonly users$ = this.store.select(getUsers);
  readonly isDarkTheme$ = this.store.select(getIsDarkTheme);
  readonly textDirection$ = this.store.select(getTextDirection);

  isScreenSmall = false;

  @ViewChild(MatSidenav) sidenav?: MatSidenav;

  private readonly subscription = new Subscription();

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly store: Store<State>
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.breakpointObserver
        .observe([`(max-width: ${SidenavComponent.smallWidthBreakpoint}px)`])
        .subscribe((state: BreakpointState) => {
          this.isScreenSmall = state.matches;
        })
    );

    this.subscription.add(
      this.router.events.subscribe(() => {
        if (this.isScreenSmall) {
          this.sidenav?.close();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTheme(): void {
    this.store.dispatch(toggleDarkTheme());
  }

  toggleDir(): void {
    this.store.dispatch(toggleTextDirection());
  }
}
