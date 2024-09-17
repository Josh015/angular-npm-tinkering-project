import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';

import { Avatar, AVATARS, Gender, GENDERS, Note, User } from '../../models';
import { UserService } from '../../services/user.service';
import { y2kValidator, year2012Validator } from 'src/app/utils';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslocoDirective
  ]
})
export class NewContactDialogComponent {
  static readonly nameMaxLength = 20;
  static readonly bioMaxLength = 30;

  private readonly dialogRef = inject(MatDialogRef<NewContactDialogComponent>);
  private readonly userService = inject(UserService);

  protected readonly avatars = AVATARS;
  protected readonly genders = GENDERS;
  protected readonly minBirthDate = new Date('1970-01-01Z00:00:00:000');
  protected readonly maxBirthDate = new Date();
  protected readonly formGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    birthDate: new FormControl<Date | null>(null, [
      Validators.required,
      y2kValidator,
      year2012Validator
    ]),
    gender: new FormControl<Gender | null>(null, [Validators.required]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(NewContactDialogComponent.nameMaxLength)
    ]),
    avatar: new FormControl<Avatar | null>(null, [Validators.required]),
    bio: new FormControl<string>('', [
      Validators.maxLength(NewContactDialogComponent.bioMaxLength)
    ]),
    notes: new FormControl<Note[]>([])
  });

  protected async save(): Promise<void> {
    if (this.formGroup.valid) {
      try {
        const user = await this.userService.create(
          this.formGroup.getRawValue() as User
        );

        this.dismiss(user);
      } catch (error) {
        console.error(error);
        this.dismiss();
      }
    }
  }

  protected dismiss(user?: User): void {
    this.dialogRef.close(user ?? null);
  }
}
