import { createComponentFactory } from '@ngneat/spectator';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent
  });

  it('should create the app', () => {
    expect(createComponent()).toBeTruthy();
  });
});
