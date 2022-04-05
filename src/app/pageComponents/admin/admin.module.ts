import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './home/home.component';
import { ImportUsersComponent } from './import-users/import-users.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    ImportUsersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
