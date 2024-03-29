import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guard/auth.guard';
import { AppErrorHandle } from './app.error-handle';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgbDateParserBRFormatter } from './drivers/ngb-date-parser-br-formatter';
import { IConfig, NgxMaskModule } from 'ngx-mask';

registerLocaleData(localePt);

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#2a95df",
  fgsColor: "#2a95df",
  bgsOpacity: 0.1,
  fgsType: "folding-cube",
};

export let options: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: false,
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    AuthModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxMaskModule.forRoot(options),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandle },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: NgbDateParserFormatter, useClass: NgbDateParserBRFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
