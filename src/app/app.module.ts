import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';
import { NewsModule } from './news/news.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AuthModule } from './auth/auth.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeComponent } from './home/home.component';
import { LegalModule } from './legal/legal.module';
import { WeatherModule } from './weather/weather.module';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    ServicesModule,
    NewsModule,
    InfiniteScrollModule,
    AuthModule,
    LegalModule,
    WeatherModule,
    UtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BrowserModule, InfiniteScrollModule]
})
export class AppModule { }
