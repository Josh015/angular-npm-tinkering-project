import { Dir } from '@angular/cdk/bidi';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { signal } from '@angular/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator';

import { SidenavComponent } from './sidenav.component';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { USERS_MOCK } from '../../testing';
import { MainContentComponent } from '../main-content/main-content.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { provideTranslocoTesting } from 'src/app/testing';

describe(`SidenavComponent`, () => {
  let loader: HarnessLoader;
  let spectator: SpectatorRouting<SidenavComponent>;
  // let translocoService: TranslocoService;
  const userServiceLoading = signal(false);
  const userServiceData = signal<User[]>([]);
  const createComponent = createRoutingFactory({
    component: SidenavComponent,
    declareComponent: false,
    params: { [MainContentComponent.userIdParam]: '' },
    stubsEnabled: false,
    routes: [
      {
        path: 'contact-manager',
        component: SidenavComponent
      },
      {
        path: `contact-manager/:${MainContentComponent.userIdParam}`,
        component: SidenavComponent
      }
    ],
    imports: [MatIconTestingModule],
    providers: [
      provideAnimationsAsync(),
      provideTranslocoTesting(),
      {
        provide: UserService,
        useValue: jasmine.createSpyObj<UserService>([], {
          data: userServiceData,
          loading: userServiceLoading
        })
      }
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    // translocoService = spectator.inject(TranslocoService);
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
  });

  it(`should create the component`, () => {
    expect(spectator).toBeTruthy();
  });

  describe(`Theme`, () => {
    it(`should be light theme by default`, () => {
      const sidenavContainer = spectator.query('mat-sidenav-container');

      expect(sidenavContainer).not.toHaveClass('dark-theme');
    });

    it(`should switch to dark theme when toolbar fires toggleTheme event`, () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleTheme.emit();
      spectator.detectChanges();

      const sidenavContainer = spectator.query('mat-sidenav-container');

      expect(sidenavContainer).toHaveClass('dark-theme');
    });

    it(`should switch back to light theme when toolbar fires two toggleTheme events`, () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleTheme.emit();
      appToolbar?.toggleTheme.emit();
      spectator.detectChanges();

      const sidenavContainer = spectator.query('mat-sidenav-container');

      expect(sidenavContainer).not.toHaveClass('dark-theme');
    });
  });

  describe(`Text Direction`, () => {
    it(`should be left-to-right by default`, () => {
      const direction = spectator.query(Dir);

      expect(direction?.dir).toBe('ltr');
    });

    it(`should switch to right-to-left when toolbar fires toggleDir event`, () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleDir.emit();
      spectator.detectChanges();

      const direction = spectator.query(Dir);

      expect(direction?.dir).toBe('rtl');
    });

    it(`should switch back to left-to-right when toolbar fires two toggleDir events`, () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleDir.emit();
      appToolbar?.toggleDir.emit();
      spectator.detectChanges();

      const direction = spectator.query(Dir);

      expect(direction?.dir).toBe('ltr');
    });
  });

  describe(`Sidenav`, () => {
    it(`should be open by default`, async () => {
      const sidenavHarness = await loader.getHarness(MatSidenavHarness);
      const isOpen = await sidenavHarness.isOpen();

      expect(isOpen).toBeTrue();
    });

    it(`should switch to closed when toolbar fires toggleSidenav event`, async () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleSidenav.emit();
      spectator.detectChanges();

      const sidenavHarness = await loader.getHarness(MatSidenavHarness);
      const isOpen = await sidenavHarness.isOpen();

      expect(isOpen).toBeFalse();
    });

    it(`should switch back to open when toolbar fires two toggleSidenav events`, async () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleSidenav.emit();
      appToolbar?.toggleSidenav.emit();
      spectator.detectChanges();

      const sidenavHarness = await loader.getHarness(MatSidenavHarness);
      const isOpen = await sidenavHarness.isOpen();

      expect(isOpen).toBeTrue();
    });

    // TODO: Should close when screen is small, and router event occurs.
  });

  // TODO: mat-sidenav mode based on breakpoint observer.

  describe(`Nav List`, () => {
    describe(`Loading Spinner`, () => {
      it(`should be hidden when users aren't loading`, () => {
        userServiceLoading.set(false);
        spectator.detectChanges();

        const progressSpinner = spectator.query(MatProgressSpinner);

        expect(progressSpinner).toBeFalsy();
      });

      it(`should be shown when users are loading`, () => {
        userServiceLoading.set(true);
        spectator.detectChanges();

        const progressSpinner = spectator.query(MatProgressSpinner);

        expect(progressSpinner).toBeTruthy();
      });
    });

    describe(`Nav List Items`, () => {
      // let user: User;

      beforeEach(() => {
        // user = shuffle(USERS_MOCK);
        userServiceLoading.set(false);
        userServiceData.set(USERS_MOCK);
        spectator.detectChanges();
      });

      // it(`should be active when they're anchor is active`, async () => {
      //   const navList = await loader.getHarness(MatNavListHarness);
      //   const navListItemHarnesses = await navList.getItems();

      //   for (const item of navListItemHarnesses) {
      //     const isActivated = await item.isActivated();

      //     expect(isActivated).toBeFalse();
      //   }
      // });

      describe(`Anchors`, () => {
        it(`should not have active anchors by default`, () => {
          const anchors = spectator.queryAll('a');

          for (const anchor of anchors) {
            expect(anchor).not.toHaveClass('active');
          }
        });

        it(`should become active when anchor is clicked`, async () => {
          const anchors = spectator.queryAll('a');

          for (const anchor of anchors) {
            spectator.click(anchor);
            await spectator.fixture.whenStable();

            expect(anchor).toHaveClass('active');
          }
        });
      });

      // TODO: mat-nav-list with users data.
      // TODO: mat-list-item is/isn't have "activated" based on route.
      // TODO: anchor has/doesn't have "active" class based on route.
      // TODO: clicking mat-list-item redirects to it's user's ID route.
      // TODO: clicking anchor redirects to it's user's ID route.
      // TODO: anchor displays user name.
      // TODO: icon is user avatar.
    });
  });
});
