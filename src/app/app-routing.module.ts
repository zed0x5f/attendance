import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetumCodesComponent } from './pageComponents/netum-codes/netum-codes.component';
import { AdminHomeComponent } from './pageComponents/admin/home/home.component';
import { ImportUsersComponent } from './pageComponents/admin/import-users/import-users.component';
import { AttendanceExportComponent } from './pageComponents/attendance-export/attendance-export.component';
import { ConsoleCheckinComponent } from './pageComponents/console-checkin/console-checkin.component';
import { HomeComponent } from './pageComponents/home/home.component';
import { MealAttendanceComponent } from './pageComponents/meals-forms/meal-attendance/meal-attendance.component';
import { UsersComponent } from './users/users/users.component';

//helper function
let makeRoute = (pathI: string, componentI: any) => {
  return { path: pathI, component: componentI };
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  makeRoute('meal', MealAttendanceComponent),
  // makeRoute('meal2', MealFormTemplateDrivenComponent),
  makeRoute('console', ConsoleCheckinComponent),
  makeRoute('admin', AdminHomeComponent),
  makeRoute('admin/import-users', ImportUsersComponent),
  // makeRoute('signin',SigninComponent)
  makeRoute('admin/users', UsersComponent),
  makeRoute('exports', AttendanceExportComponent),
  makeRoute('codes', NetumCodesComponent),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
