import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MealAttendanceComponent } from './meal-attendance/meal-attendance.component';
import { MealFormTemplateDrivenComponent } from './meal-form-template-driven/meal-form-template-driven.component';
import { ConsoleCheckinComponent } from './console-checkin/console-checkin.component';
import { FirebaseService } from './service/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealAttendanceComponent,
    MealFormTemplateDrivenComponent,
    ConsoleCheckinComponent
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
