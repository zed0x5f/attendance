import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';



@Component({
  selector: 'app-import-users',
  templateUrl: './import-users.component.html',
  styleUrls: ['./import-users.component.scss'],
})
export class ImportUsersComponent implements OnInit {
  headers:string[]=[
    "EntityId",
    "LastName",
    "FirstName",
    "PersonType",
    "Email",
    "Status",
  ]
  fileName = '';
  allTextLines: string[][] = [];
  constructor(private fb: FirebaseService) {}
  ngOnInit() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      console.log(file);

      this.fileName = file.name;
      //File reader method
      this.readFile(file)
    }
  }

  validateMyRow(row:string[]):boolean{
    if(row.length < 4)return false;
    let acceptableMemberType = [
      'volunteer',
      'staff'
    ]
    const [EntityId,
    LastName,
    FirstName,
    PersonType,
    Email,
    Status] = row;
    if(!acceptableMemberType.includes(PersonType))
      return false;
    if(PersonType == 'staff'){
      if(Email == undefined) return false;      
    }
    let acceptableStatusType =[
      'active',
      'inactive'
    ];
    if(!acceptableStatusType.includes(Status))return false;
    return true
  }

  readFile(file:File,rowValidation?:(string:string[])=>boolean){
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv = reader.result;
      // console.log(csv);
      if (typeof csv === 'string') {
        let data = csv.split(/\r*\n/);
        data.slice(1)//remove headers
        data.forEach((i: string) => {      
          let cells: string[] = [];
          let row = i.split(',');
          if(rowValidation != undefined)  if(!rowValidation(row)){
             alert("invalid data "+JSON.stringify(row));
             return;
          }


          row.forEach((j) => {            
            cells.push(j);
          });
          this.allTextLines.push(cells);
        });
        // console.log(this.allTextLines);
        this.fb.uploadMembers(this.allTextLines)
      } else {
        alert('csv file read error');
      }
    };
  }
}
