import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {environment} from "../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig},
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ]
};
