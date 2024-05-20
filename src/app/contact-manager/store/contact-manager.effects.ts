import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { ContactManagerActions } from './contact-manager.grouped-actions';

@Injectable({
  providedIn: null,
})
export class ContactManagerEffects {
  private readonly actions$ = inject(Actions);
  private readonly contactManagerService = inject(UsersService);

  readonly loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactManagerActions.loadUsers),
      mergeMap(() =>
        this.contactManagerService.loadAllUsers().pipe(
          map((users) => ContactManagerActions.loadUsersSuccess({ users })),
          catchError((error: unknown) =>
            of(
              ContactManagerActions.loadUsersError({ error: error as string }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactManagerActions.createUser),
      concatMap(({ user }) =>
        this.contactManagerService.addUser(user).pipe(
          map((newUser) =>
            ContactManagerActions.createUserSuccess({ user: newUser }),
          ),
          catchError((error: unknown) =>
            of(
              ContactManagerActions.createUserError({ error: error as string }),
            ),
          ),
        ),
      ),
    ),
  );
}
