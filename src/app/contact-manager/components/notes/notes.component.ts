import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  viewChild,
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
  private readonly sort = viewChild.required(MatSort);
  private readonly paginator = viewChild.required(MatPaginator);

  protected readonly dataSource = new MatTableDataSource<Note>();

  protected displayedColumns = ['id', 'title', 'date'];

  @Input({ required: true }) set notes(value: Note[]) {
    this.dataSource.data = value;
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
