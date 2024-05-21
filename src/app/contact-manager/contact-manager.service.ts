/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { AVATARS, GENDERS, User } from './models';

@Injectable()
export class ContactManagerService {
  static readonly rootUrl = 'https://dummyapi.online/api';
  static readonly usersUrl = `${ContactManagerService.rootUrl}/users` as const;

  private readonly http = inject(HttpClient);

  private ids: number[] = [];

  addUser(user: User): Observable<User> {
    // Needed to simulate saving users to DB.
    const id: number = Math.max.apply(this, this.ids) + 1;
    this.ids.push(id);
    return of({
      ...user,
      id,
    }).pipe(delay(600)); // Delay to show loading spinner
  }

  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(ContactManagerService.usersUrl).pipe(
      // Delay to show loading spinner
      delay(600),

      // Keep a list of used IDs for adding new users.
      tap((users) => {
        this.ids = users.map((user) => user.id ?? 0).filter((id) => id);
      }),

      // Add missing fields for dummy data.
      tap((users) => {
        for (const [index, user] of users.entries()) {
          user.birthDate = new Date();
          user.birthDate.setDate(user.birthDate.getDate() + index);

          user.bio = (user as any).email;
          user.avatar = AVATARS[index % AVATARS.length];
          user.gender = GENDERS[index % GENDERS.length];

          user.notes = Object.values(
            (user as any).address as Map<string, string>,
          ).map((value, index) => {
            return {
              id: index + 1,
              date: new Date(),
              title: value,
            };
          });
        }
      }),
      // catchError(this.handleError)
    );
  }

  // private handleError(err: unknown): Observable<never> {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage: string;
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
  //   }
  //   console.error(err);
  //   return throwError(errorMessage);
  // }
}
