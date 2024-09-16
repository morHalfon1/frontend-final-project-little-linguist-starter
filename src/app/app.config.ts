import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideAnimationsAsync('noop'),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-mor-tal',
        appId: '1:510893949297:web:d645cf15c6a72b9b4d36d0',
        storageBucket: 'little-linguist-mor-tal.appspot.com',
        apiKey: 'AIzaSyB3L5RMxvlDTZHrAp-OO0tajvVV9zCOd1E',
        authDomain: 'little-linguist-mor-tal.firebaseapp.com',
        messagingSenderId: '510893949297',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
