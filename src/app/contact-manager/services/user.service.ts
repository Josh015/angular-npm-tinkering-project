import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { lastValueFrom, of, throwError } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';

import { User } from '../models';

@Injectable()
export class UserService {
  static readonly fetchDelayMilliseconds = 600;
  static readonly usersUrl = '/assets/users.json';

  private readonly http = inject(HttpClient);

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  private readonly _data = signal<User[]>([]);
  readonly data = this._data.asReadonly();

  private dataStore: { users: User[] } = { users: [] };

  create(user: User): Promise<User> {
    this._loading.set(true);

    user.id = this.dataStore.users.length + 1;
    this.dataStore.users.push(user);
    this._data.set(this.dataStore.users);

    return lastValueFrom(
      of(user).pipe(
        delay(UserService.fetchDelayMilliseconds),
        finalize(() => {
          this._loading.set(false);
        }),
      ),
    );
  }

  fetch(): Promise<User[]> {
    this._loading.set(true);

    return lastValueFrom(
      this.http.get<User[]>(UserService.usersUrl).pipe(
        delay(UserService.fetchDelayMilliseconds),
        tap((users) => {
          this.dataStore.users = users;
          this._data.set(users);
        }),
        catchError((error: unknown) => {
          console.log('Failed to fetch users');
          this.dataStore.users = [];
          this._data.set([]);
          return throwError(() => error);
        }),
        finalize(() => {
          this._loading.set(false);
        }),
      ),
    );
  }
}
