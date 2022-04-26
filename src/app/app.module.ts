import {environment} from '../environments/environment';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pageComponents/home/home.component';
import { MealAttendanceComponent } from './pageComponents/meals-forms/meal-attendance/meal-attendance.component';
import { ConsoleCheckinComponent } from './pageComponents/console-checkin/console-checkin.component';
import { FirebaseService } from './service/firebase.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './modals/sign-in/sign-in.component';
import { AngularFireModule } from '@angular/fire/compat';
import { UsersModule } from './users/users.module';
import { AuthTokenHttpInterceptorProvider } from './interceptors/auth-token.interceptor';
import { AttendanceExportComponent } from './pageComponents/attendance-export/attendance-export.component';
import { NetumCodesComponent } from './pageComponents/netum-codes/netum-codes.component';
import { MealFormTemplateDrivenComponent } from './pageComponents/meals-forms/meal-form-template-driven/meal-form-template-driven.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealAttendanceComponent,
    MealFormTemplateDrivenComponent,
    ConsoleCheckinComponent,
    SignInComponent,
    AttendanceExportComponent,
    NetumCodesComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UsersModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [FirebaseService, AuthTokenHttpInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
