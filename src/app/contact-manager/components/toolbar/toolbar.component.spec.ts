import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator';

import { ToolbarComponent } from './toolbar.component';
import { provideTranslocoTesting } from 'src/app/testing';

describe(`ToolbarComponent`, () => {
  let loader: HarnessLoader;
  let spectator: SpectatorRouting<ToolbarComponent>;
  const createComponent = createRoutingFactory({
    component: ToolbarComponent,
    stubsEnabled: false,
    imports: [MatIconTestingModule],
    providers: [provideAnimationsAsync(), provideTranslocoTesting()]
  });

  beforeEach(() => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
  });

  it(`should create the component`, () => {
    expect(spectator).toBeTruthy();
  });

  it(`should toggle sidenav when clicking the sidenav button`, () => {
    const emitSpy = spyOn(spectator.component.toggleSidenav, 'emit');

    spectator.click('[data-testid="toolbar-toggle-sidenav"]');

    expect(emitSpy).toHaveBeenCalled();
  });

  it(`should open the toolbar menu when clicking the open menu button`, async () => {
    const matMenuHarness = await loader.getHarness(MatMenuHarness);
    let isOpen = await matMenuHarness.isOpen();

    expect(isOpen).toBe(false);

    spectator.click('[data-testid="toolbar-open-menu"]');

    isOpen = await matMenuHarness.isOpen();
    expect(isOpen).toBe(true);
  });

  describe('Menu Buttons', () => {
    beforeEach(() => {
      spectator.click('[data-testid="toolbar-open-menu"]');
    });

    // TODO: New Contact Dialog opens.
    // TODO: Check that snackbar is made when it closes on success.
    // TODO: Check that snackbar is not made when it closes on cancel.
    // TODO: Test that snackbar triggers navigation.

    it(`should toggle theme when clicking the toggle theme button`, () => {
      const emitSpy = spyOn(spectator.component.toggleTheme, 'emit');

      spectator.click('[data-testid="toolbar-toggle-theme"]');

      expect(emitSpy).toHaveBeenCalled();
    });

    it(`should toggle dir when clicking the toggle dir button`, () => {
      const emitSpy = spyOn(spectator.component.toggleDir, 'emit');

      spectator.click('[data-testid="toolbar-toggle-dir"]');

      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
