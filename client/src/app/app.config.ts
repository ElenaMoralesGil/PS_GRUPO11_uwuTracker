import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { __env } from '../environments/env'
process.env = __env

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes), provideClientHydration() ]
};