import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() readonly toggleSidenav = new EventEmitter<void>();
  @Output() readonly toggleTheme = new EventEmitter<void>();
  @Output() readonly toggleDir = new EventEmitter<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  openAddContactDialog() {
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.translate
          .get([
            'ContactManager.Toolbar.SnackBar.Message',
            'ContactManager.Toolbar.SnackBar.Action',
          ])
          .subscribe((values) => {
            this.openSnackBar(
              values['ContactManager.Toolbar.SnackBar.Message'],
              values['ContactManager.Toolbar.SnackBar.Action']
            )
              .onAction()
              .subscribe(() => {
                this.router.navigate(['/contact-manager', result.id]);
              });
          });
      }
    });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
