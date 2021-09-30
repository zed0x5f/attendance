import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MealAttendanceComponent } from './meal-attendance/meal-attendance.component';
import { MealFormTemplateDrivenComponent } from './meal-form-template-driven/meal-form-template-driven.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealAttendanceComponent,
    MealFormTemplateDrivenComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
