import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { effects, reducers } from 'src/store/app.store'
import { routes } from './app.routes'
import { API_URL } from 'src/tokens/api-url.token'
import { environment } from 'src/environments/environment'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects(effects),
    provideHttpClient(),
    { provide: API_URL, useValue: environment.apiUrl },
  ],
}
