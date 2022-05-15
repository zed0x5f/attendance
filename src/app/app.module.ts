import {environment} from '../environments/environment';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pageComponents/home/home.component';
import { MealAttendanceComponent } from './pageComponents/meals-forms/meal-attendance/meal-attendance.component';
import { ConsoleCheckinComponent } from './pageComponents/console-checkin/console-checkin.component';
import { FirebaseService } from './service/firebase.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './modals/sign-in/sign-in.component';
import { UsersModule } from './users/users.module';
import { AuthTokenHttpInterceptorProvider } from './interceptors/auth-token.interceptor';
import { AttendanceExportComponent } from './pageComponents/admin/attendance-export/attendance-export.component';
import { NetumCodesComponent } from './pageComponents/netum-codes/netum-codes.component';
import { MealFormTemplateDrivenComponent } from './pageComponents/meals-forms/meal-form-template-driven/meal-form-template-driven.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DownloadCsvComponent } from './shared-components/download-csv/download-csv.component';
import { ImportUsersComponent } from './pageComponents/admin/import-users/import-users.component';
import { AuthService } from './service/auth.service';
import { MemberCrudComponent } from './pageComponents/admin/member-crud/member-crud.component';
import { CreateMemberModalComponent } from './modals/create-member-modal/create-member-modal.component';
import { ToggleBtnComponent } from './shared-components/toggle-btn/toggle-btn.component';
import { ImportReservationsComponent } from './pageComponents/admin/import-reservations/import-reservations.component';
import { MemberDietaryComponent } from './pageComponents/member-dietary/member-dietary.component';
import { AttendanceReviewComponent } from './pageComponents/admin/attendance-review/attendance-review.component';
import { AttendanceReviewCellComponent } from './attendance-review-cell/attendance-review-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealAttendanceComponent,
    MealFormTemplateDrivenComponent,
    ConsoleCheckinComponent,
    SignInComponent,
    AttendanceExportComponent,
    NetumCodesComponent,
    DownloadCsvComponent,
    ImportUsersComponent,
    MemberCrudComponent,
    CreateMemberModalComponent,
    ToggleBtnComponent,
    ImportReservationsComponent,
    MemberDietaryComponent,
    AttendanceReviewComponent,
    AttendanceReviewCellComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UsersModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ],  
  providers: [AuthService, FirebaseService, AuthTokenHttpInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
