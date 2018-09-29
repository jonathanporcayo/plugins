import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import {Camera} from '@ionic-native/camera';

import { Geolocation } from '@ionic-native/geolocation';

import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    FileOpener,
    BarcodeScanner,
    Camera,
    Geolocation,
    SQLite
  ]
})
export class AppModule {}
