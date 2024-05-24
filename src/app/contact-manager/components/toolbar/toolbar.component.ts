import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { User } from '../../models';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule, TranslateModule],
})
export class ToolbarComponent {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  @Output() protected readonly toggleSidenav = new EventEmitter<void>();
  @Output() protected readonly toggleTheme = new EventEmitter<void>();
  @Output() protected readonly toggleDir = new EventEmitter<void>();

  protected openAddContactDialog(): void {
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

  protected openSnackBar(
    message: string,
    action: string,
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
