import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CustomValidators, Keys } from 'src/app/shared';

import { User } from '../../models/users.model';
import { createUser, createUserSuccess, State } from '../../state';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewContactDialogComponent implements OnInit, OnDestroy {
  static readonly nameMaxLength = 20;
  static readonly bioMaxLength = 30;

  readonly avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  readonly minBirthDate = new Date('1970-01-01Z00:00:00:000');
  readonly maxBirthDate = new Date();
  readonly formGroup = this.fb.group({
    id: [null],
    birthDate: [
      null,
      [Validators.required, CustomValidators.y2k, CustomValidators.year2012],
    ],
    gender: [null, [Validators.required]],
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(NewContactDialogComponent.nameMaxLength),
      ],
    ],
    avatar: [null, [Validators.required]],
    bio: ['', [Validators.maxLength(NewContactDialogComponent.bioMaxLength)]],
    notes: [[]],
  } as Keys<User>);

  private readonly subscription = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<NewContactDialogComponent>,
    private readonly store: Store<State>,
    private readonly actions$: Actions,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.actions$.pipe(ofType(createUserSuccess)).subscribe(({ user }) => {
        this.dialogRef.close(user);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(createUser({ user: this.formGroup.value as User }));
    }
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
