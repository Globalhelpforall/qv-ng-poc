import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { httpInterceptorProviders } from '@core/interceptors';
import { appInitializerProviders } from '@core/initializers';
import { FormlyConfigModule } from './formly-config.module';

import { coreServices } from '@core/services';
import { APP_CONFIG } from '@core/app-config';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FileValueAccessor } from './file-value-accessor';
import { FormlyFieldFile } from './file-type.component';
import { FormlyFieldButton } from './button-type.component';


@NgModule({
  declarations: [AppComponent,FileValueAccessor,FormlyFieldFile,FormlyFieldButton],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: APP_CONFIG.CSRF_COOKIE_NAME,
      headerName: APP_CONFIG.CSRF_HEADER_NAME,
    }),
    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'button',
          component: FormlyFieldButton,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              btnType: 'default',
              type: 'button',
            },
          },
        },
          { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
      ],
    }),
    FormlyConfigModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [httpInterceptorProviders, appInitializerProviders, coreServices],
  bootstrap: [AppComponent],
})
export class AppModule {}
