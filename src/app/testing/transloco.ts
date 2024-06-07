/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { importProvidersFrom } from '@angular/core';
import {
  TranslocoTestingModule,
  TranslocoTestingOptions
} from '@jsverse/transloco';
import { provideTranslocoMessageformat } from '@jsverse/transloco-messageformat';
import en from 'public/i18n/en.json';

export function provideTranslocoTesting(options: TranslocoTestingOptions = {}) {
  return [
    importProvidersFrom(
      TranslocoTestingModule.forRoot({
        langs: { en },
        translocoConfig: {
          availableLangs: ['en'],
          defaultLang: 'en',
          fallbackLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: false
        },
        preloadLangs: true,
        ...options
      })
    ),
    provideTranslocoMessageformat()
  ];
}
