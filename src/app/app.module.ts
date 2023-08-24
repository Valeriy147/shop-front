import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthFeature } from './auth/store/auth.reducer';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { AuthEffects } from './auth/store/index';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsFeature } from './products/store/products.reducer';
import { ProductsEffects } from './products/store';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    StoreModule.forFeature(ProductsFeature),
    StoreModule.forFeature(AuthFeature),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    EffectsModule.forFeature([ProductsEffects]),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    SocketIoModule.forRoot(config),
  ],
  providers: [
    AuthService,
    AuthGuard,
    INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
