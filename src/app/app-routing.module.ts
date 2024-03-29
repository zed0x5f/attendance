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
import { AttendanceReviewComponent } from './pageComponents/admin/attendance-review/attendance-review.component';
import { AttendanceCrossRefComponent } from './pageComponents/admin/attendance-cross-ref/attendance-cross-ref.component';

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
  makeRoute('admin/members', MemberCrudComponent),
  makeRoute('admin/attendance-review', AttendanceReviewComponent),
  makeRoute('admin/cross-refrence',AttendanceCrossRefComponent),
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
