import { Subscription } from 'rxjs';
import { Keys } from 'src/app/shared';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { User } from '../../models/users.model';
import { createUser, createUserSuccess, State } from '../../state';

export class CustomValidators {
  static y2kValidator(control: FormControl): any {
    const date: Date | null = control.value;

    if (
      !date ||
      date.getFullYear() !== 2000 ||
      date.getMonth() !== 0 ||
      date.getDate() !== 1
    ) {
      return null;
    }

    return {
      y2k: true,
    };
  }

  static year2012Validator(control: FormControl): any {
    const date: Date | null = control.value;

    if (
      !date ||
      date.getFullYear() !== 2012 ||
      date.getMonth() !== 11 ||
      date.getDate() !== 21
    ) {
      return null;
    }

    return {
      year2012: true,
    };
  }
}

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit, OnDestroy {
  static readonly nameMaxLength = 20;
  static readonly bioMaxLength = 30;

  readonly avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  readonly minBirthDate = new Date('1970-01-01Z00:00:00:000');
  readonly maxBirthDate = new Date();
  readonly formGroup = this.fb.group(<Keys<User>>{
    id: [null],
    birthDate: [
      null,
      [
        Validators.required,
        CustomValidators.y2kValidator,
        CustomValidators.year2012Validator,
      ],
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
  });

  private readonly subscription = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<NewContactDialogComponent>,
    private readonly store: Store<State>,
    private readonly actions$: Actions,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.actions$
        .pipe(ofType(createUserSuccess))
        .subscribe(({ user }) => this.dialogRef.close(user))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    if (this.formGroup.valid) {
      this.store.dispatch(createUser({ user: this.formGroup.value }));
    }
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
