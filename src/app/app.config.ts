import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { routes } from './app.routes';
import { appFeature } from './store';
import { environment } from 'src/environments/environment';

export const createTranslateLoader = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

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
    provideStore({ router: routerReducer }),
    provideState(appFeature),
    provideRouterStore(),
    provideEffects([]),

    environment.production
      ? []
      : provideStoreDevtools({
          name: 'Angular NPM Tinkering Project App DevTools',
          maxAge: 25,
          logOnly: environment.production,
        }),

    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler,
        },
      }),
    ]),
  ],
};
