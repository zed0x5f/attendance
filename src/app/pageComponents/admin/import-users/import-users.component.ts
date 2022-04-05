import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-import-users',
  templateUrl: './import-users.component.html',
  styleUrls: ['./import-users.component.scss'],
})
export class ImportUsersComponent implements OnInit {
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
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv = reader.result;
        // console.log(csv);
        if (typeof csv === 'string') {
          var data = csv.split(/\r*\n/);
          data.forEach((i: string) => {
            var cells: string[] = [];
            var eyes = i.split(',');
            eyes.slice(1);//remove headers
            eyes.forEach((j) => {
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
}
