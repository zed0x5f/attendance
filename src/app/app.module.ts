import {environment} from '../environments/environment';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pageComponents/home/home.component';
import { MealAttendanceComponent } from './pageComponents/meal-attendance/meal-attendance.component';
import { MealFormTemplateDrivenComponent } from './pageComponents/meal-form-template-driven/meal-form-template-driven.component';
import { ConsoleCheckinComponent } from './pageComponents/console-checkin/console-checkin.component';
import { FirebaseService } from './service/firebase.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './pageComponents/sign-in/sign-in.component';
import { AngularFireModule } from '@angular/fire/compat';
import { UsersModule } from './users/users.module';
import { AuthTokenHttpInterceptorProvider } from './interceptors/auth-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealAttendanceComponent,
    MealFormTemplateDrivenComponent,
    ConsoleCheckinComponent,
    SignInComponent,
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
  ],
  providers: [FirebaseService, AuthTokenHttpInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
