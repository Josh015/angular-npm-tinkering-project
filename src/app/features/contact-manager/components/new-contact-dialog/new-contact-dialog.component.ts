import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { User } from '../../models';
import { createUser, createUserSuccess, State } from '../../state';
import { ControlsGroup, y2kValidator, year2012Validator } from 'src/app/utils';

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
  readonly controls = {
    id: new FormControl(null),
    birthDate: new FormControl(null, [
      Validators.required,
      y2kValidator,
      year2012Validator,
    ]),
    gender: new FormControl(null, [Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(NewContactDialogComponent.nameMaxLength),
    ]),
    avatar: new FormControl(null, [Validators.required]),
    bio: new FormControl('', [
      Validators.maxLength(NewContactDialogComponent.bioMaxLength),
    ]),
    notes: new FormControl([]),
  } as ControlsGroup<User>;
  readonly formGroup = new FormGroup(this.controls);

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
      this.store.dispatch(createUser({ user: this.formGroup.value as User }));
    }
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
