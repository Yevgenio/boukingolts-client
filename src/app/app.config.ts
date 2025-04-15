import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http'; // service worker

// import { provideTranslations } from '@ngx-translate/core';
// import { HttpLoaderFactory } from './translate-loader';
// import { provideTranslate } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient() // service worker
    // provideTranslate({
    //   defaultLanguage: 'en',
    //   loader: {
    //     provide: 'TRANSLOADER',
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  ]
};
