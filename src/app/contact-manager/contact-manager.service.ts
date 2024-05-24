/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';

import { User } from './models';

@Injectable()
export class ContactManagerService {
  static readonly dbDelayMilliseconds = 600;

  private readonly http = inject(HttpClient);

  private readonly usersLoadingSubject$ = new BehaviorSubject(false);
  readonly usersLoading$ = this.usersLoadingSubject$.asObservable();

  private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
  readonly users$ = this.usersSubject$.asObservable();

  private dataStore: { users: User[] } = { users: [] };

  addUser(user: User): Observable<User> {
    user.id = this.dataStore.users.length + 1;
    this.dataStore.users.push(user);
    this.usersSubject$.next(this.dataStore.users);

    return of(user).pipe(delay(ContactManagerService.dbDelayMilliseconds)); // Delay to show loading spinner
  }

  // userById(id: number) {
  //   return this.dataStore.users.find((x) => x.id == id);
  // }

  fetchUsers(): Observable<User[]> {
    const usersUrl = '/assets/users.json';

    this.usersLoadingSubject$.next(true);

    return this.http.get<User[]>(usersUrl).pipe(
      // Delay to show loading spinner
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
    );
  }
}
