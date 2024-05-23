import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { AVATARS, Avatar, GENDERS, Gender, Note, User } from '../../models';
import { ContactManagerActions } from '../../store';
import { MaterialModule } from 'src/app/material.module';
import { y2kValidator, year2012Validator } from 'src/app/utils';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, TranslateModule],
})
export class NewContactDialogComponent {
  static readonly nameMaxLength = 20;
  static readonly bioMaxLength = 30;

  private readonly dialogRef = inject(MatDialogRef<NewContactDialogComponent>);
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  readonly avatars = AVATARS;
  readonly genders = GENDERS;
  readonly minBirthDate = new Date('1970-01-01Z00:00:00:000');
  readonly maxBirthDate = new Date();
  readonly formGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    birthDate: new FormControl<Date | null>(null, [
      Validators.required,
      y2kValidator,
      year2012Validator,
    ]),
    gender: new FormControl<Gender | null>(null, [Validators.required]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(NewContactDialogComponent.nameMaxLength),
    ]),
    avatar: new FormControl<Avatar | null>(null, [Validators.required]),
    bio: new FormControl<string>('', [
      Validators.maxLength(NewContactDialogComponent.bioMaxLength),
    ]),
    notes: new FormControl<Note[]>([]),
  });

  constructor() {
    this.actions$
      .pipe(
        ofType(ContactManagerActions.createUserSuccess),
        takeUntilDestroyed(),
      )
      .subscribe(({ user }) => {
        this.dialogRef.close(user);
      });
  }

  save(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(
        ContactManagerActions.createUser({
          user: this.formGroup.getRawValue() as User,
        }),
      );
    }
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
