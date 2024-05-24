import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { UserService } from '../../services/user.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ToolbarComponent,
    TranslateModule,
  ],
})
export class SidenavComponent {
  static readonly smallWidthBreakpoint = 768;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly sidenav = viewChild.required(MatSidenav);

  protected readonly usersLoading = this.userService.loading;
  protected readonly users = this.userService.data;

  protected isScreenSmall = false;
  protected isDarkTheme = false;
  protected textDirection: Direction = 'ltr';

  constructor() {
    this.breakpointObserver
      .observe([`(max-width: ${SidenavComponent.smallWidthBreakpoint}px)`])
      .pipe(takeUntilDestroyed())
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav().close();
      }
    });
  }

  protected toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }

  protected toggleDir(): void {
    this.textDirection = this.textDirection === 'ltr' ? 'rtl' : 'ltr';
  }
}
