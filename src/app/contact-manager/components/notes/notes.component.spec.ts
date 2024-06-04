import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslocoService } from '@jsverse/transloco';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { NotesComponent } from './notes.component';
import { USERS_MOCK } from '../../testing';
import { getTranslocoModule } from 'src/app/testing';

describe(`NotesComponent`, () => {
  let loader: HarnessLoader;
  let spectator: Spectator<NotesComponent>;
  let translocoService: TranslocoService;
  const createComponent = createComponentFactory({
    component: NotesComponent,
    declareComponent: false,
    imports: [getTranslocoModule()],
    providers: [provideAnimationsAsync()],
  });
  // let user: User;

  beforeEach(() => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    translocoService = TestBed.inject(TranslocoService);
  });

  it(`should create the notes`, () => {
    expect(spectator).toBeTruthy();
  });

  it(`should have an empty table when user has no notes`, async () => {
    spectator.setInput({ notes: [] });

    const matTableHarness = await loader.getHarness(MatTableHarness);
    const rows = await matTableHarness.getRows();

    expect(rows.length).toBe(0);

    // TODO: How to get "no data" row and check the message?
  });

  it(`should have rows for all the user's notes`, async () => {
    const matTableHarness = await loader.getHarness(MatTableHarness);

    for (const user of USERS_MOCK) {
      spectator.setInput({ notes: user.notes });

      const rows = await matTableHarness.getRows();

      // Limit to number of rows, since paging prevents seeing all notes.
      for (const [index, row] of rows.entries()) {
        const cells = await row.getCells();
        const note = user.notes[index];
        const cellStrings = await parallel(() =>
          cells.map((cell) => cell.getText()),
        );

        expect(cellStrings[0]).toBe(note.id.toString());
        expect(cellStrings[1]).toBe(note.title);
        expect(cellStrings[2]).toBe(
          translocoService.translate(
            'ContactManager.Notes.Grid.Columns.Date.Format',
            { value: note.date },
          ),
        );
      }
    }
  });

  // TODO: Test filtering, including displaying different messages with filter in it!
});
