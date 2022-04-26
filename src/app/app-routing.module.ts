import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pageComponents/admin/home/home.component';
import { ImportUsersComponent } from './pageComponents/admin/import-users/import-users.component';
import { AttendanceExportComponent } from './pageComponents/attendance-export/attendance-export.component';
import { ConsoleCheckinComponent } from './pageComponents/console-checkin/console-checkin.component';
import { HomeComponent } from './pageComponents/home/home.component';
import { MealAttendanceComponent } from './pageComponents/meal-attendance/meal-attendance.component';
import { MealFormTemplateDrivenComponent } from './pageComponents/meal-form-template-driven/meal-form-template-driven.component';
import { UsersComponent } from './users/users/users.component';

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
  // makeRoute('signin',SigninComponent)
  makeRoute('admin/users', UsersComponent),
  makeRoute('exports',AttendanceExportComponent)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
