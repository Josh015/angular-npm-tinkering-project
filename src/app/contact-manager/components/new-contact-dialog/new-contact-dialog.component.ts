import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Note, User } from '../../models';
import { createUser, createUserSuccess, State } from '../../store';
import { y2kValidator, year2012Validator } from 'src/app/utils';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared';
import { UsersConstants } from '../../services/users-constants';

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

@UntilDestroy()
@Component({
  selector: 'app-new-contact-dialog',
  standalone: true,
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, SharedModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewContactDialogComponent implements OnInit {
  static readonly nameMaxLength = 20;
  static readonly bioMaxLength = 30;

  private readonly dialogRef = inject(MatDialogRef<NewContactDialogComponent>);
  private readonly store = inject(Store<State>);
  private readonly actions$ = inject(Actions);

  readonly usersConstants = inject(UsersConstants);
  readonly minBirthDate = new Date('1970-01-01Z00:00:00:000');
  readonly maxBirthDate = new Date();
  readonly formGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    birthDate: new FormControl<Date | null>(null, [
      Validators.required,
      y2kValidator,
      year2012Validator,
    ]),
    gender: new FormControl<string | null>(null, [Validators.required]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(NewContactDialogComponent.nameMaxLength),
    ]),
    avatar: new FormControl<string | null>(null, [Validators.required]),
    bio: new FormControl<string>('', [
      Validators.maxLength(NewContactDialogComponent.bioMaxLength),
    ]),
    notes: new FormControl<Note[]>([]),
  });

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(createUserSuccess), untilDestroyed(this))
      .subscribe(({ user }) => {
        this.dialogRef.close(user);
      });
  }

  save(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(
        createUser({ user: this.formGroup.getRawValue() as User }),
      );
    }
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
