import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { environment } from 'src/environments/environment';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoMessageformat } from '@jsverse/transloco-messageformat';

export const appConfig: ApplicationConfig = {
  providers: [
    environment.production
      ? provideRouter(routes)
      : provideRouter(
          routes,
          withPreloading(PreloadAllModules),
          withDebugTracing(),
        ),

    provideAnimationsAsync(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    provideExperimentalZonelessChangeDetection(),
    provideTransloco({
      config: {
        availableLangs: ['en'],
        defaultLang: 'en',
        fallbackLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoMessageformat(), // Must come AFTER provideTransloco()!
  ],
};
