import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {AuthenticationModule} from './authentication/authentication.module';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {XhrInterceptor} from './config/interceptors/xhr.interceptor';
import {XsrfInterceptor} from './config/interceptors/xsrf.interceptor';
import {HomeModule} from './home/home.module';
import {SettingsModule} from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthenticationModule,
    HomeModule,
    SettingsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor, // interceptor to enable XMLHttpRequest
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XsrfInterceptor, // interceptor to set header X-XSRF-TOKEN
      multi: true
    }
  ],
  exports: [
    MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
