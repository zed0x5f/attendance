import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/home/home.component';
import { ImportUsersComponent } from './admin/import-users/import-users.component';
import { ConsoleCheckinComponent } from './console-checkin/console-checkin.component';
import { HomeComponent } from './home/home.component';
import { MealAttendanceComponent } from './meal-attendance/meal-attendance.component';
import { MealFormTemplateDrivenComponent } from './meal-form-template-driven/meal-form-template-driven.component';
import { SigninComponent } from './signin/signin.component';

//helper function
let makeRoute = (pathI: string, componentI: any) => {
  return { path: pathI, component: componentI };
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  makeRoute('meal', MealAttendanceComponent),
  makeRoute('console', ConsoleCheckinComponent),
  makeRoute('meal2', MealFormTemplateDrivenComponent),
  makeRoute('admin', AdminHomeComponent),
  makeRoute('admin/import-users', ImportUsersComponent),
  makeRoute('signin',SigninComponent)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
