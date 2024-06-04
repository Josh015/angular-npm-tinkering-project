import { createComponentFactory } from '@ngneat/spectator';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    declareComponent: false,
  });

  it('should create the app', () => {
    expect(createComponent()).toBeTruthy();
  });
});
