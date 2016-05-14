import {provide} from '@angular/core';
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {APP_BASE_HREF} from '@angular/common';
import { AppComponent }     from './app.component';
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue : '/' })
]);