/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import {
  MatIconHarness,
  MatIconTestingModule,
} from '@angular/material/icon/testing';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { sample } from 'lodash';
import { BehaviorSubject } from 'rxjs';

import { MainContentComponent } from './main-content.component';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { USERS_MOCK } from '../../testing';
import { NotesComponent } from '../notes/notes.component';
import { getTranslocoModule } from 'src/app/testing';

describe('MainContentComponent', () => {
  let loader: HarnessLoader;
  let spectator: Spectator<MainContentComponent>;
  let translocoService: TranslocoService;
  const params = new BehaviorSubject<Params>({});
  const usersData = signal<User[]>([]);
  const activatedRoute = jasmine.createSpyObj<ActivatedRoute>([], {
    params: params,
  });
  const userService = jasmine.createSpyObj<UserService>([], {
    data: usersData,
  });
  const createComponent = createComponentFactory({
    component: MainContentComponent,
    declareComponent: false,
    imports: [getTranslocoModule(), MatIconTestingModule],
    providers: [
      provideAnimationsAsync(),
      { provide: ActivatedRoute, useValue: activatedRoute },
      { provide: UserService, useValue: userService },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    translocoService = TestBed.inject(TranslocoService);
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
  });

  it('should create the main-content', () => {
    expect(spectator).toBeTruthy();
  });

  describe(`Empty Space`, () => {
    it(`should be shown when the route has no user ID`, () => {
      usersData.set([]);
      params.next({});
    });

    it(`should be shown when the route has an invalid user ID`, () => {
      usersData.set(USERS_MOCK);
      params.next({ [MainContentComponent.userIdParam]: -1 });
    });

    it(`should be shown when the route has a user ID but the component has no user data`, () => {
      usersData.set([]);
      params.next({ [MainContentComponent.userIdParam]: 1 });
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
      usersData.set(USERS_MOCK);
      params.next({ [MainContentComponent.userIdParam]: user.id });
      spectator.detectChanges();
    });

    it(`should be visible when the route has a valid user ID`, () => {
      expect(spectator.query(MatCard)).toBeTruthy();
    });

    it(`should have a title with the user's name and gender`, async () => {
      const matCard = await loader.getHarness(MatCardHarness);
      const title = await matCard.getTitleText();
      const nameAndGender = translocoService.translate(
        'ContactManager.MainContent.Title.NameAndGender',
        user,
      );

      expect(title).toBe(nameAndGender);
    });

    it(`should have a subtitle with the user's birthday`, async () => {
      const matCard = await loader.getHarness(MatCardHarness);
      const subTitle = await matCard.getSubtitleText();
      const birthday = translocoService.translate(
        'ContactManager.MainContent.SubTitle.Birthday',
        user,
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
      const label = translocoService.translate(
        'ContactManager.MainContent.Tabs.Bio',
      );

      await matTabGroup.selectTab({ label });

      const selectedTab = await matTabGroup.getSelectedTab();
      const tabContent = await selectedTab.getTextContent();

      expect(tabContent).toBe(user.bio);
    });

    it(`should have a "Notes" tab with the user's notes`, async () => {
      const matTabGroup = await loader.getHarness(MatTabGroupHarness);
      const label = translocoService.translate(
        'ContactManager.MainContent.Tabs.Notes',
      );

      await matTabGroup.selectTab({ label });

      const component = spectator.query(NotesComponent);

      expect(component).toBeTruthy();
      expect(component?.notes).toEqual(user.notes);
    });
  });
});
