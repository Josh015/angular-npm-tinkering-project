import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { contactManagerFeature, selectUsers } from '../../store';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MaterialModule } from 'src/app/material.module';
import { AppActions, appFeature } from 'src/app/store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ToolbarComponent,
    TranslateModule,
  ],
})
export class SidenavComponent {
  static readonly smallWidthBreakpoint = 720;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly usersLoading$ = this.store.select(
    contactManagerFeature.selectUsersLoading,
  );
  readonly users$ = this.store.select(selectUsers);
  readonly isDarkTheme$ = this.store.select(appFeature.selectIsDarkTheme);
  readonly textDirection$ = this.store.select(appFeature.selectTextDirection);

  isScreenSmall = false;

  @ViewChild(MatSidenav) sidenav?: MatSidenav;

  constructor() {
    this.breakpointObserver
      .observe([`(max-width: ${SidenavComponent.smallWidthBreakpoint}px)`])
      .pipe(takeUntilDestroyed())
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav?.close();
      }
    });
  }

  toggleTheme(): void {
    this.store.dispatch(AppActions.toggleDarkTheme());
  }

  toggleDir(): void {
    this.store.dispatch(AppActions.toggleTextDirection());
  }
}
