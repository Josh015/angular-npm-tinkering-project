import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { User } from '../../models';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        const keys = [
          'ContactManager.Toolbar.SnackBar.Message',
          'ContactManager.Toolbar.SnackBar.Action',
        ];

        this.translate.get(keys).subscribe((values: Record<string, string>) => {
          this.openSnackBar(values[keys[0]], values[keys[1]])
            .onAction()
            .subscribe(() => {
              void this.router.navigate(['/contact-manager', result.id]);
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
