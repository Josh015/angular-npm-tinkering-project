import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
  SimpleSnackBar
} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

import { User } from '../../models';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    TranslocoDirective
  ]
})
export class ToolbarComponent {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly translocoService = inject(TranslocoService);

  readonly toggleSidenav = output();
  readonly toggleTheme = output();
  readonly toggleDir = output();

  protected openAddContactDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        const snackBar: Record<string, string> =
          this.translocoService.translateObject(
            'ContactManager.Toolbar.SnackBar'
          );

        this.openSnackBar(snackBar['Message'], snackBar['Action'])
          .onAction()
          .subscribe(() => {
            void this.router.navigate(['/contact-manager', result.id]);
          });
      }
    });
  }

  protected openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
