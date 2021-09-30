import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ExcelGetService {
  data: any = null;

  constructor() {


  }

  getListOfNames(){
    // return this.googleSheetsDbService.get()
  }

}
