import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { getUsers, getUsersLoading, State } from '../../store';
import {
  getIsDarkTheme,
  getTextDirection,
  toggleDarkTheme,
  toggleTextDirection,
} from 'src/app/store';

@UntilDestroy()
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  static readonly smallWidthBreakpoint = 720;

  readonly usersLoading$ = this.store.select(getUsersLoading);
  readonly users$ = this.store.select(getUsers);
  readonly isDarkTheme$ = this.store.select(getIsDarkTheme);
  readonly textDirection$ = this.store.select(getTextDirection);

  isScreenSmall = false;

  @ViewChild(MatSidenav) sidenav?: MatSidenav;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly store: Store<State>
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SidenavComponent.smallWidthBreakpoint}px)`])
      .pipe(untilDestroyed(this))
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.router.events.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav?.close();
      }
    });
  }

  toggleTheme(): void {
    this.store.dispatch(toggleDarkTheme());
  }

  toggleDir(): void {
    this.store.dispatch(toggleTextDirection());
  }
}
