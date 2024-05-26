import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

import { User } from '../../models';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule, TranslocoDirective],
})
export class ToolbarComponent {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly translocoService = inject(TranslocoService);

  protected readonly toggleSidenav = output();
  protected readonly toggleTheme = output();
  protected readonly toggleDir = output();

  protected openAddContactDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        const translations = this.translocoService.translate<string[]>([
          'ContactManager.Toolbar.SnackBar.Message',
          'ContactManager.Toolbar.SnackBar.Action',
        ]);

        this.openSnackBar(translations[0], translations[1])
          .onAction()
          .subscribe(() => {
            void this.router.navigate(['/contact-manager', result.id]);
          });
      }
    });
  }

  protected openSnackBar(
    message: string,
    action: string,
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
