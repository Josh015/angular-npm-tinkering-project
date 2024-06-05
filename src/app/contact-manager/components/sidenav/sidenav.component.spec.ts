import { Dir } from '@angular/cdk/bidi';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { signal } from '@angular/core';
import {
  MatIconHarness,
  MatIconTestingModule
} from '@angular/material/icon/testing';
import { MatNavListHarness } from '@angular/material/list/testing';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterLink } from '@angular/router';
import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';

import { SidenavComponent } from './sidenav.component';
import { USER_ID_PARAM, User } from '../../models';
import { UserService } from '../../services/user.service';
import { USERS_MOCK } from '../../testing';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { provideTranslocoTesting, randomizedSubArray } from 'src/app/testing';

describe(`SidenavComponent`, () => {
  let loader: HarnessLoader;
  let spectator: SpectatorRouting<SidenavComponent>;
  // let translocoService: SpyObject<TranslocoService>;
  const usersData = randomizedSubArray(USERS_MOCK);
  const userServiceLoading = signal(false);
  const userServiceData = signal<User[]>([]);
  const breakpointState = new BehaviorSubject<BreakpointState>({
    matches: false,
    breakpoints: {}
  });
  const createComponent = createRoutingFactory({
    component: SidenavComponent,
    declareComponent: false,
    params: { [USER_ID_PARAM]: '' },
    stubsEnabled: false,
    routes: [
      {
        path: 'contact-manager',
        component: SidenavComponent
      },
      {
        path: `contact-manager/:${USER_ID_PARAM}`,
        component: SidenavComponent
      }
    ],
    imports: [MatIconTestingModule],
    providers: [
      provideAnimationsAsync(),
      provideTranslocoTesting(),
      MockProvider(UserService, {
        data: userServiceData,
        loading: userServiceLoading
      }),
      MockProvider(BreakpointObserver, {
        observe: () => breakpointState
      })
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
      expect('mat-sidenav-container').not.toHaveClass('dark-theme');
    });

    it(`should switch to dark theme when toolbar fires toggleTheme event`, () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleTheme.emit();
      spectator.detectChanges();

      expect('mat-sidenav-container').toHaveClass('dark-theme');
    });

    it(`should switch back to light theme when toolbar fires two toggleTheme events`, () => {
      const appToolbar = spectator.query(ToolbarComponent);

      appToolbar?.toggleTheme.emit();
      appToolbar?.toggleTheme.emit();
      spectator.detectChanges();

      expect('mat-sidenav-container').not.toHaveClass('dark-theme');
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
    describe(`Small Screen`, () => {
      beforeEach(() => {
        breakpointState.next({
          matches: true,
          breakpoints: {}
        });
        spectator.detectChanges();
      });

      it(`should have a mode of 'over'`, async () => {
        const sidenavHarness = await loader.getHarness(MatSidenavHarness);
        const mode = await sidenavHarness.getMode();

        expect(mode).toBe('over');
      });

      it(`should be closed by default`, async () => {
        const sidenavHarness = await loader.getHarness(MatSidenavHarness);
        const isOpen = await sidenavHarness.isOpen();

        expect(isOpen).toBe(false);
      });

      // it(`should switch to closed when toolbar fires toggleSidenav event`, async () => {
      //   const appToolbar = spectator.query(ToolbarComponent);

      //   appToolbar?.toggleSidenav.emit();
      //   spectator.detectChanges();

      //   const sidenavHarness = await loader.getHarness(MatSidenavHarness);
      //   const isOpen = await sidenavHarness.isOpen();

      //   expect(isOpen).toBe(true);
      // });

      // it(`should switch back to open when toolbar fires two toggleSidenav events`, async () => {
      //   const appToolbar = spectator.query(ToolbarComponent);

      //   appToolbar?.toggleSidenav.emit();
      //   appToolbar?.toggleSidenav.emit();
      //   spectator.detectChanges();

      //   const sidenavHarness = await loader.getHarness(MatSidenavHarness);
      //   const isOpen = await sidenavHarness.isOpen();

      //   expect(isOpen).toBe(true);
      // });

      // TODO: Should close when screen is small, and router event occurs.
    });

    describe(`Large Screen`, () => {
      beforeEach(() => {
        breakpointState.next({
          matches: false,
          breakpoints: {}
        });
        spectator.detectChanges();
      });

      it(`should have a mode of 'side'`, async () => {
        const sidenavHarness = await loader.getHarness(MatSidenavHarness);
        const mode = await sidenavHarness.getMode();

        expect(mode).toBe('side');
      });

      it(`should be open by default`, async () => {
        const sidenavHarness = await loader.getHarness(MatSidenavHarness);
        const isOpen = await sidenavHarness.isOpen();

        expect(isOpen).toBe(true);
      });

      it(`should switch to closed when toolbar fires toggleSidenav event`, async () => {
        const appToolbar = spectator.query(ToolbarComponent);

        appToolbar?.toggleSidenav.emit();
        spectator.detectChanges();

        const sidenavHarness = await loader.getHarness(MatSidenavHarness);
        const isOpen = await sidenavHarness.isOpen();

        expect(isOpen).toBe(false);
      });

      it(`should switch back to open when toolbar fires two toggleSidenav events`, async () => {
        const appToolbar = spectator.query(ToolbarComponent);

        appToolbar?.toggleSidenav.emit();
        appToolbar?.toggleSidenav.emit();
        spectator.detectChanges();

        const sidenavHarness = await loader.getHarness(MatSidenavHarness);
        const isOpen = await sidenavHarness.isOpen();

        expect(isOpen).toBe(true);
      });
    });
  });

  describe(`Nav List`, () => {
    it(`should be empty when there are no users`, () => {
      userServiceLoading.set(false);
      userServiceData.set([]);
      spectator.detectChanges();
      expect('mat-nav-list').toBeEmpty();
    });

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
        // user = shuffle(usersData);
        userServiceLoading.set(false);
        userServiceData.set(usersData);
        spectator.detectChanges();
      });

      it(`should have icons corresponding to users' avatars`, async () => {
        const navListHarness = await loader.getHarness(MatNavListHarness);
        const listItemHarnesses = await navListHarness.getItems();
        const iconHarnesses = await parallel(() =>
          listItemHarnesses.map((h) => h.getHarness(MatIconHarness))
        );
        const iconNames = await parallel(() =>
          iconHarnesses.map((h) => h.getName())
        );

        for (const [index, iconName] of iconNames.entries()) {
          const user = usersData[index];

          expect(iconName).toBe(user.avatar);
        }
      });

      it(`should default to not being activated`, async () => {
        const navListHarness = await loader.getHarness(MatNavListHarness);
        const listItemHarnesses = await navListHarness.getItems();
        const activatedListItems = await parallel(() =>
          listItemHarnesses.map((li) => li.isActivated())
        );

        for (const activatedListItem of activatedListItems) {
          expect(activatedListItem).toBe(false);
        }
      });

      it(`should become activated when anchor is active`, async () => {
        const navListHarness = await loader.getHarness(MatNavListHarness);
        const listItemHarnesses = await navListHarness.getItems();
        const anchors = spectator.queryAll('mat-nav-list mat-list-item a');

        for (const [index, listItemHarness] of listItemHarnesses.entries()) {
          const anchor = anchors[index];
          let isActivated = await listItemHarness.isActivated();

          expect(isActivated).toBe(false);

          spectator.click(anchor);
          await spectator.fixture.whenStable();

          isActivated = await listItemHarness.isActivated();

          expect(isActivated).toBe(true);
        }
      });

      // TODO: mat-list-item is/isn't have "activated" based on route.
      // TODO: clicking mat-list-item redirects to it's user's ID route.

      describe(`Anchors`, () => {
        let anchors: HTMLAnchorElement[];

        beforeEach(() => {
          anchors = spectator.queryAll('mat-nav-list mat-list-item a');
        });

        it(`should have user name as text`, () => {
          const userNames = usersData.map((u) => u.name);

          expect(anchors).toHaveText(userNames);
        });

        it(`should not have active anchors by default`, () => {
          expect(anchors).not.toHaveClass('active');
        });

        it(`should become active when anchor is clicked`, async () => {
          for (const anchor of anchors) {
            spectator.click(anchor);
            await spectator.fixture.whenStable();

            expect(anchor).toHaveClass('active');
          }
        });

        it(`should have a route based on the user ID`, () => {
          const routerLinks = spectator.queryAll(RouterLink);

          for (const [index, routerLink] of routerLinks.entries()) {
            const user = usersData[index];

            expect(routerLink.href).toBe(`/contact-manager/${user.id}`);
          }
        });

        // TODO: Should become active after navigating to corresponding route.
        // TODO: clicking anchor redirects to it's user's ID route.
      });
    });
  });
});
