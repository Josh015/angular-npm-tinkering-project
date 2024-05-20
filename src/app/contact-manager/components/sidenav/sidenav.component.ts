import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { getUsers, getUsersLoading, State } from '../../store';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import {
  getIsDarkTheme,
  getTextDirection,
  toggleDarkTheme,
  toggleTextDirection,
} from 'src/app/store';
import { SharedModule } from 'src/app/shared';

@UntilDestroy()
@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SharedModule,
    ToolbarComponent,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  static readonly smallWidthBreakpoint = 720;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly store = inject(Store<State>);

  readonly usersLoading$ = this.store.select(getUsersLoading);
  readonly users$ = this.store.select(getUsers);
  readonly isDarkTheme$ = this.store.select(getIsDarkTheme);
  readonly textDirection$ = this.store.select(getTextDirection);

  isScreenSmall = false;

  @ViewChild(MatSidenav) sidenav?: MatSidenav;

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
