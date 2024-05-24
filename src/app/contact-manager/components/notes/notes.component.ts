import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { Note } from '../../models';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule, TranslateModule],
})
export class NotesComponent implements AfterViewInit {
  protected readonly dataSource = new MatTableDataSource<Note>();

  protected displayedColumns = ['id', 'title', 'date'];

  @ViewChild(MatSort) protected sort?: MatSort;
  @ViewChild(MatPaginator) protected paginator?: MatPaginator;

  @Input({ required: true }) set notes(value: Note[]) {
    this.dataSource.data = value;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort ?? null;
    this.dataSource.paginator = this.paginator ?? null;
  }

  protected applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
