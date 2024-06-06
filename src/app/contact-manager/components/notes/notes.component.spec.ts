import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import {
  MatRowHarness,
  MatTableHarness
} from '@angular/material/table/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslocoService } from '@jsverse/transloco';
import {
  Spectator,
  SpyObject,
  createComponentFactory
} from '@ngneat/spectator/jest';

import { NotesComponent } from './notes.component';
import { Note } from '../../models';
import { USERS_MOCK } from '../../testing';
import { randomizedSubArray, provideTranslocoTesting } from 'src/app/testing';

describe(`NotesComponent`, () => {
  let loader: HarnessLoader;
  let spectator: Spectator<NotesComponent>;
  let translocoService: SpyObject<TranslocoService>;
  const prefix = 'ContactManager.Notes.';
  const usersData = randomizedSubArray(USERS_MOCK);
  const createComponent = createComponentFactory({
    component: NotesComponent,
    providers: [provideTranslocoTesting(), provideAnimationsAsync()]
  });

  beforeEach(() => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    translocoService = spectator.inject(TranslocoService);
  });

  it(`should create the component`, () => {
    expect(spectator).toBeTruthy();
  });

  it(`should have an empty table when user has no notes`, () => {
    spectator.setInput({ notes: [] });

    const noDataRow = spectator.query('tr td');
    const noDataMessage = translocoService.translate(
      `${prefix}Grid.Empty.NoData`
    );

    expect(noDataRow).toBeTruthy();
    expect(noDataRow).toHaveText(noDataMessage);
  });

  it(`should have rows for all the user's notes on the current table page`, async () => {
    const matTableHarness = await loader.getHarness(MatTableHarness);

    for (const user of usersData) {
      const notes = randomizedSubArray(user.notes);

      spectator.setInput({ notes });

      const rows = await matTableHarness.getRows();

      // Limit to number of rows, since paging prevents seeing all notes.
      for (const [index, row] of rows.entries()) {
        const note = notes[index];

        await expectRowMatchesNote(row, note);
      }
    }
  });

  it(`should filter table based on input`, async () => {
    const notes = randomizedSubArray(usersData[0].notes);
    const matTableHarness = await loader.getHarness(MatTableHarness);
    const filterInput = await loader.getHarness(MatInputHarness);

    spectator.setInput({ notes });

    for (const note of notes) {
      await filterInput.setValue(note.title);
      const rows = await matTableHarness.getRows();

      await expectRowMatchesNote(rows[0], note);
    }
  });

  it(`should have an empty table when filter value doesn't match`, async () => {
    const notes = randomizedSubArray(usersData[0].notes);

    spectator.setInput({ notes });

    const filterInput = await loader.getHarness(MatInputHarness);
    const invalidFilters = [
      'a filter that will not match!',
      'another invalid filter!',
      'you know the drill...'
    ];

    for (const filterValue of invalidFilters) {
      const noMatchingDataMessage = translocoService.translate(
        `${prefix}Grid.Empty.NoMatchingDataForFilter`,
        { filterValue }
      );

      await filterInput.setValue(filterValue);

      const noDataRow = spectator.query('tr td');

      expect(noDataRow).toBeTruthy();
      expect(noDataRow).toHaveText(noMatchingDataMessage);
    }
  });

  async function expectRowMatchesNote(
    row: MatRowHarness,
    note: Note
  ): Promise<void> {
    const cells = await row.getCells();
    const cellStrings = await parallel(() =>
      cells.map((cell) => cell.getText())
    );
    const noteDate = translocoService.translate(
      `${prefix}Grid.Columns.Date.Format`,
      {
        value: note.date
      }
    );

    expect(cellStrings[0]).toBe(note.id.toString());
    expect(cellStrings[1]).toBe(note.title);
    expect(cellStrings[2]).toBe(noteDate);
  }
});
