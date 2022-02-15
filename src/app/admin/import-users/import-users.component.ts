import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-users',
  templateUrl: './import-users.component.html',
  styleUrls: ['./import-users.component.scss']
})
export class ImportUsersComponent implements OnInit {  
    fileName = '';
    allTextLines = [];
    constructor(private http: HttpClient) {}
    ngOnInit(){}

    onFileSelected(event:any) {

        const file:File = event.target.files[0];

        if (file) {
          console.log(file)

          this.fileName = file.name;
          //File reader method
          let reader: FileReader = new FileReader();
          reader.readAsText(file);
          reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = [];
          this.allTextLines = csv.split(/\r|\n|\r/);

          };
        }
    }
}
