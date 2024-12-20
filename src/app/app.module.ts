import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { AuthenticationService } from '../auth/services/authentication.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { SpacexLatestLaunchComponent } from './components/spacex-latest-launch/spacex-latest-launch.component';
import { SpacexUpcomingLaunchesComponent } from './components/spacex-upcoming-launches/spacex-upcoming-launches.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { InputDirective } from './directives/input.directive';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ErrorInterceptor } from '../auth/interceptors/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputComponent,
    InputDirective,
    ValidationMessageComponent,
    RegisterComponent,
    SpacexLatestLaunchComponent,
    NavbarComponent,
    SpacexUpcomingLaunchesComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
