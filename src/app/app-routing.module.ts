import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetumCodesComponent } from './pageComponents/netum-codes/netum-codes.component';
import { ImportUsersComponent } from './pageComponents/admin/import-users/import-users.component';
import { AttendanceExportComponent } from './pageComponents/admin/attendance-export/attendance-export.component';
import { ConsoleCheckinComponent } from './pageComponents/console-checkin/console-checkin.component';
import { HomeComponent } from './pageComponents/home/home.component';
import { MealAttendanceComponent } from './pageComponents/meals-forms/meal-attendance/meal-attendance.component';
import { UsersComponent } from './users/users/users.component';
import { MemberCrudComponent } from './pageComponents/admin/member-crud/member-crud.component';
import { ImportReservationsComponent } from './pageComponents/admin/import-reservations/import-reservations.component';

//helper function
let makeRoute = (pathI: string, componentI: any) => {
  return { path: pathI, component: componentI };
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  makeRoute('meal', MealAttendanceComponent),
  // makeRoute('meal2', MealFormTemplateDrivenComponent),
  makeRoute('console', ConsoleCheckinComponent),
  makeRoute('admin/import-members', ImportUsersComponent),
  makeRoute('admin/import-reservations', ImportReservationsComponent),
  // makeRoute('signin',SigninComponent)
  makeRoute('admin/users', UsersComponent),
  makeRoute('exports', AttendanceExportComponent),
  makeRoute('codes', NetumCodesComponent),
  makeRoute('admin/members', MemberCrudComponent),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
