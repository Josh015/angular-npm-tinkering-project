import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom, of, throwError } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';

import { User } from './models';

@Injectable()
export class ContactManagerService {
  static readonly dbDelayMilliseconds = 600;
  static readonly usersUrl = '/assets/users.json';

  private readonly http = inject(HttpClient);

  private readonly usersLoadingSubject$ = new BehaviorSubject(false);
  readonly usersLoading$ = this.usersLoadingSubject$.asObservable();

  private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
  readonly users$ = this.usersSubject$.asObservable();

  private dataStore: { users: User[] } = { users: [] };

  addUser(user: User): Promise<User> {
    this.usersLoadingSubject$.next(true);

    user.id = this.dataStore.users.length + 1;
    this.dataStore.users.push(user);
    this.usersSubject$.next(this.dataStore.users);

    return lastValueFrom(
      of(user).pipe(
        delay(ContactManagerService.dbDelayMilliseconds),
        tap(() => this.usersLoadingSubject$.next(false)),
      ),
    );
  }

  fetchUsers(): Promise<User[]> {
    this.usersLoadingSubject$.next(true);

    return lastValueFrom(
      this.http.get<User[]>(ContactManagerService.usersUrl).pipe(
        delay(ContactManagerService.dbDelayMilliseconds),
        tap((users) => {
          this.dataStore.users = users;
          this.usersSubject$.next(users);
        }),
        catchError((error: unknown) => {
          console.log('Failed to fetch users');
          this.dataStore.users = [];
          this.usersSubject$.next([]);
          return throwError(() => error);
        }),
        finalize(() => this.usersLoadingSubject$.next(false)),
      ),
    );
  }
}
