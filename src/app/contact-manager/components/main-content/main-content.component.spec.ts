/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import {
  MatIconHarness,
  MatIconTestingModule
} from '@angular/material/icon/testing';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslocoService } from '@jsverse/transloco';
import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator';
import { sample } from 'lodash';

import { MainContentComponent } from './main-content.component';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { USERS_MOCK } from '../../testing';
import { NotesComponent } from '../notes/notes.component';
import { provideTranslocoTesting } from 'src/app/testing';

describe('MainContentComponent', () => {
  let loader: HarnessLoader;
  let spectator: SpectatorRouting<MainContentComponent>;
  let translocoService: TranslocoService;
  const prefix = 'ContactManager.MainContent.';
  const userServiceData = signal<User[]>([]);
  const createComponent = createRoutingFactory({
    component: MainContentComponent,
    declareComponent: false,
    params: { [MainContentComponent.userIdParam]: '' },
    imports: [MatIconTestingModule],
    providers: [
      provideAnimationsAsync(),
      provideTranslocoTesting(),
      {
        provide: UserService,
        useValue: jasmine.createSpyObj<UserService>([], {
          data: userServiceData
        })
      }
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    translocoService = TestBed.inject(TranslocoService);
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
  });

  it('should create the component', () => {
    expect(spectator).toBeTruthy();
  });

  describe(`Empty Space`, () => {
    it(`should be shown when the route has no user ID`, () => {
      userServiceData.set(USERS_MOCK);
      spectator.setRouteParam(MainContentComponent.userIdParam, '');
    });

    it(`should be shown when the route has an invalid user ID`, () => {
      userServiceData.set(USERS_MOCK);
      spectator.setRouteParam(MainContentComponent.userIdParam, '-1');
    });

    it(`should be shown when the route has no user data`, () => {
      userServiceData.set([]);
      spectator.setRouteParam(MainContentComponent.userIdParam, '1');
    });

    afterEach(() => {
      spectator.detectChanges();
      expect(spectator.query('*')).toBeFalsy();
    });
  });

  describe('User Card', () => {
    let user: User;

    beforeEach(() => {
      user = sample(USERS_MOCK)!;
      userServiceData.set(USERS_MOCK);
      spectator.setRouteParam(MainContentComponent.userIdParam, `${user.id}`);
      spectator.detectChanges();
    });

    it(`should be visible when the route has a valid user ID`, () => {
      expect(spectator.query(MatCard)).toBeTruthy();
    });

    it(`should have a title with the user's name and gender`, async () => {
      const matCard = await loader.getHarness(MatCardHarness);
      const title = await matCard.getTitleText();
      const nameAndGender = translocoService.translate(
        `${prefix}Title.NameAndGender`,
        user
      );

      expect(title).toBe(nameAndGender);
    });

    it(`should have a subtitle with the user's birthday`, async () => {
      const matCard = await loader.getHarness(MatCardHarness);
      const subTitle = await matCard.getSubtitleText();
      const birthday = translocoService.translate(
        `${prefix}SubTitle.Birthday`,
        user
      );

      expect(subTitle).toBe(birthday);
    });

    it(`should have an icon displaying the user's avatar`, async () => {
      const matIconHarness = await loader.getHarness(MatIconHarness);
      const name = await matIconHarness.getName();

      expect(name).toBe(user.avatar);
    });

    it(`should have a "Bio" tab that contains the user's biography info`, async () => {
      const matTabGroup = await loader.getHarness(MatTabGroupHarness);
      const label = translocoService.translate(`${prefix}Tabs.Bio`);

      await matTabGroup.selectTab({ label });

      const selectedTab = await matTabGroup.getSelectedTab();
      const tabContent = await selectedTab.getTextContent();

      expect(tabContent).toBe(user.bio);
    });

    it(`should have a "Notes" tab with the user's notes`, async () => {
      const matTabGroup = await loader.getHarness(MatTabGroupHarness);
      const label = translocoService.translate(`${prefix}Tabs.Notes`);

      await matTabGroup.selectTab({ label });

      const component = spectator.query(NotesComponent);

      expect(component).toBeTruthy();
      expect(component?.notes).toEqual(user.notes);
    });
  });
});
