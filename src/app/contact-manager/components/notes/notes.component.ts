import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  viewChild
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslocoDirective } from '@jsverse/transloco';

import { Note } from '../../models';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    TranslocoDirective
  ]
})
export class NotesComponent implements AfterViewInit {
  private readonly sort = viewChild.required(MatSort);
  private readonly paginator = viewChild.required(MatPaginator);

  protected readonly dataSource = new MatTableDataSource<Note>();
  protected readonly displayedColumns = ['id', 'title', 'date'];

  readonly notes = input<Note[]>([]);
  private readonly notes$ = toObservable(this.notes);

  constructor() {
    this.notes$.subscribe((n) => {
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
