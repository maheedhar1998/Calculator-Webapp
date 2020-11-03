import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import firebase from 'firebase';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDTPCzCCdTe1dJbY_N2NM97L4ucev1hPS4",
      authDomain: "calculator-webapp-dbeef.firebaseapp.com",
      databaseURL: "https://calculator-webapp-dbeef.firebaseio.com",
      projectId: "calculator-webapp-dbeef",
      storageBucket: "calculator-webapp-dbeef.appspot.com",
      messagingSenderId: "42496363585",
      appId: "1:42496363585:web:7b23c11943880f46f80ac0",
      measurementId: "G-8XT7P2763M"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
