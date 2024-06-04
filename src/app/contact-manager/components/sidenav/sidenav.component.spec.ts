// import { signal } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideRouter } from '@angular/router';

// import { SidenavComponent } from './sidenav.component';
// import routes from '../../contact-manager.routes';
// import { User } from '../../models';
// import { UserService } from '../../services/user.service';
// import { getTranslocoModule } from 'src/app/testing';

// describe('SidenavComponent', () => {
//   let component: SidenavComponent;
//   let fixture: ComponentFixture<SidenavComponent>;
//   const usersData = signal<User[]>([]);
//   const userService = jasmine.createSpyObj<UserService>([], {
//     data: usersData,
//   });

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [getTranslocoModule(), SidenavComponent],
//       providers: [
//         provideAnimationsAsync(),
//         provideRouter(routes),
//         { provide: UserService, useValue: userService },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(SidenavComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the sidenav', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should render the title', () => {
//   //   const compiled = fixture.nativeElement as HTMLElement;
//   //   expect(compiled.querySelector('.content span')?.textContent).toContain(
//   //     'demo-angular-jest app is running!',
//   //   );
//   // });
// });
