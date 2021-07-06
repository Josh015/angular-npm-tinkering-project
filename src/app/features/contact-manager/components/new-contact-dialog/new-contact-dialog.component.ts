import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { User } from '../../models';
import { createUser, createUserSuccess, State } from '../../state';
import {
  newFormGroupTyped,
  y2kValidator,
  year2012Validator,
} from 'src/app/utils';

@UntilDestroy()
@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewContactDialogComponent implements OnInit {
  static readonly nameMaxLength = 20;
  static readonly bioMaxLength = 30;

  readonly avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  readonly minBirthDate = new Date('1970-01-01Z00:00:00:000');
  readonly maxBirthDate = new Date();
  readonly formGroup = newFormGroupTyped<User>({
    id: [null],
    birthDate: [null, [Validators.required, y2kValidator, year2012Validator]],
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

  constructor(
    private readonly dialogRef: MatDialogRef<NewContactDialogComponent>,
    private readonly store: Store<State>,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(createUserSuccess), untilDestroyed(this))
      .subscribe(({ user }) => {
        this.dialogRef.close(user);
      });
  }

  save(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(createUser({ user: this.formGroup.value }));
    }
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
