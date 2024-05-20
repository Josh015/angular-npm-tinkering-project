import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import {
  createUser,
  createUserError,
  createUserSuccess,
  loadUsers,
  loadUsersError,
  loadUsersSuccess,
} from './contact-manager.actions';

@Injectable({
  providedIn: null,
})
export class ContactManagerEffects {
  private readonly actions$ = inject(Actions);
  private readonly contactManagerService = inject(UsersService);

  readonly loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.contactManagerService.loadAllUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error: unknown) =>
            of(loadUsersError({ error: error as string })),
          ),
        ),
      ),
    ),
  );

  readonly createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      concatMap(({ user }) =>
        this.contactManagerService.addUser(user).pipe(
          map((newUser) => createUserSuccess({ user: newUser })),
          catchError((error: unknown) =>
            of(createUserError({ error: error as string })),
          ),
        ),
      ),
    ),
  );
}
