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
import { SigninComponent } from './pageComponents/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealAttendanceComponent,
    MealFormTemplateDrivenComponent,
    ConsoleCheckinComponent,
    SigninComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
