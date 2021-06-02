import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UsersService } from '../services/users.service';
import {
    createUser, createUserError, createUserSuccess, loadUsers, loadUsersError, loadUsersSuccess
} from './contact-manager.actions';

@Injectable()
export class ContactManagerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly contactManagerService: UsersService
  ) {}

  readonly loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.contactManagerService.loadAllUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersError({ error })))
        )
      )
    );
  });

  readonly createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUser),
      concatMap(({ user }) =>
        this.contactManagerService.addUser(user).pipe(
          map((user) => createUserSuccess({ user })),
          catchError((error) => of(createUserError({ error })))
        )
      )
    );
  });
}
