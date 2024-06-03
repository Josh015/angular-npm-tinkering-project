import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { MainContentComponent } from './main-content.component';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { getTranslocoModule } from 'src/app/testing';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  const params = new BehaviorSubject<Params>({});
  const usersData = signal<User[]>([]);
  const activatedRoute = jasmine.createSpyObj<ActivatedRoute>([], {
    params: params,
  });
  const userService = jasmine.createSpyObj<UserService>([], {
    data: usersData,
  });
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'test',
      birthDate: new Date(),
      avatar: 'svg-1',
      bio: '',
      gender: 'male',
      notes: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), MainContentComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the notes', () => {
    expect(component).toBeTruthy();
  });

  it(`should not have a mat-card when the route has no user ID`, async () => {
    usersData.set([]);
    params.next({});
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const debugElement = fixture.debugElement.query(By.css('mat-card'));

    expect(debugElement).toBeFalsy();
  });

  it(`should not have a mat-card when the route has a user ID but the component has no user data`, async () => {
    usersData.set([]);
    params.next({ [MainContentComponent.userIdParam]: 1 });
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const debugElement = fixture.debugElement.query(By.css('mat-card'));

    expect(debugElement).toBeFalsy();
  });

  it(`should not have a mat-card when the route has an invalid user ID`, async () => {
    usersData.set(mockUsers);
    params.next({ [MainContentComponent.userIdParam]: -1 });
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const debugElement = fixture.debugElement.query(By.css('mat-card'));

    expect(debugElement).toBeFalsy();
  });

  it(`should have a mat-card when the route has valid user ID`, async () => {
    usersData.set(mockUsers);
    params.next({ [MainContentComponent.userIdParam]: mockUsers[0].id });
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const debugElement = fixture.debugElement.query(By.css('mat-card'));

    expect(debugElement).toBeTruthy();
    expect(debugElement.nativeElement).toBeTruthy();
  });

  // it('should render the title', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain(
  //     'demo-angular-jest app is running!',
  //   );
  // });
});
