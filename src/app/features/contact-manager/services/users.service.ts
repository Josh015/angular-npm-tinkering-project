import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  static readonly rootUrl = 'https://angular-material-api.azurewebsites.net';
  static readonly usersUrl = `${UsersService.rootUrl}/users`;

  private ids: number[] = [];

  constructor(private readonly http: HttpClient) {}

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
    return this.http.get<User[]>(UsersService.usersUrl).pipe(
      delay(600), // Delay to show loading spinner
      tap((users) => {
        this.ids = users.map((user) => user.id ?? 0).filter((id) => id);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
