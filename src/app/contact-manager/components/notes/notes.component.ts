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

import { Note } from '../../models';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  imports: [MaterialModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements AfterViewInit {
  readonly dataSource = new MatTableDataSource<Note>();

  displayedColumns = ['id', 'title', 'date'];

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input() set notes(value: Note[]) {
    this.dataSource.data = value;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort ?? null;
    this.dataSource.paginator = this.paginator ?? null;
  }

  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
