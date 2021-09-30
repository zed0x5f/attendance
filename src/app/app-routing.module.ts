import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MealAttendanceComponent } from './meal-attendance/meal-attendance.component';
import { MealFormTemplateDrivenComponent } from './meal-form-template-driven/meal-form-template-driven.component';

//helper function
let makeRoute = (pathI:string,componentI:any)=>{
  return {path:pathI,component:componentI};
}

const routes: Routes = [
  { path: '', component: HomeComponent},
  makeRoute("meal",MealAttendanceComponent),
  makeRoute("meal2",MealFormTemplateDrivenComponent),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
