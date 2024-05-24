import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom, of, throwError } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';

import { User } from '../models';

@Injectable()
export class UserService {
  static readonly fetchDelayMilliseconds = 600;
  static readonly usersUrl = '/assets/users.json';

  private readonly http = inject(HttpClient);

  private readonly loadingSubject$ = new BehaviorSubject(false);
  readonly loading$ = this.loadingSubject$.asObservable();

  private readonly dataSubject$ = new BehaviorSubject<User[]>([]);
  readonly data$ = this.dataSubject$.asObservable();

  private dataStore: { users: User[] } = { users: [] };

  create(user: User): Promise<User> {
    this.loadingSubject$.next(true);

    user.id = this.dataStore.users.length + 1;
    this.dataStore.users.push(user);
    this.dataSubject$.next(this.dataStore.users);

    return lastValueFrom(
      of(user).pipe(
        delay(UserService.fetchDelayMilliseconds),
        finalize(() => this.loadingSubject$.next(false)),
      ),
    );
  }

  fetch(): Promise<User[]> {
    this.loadingSubject$.next(true);

    return lastValueFrom(
      this.http.get<User[]>(UserService.usersUrl).pipe(
        delay(UserService.fetchDelayMilliseconds),
        tap((users) => {
          this.dataStore.users = users;
          this.dataSubject$.next(users);
        }),
        catchError((error: unknown) => {
          console.log('Failed to fetch users');
          this.dataStore.users = [];
          this.dataSubject$.next([]);
          return throwError(() => error);
        }),
        finalize(() => this.loadingSubject$.next(false)),
      ),
    );
  }
}
