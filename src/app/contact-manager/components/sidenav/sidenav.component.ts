import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

import { UserService } from '../../services/user.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

const fullConfig = resolveConfig(tailwindConfig);

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ToolbarComponent,
    TranslocoPipe
  ]
})
export class SidenavComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly sidenav = viewChild.required(MatSidenav);

  protected readonly usersLoading = this.userService.loading;
  protected readonly users = this.userService.data;
  protected readonly isSmallScreen = signal(false);
  protected readonly isDarkTheme = signal(false);
  protected readonly textDirection = signal<Direction>('ltr');

  constructor() {
    this.breakpointObserver
      .observe([`(max-width: ${fullConfig.theme.screens.md})`])
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        this.isSmallScreen.set(state.matches);
      });

    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.isSmallScreen()) {
        void this.sidenav().close();
      }
    });
  }

  protected toggleTheme(): void {
    this.isDarkTheme.update((value) => !value);
  }

  protected toggleDir(): void {
    this.textDirection.update((value) => (value === 'ltr' ? 'rtl' : 'ltr'));
  }
}
