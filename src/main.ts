declare var PRODUCTION: boolean;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (PRODUCTION) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// REQUIRED TO LET NGX-BOOTSTRAP that bootstrap 4 is used istead of 3 https://github.com/valor-software/ngx-bootstrap/blob/development/docs/getting-started/bootstrap4.md
window['__theme'] = 'bs4'; 