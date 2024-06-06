import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoDirective } from '@jsverse/transloco';

import { Note } from '../../models';
import { MaterialModule } from 'src/app/shared';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule, TranslocoDirective]
})
export class NotesComponent implements AfterViewInit {
  private readonly sort = viewChild.required(MatSort);
  private readonly paginator = viewChild.required(MatPaginator);

  protected readonly dataSource = new MatTableDataSource<Note>();
  protected readonly displayedColumns = ['id', 'title', 'date'];

  readonly notes = input<Note[]>([]);
  private readonly _notes = toObservable(this.notes);

  constructor() {
    this._notes.pipe(takeUntilDestroyed()).subscribe((n) => {
      this.dataSource.data = n;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort();
    this.dataSource.paginator = this.paginator();
  }

  protected applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
