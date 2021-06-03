import { Subscription } from 'rxjs';
import { Keys } from 'src/app/shared';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { User } from '../../models/users.model';
import { createUser, createUserSuccess, State } from '../../state';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit, OnDestroy {
  static readonly nameMaxLength = 20;
  static readonly bioMaxLength = 30;

  readonly avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  readonly formGroup = this.fb.group(<Keys<User>>{
    id: [null],
    birthDate: [null, [Validators.required]],
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
