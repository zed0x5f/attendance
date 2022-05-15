import { Component, OnInit } from '@angular/core';
import { FireBaseListDict, Member } from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-import-reservations',
  templateUrl: './import-reservations.component.html',
  styleUrls: ['./import-reservations.component.scss'],
})
export class ImportReservationsComponent implements OnInit {
  headers: string[] = [
    'RegistrationId',
    'Date',
    'Breakfast',
    'Lunch',
    'Dinner',
  ];
  fileName = '';
  allTextLines: string[][] = [];
  members: FireBaseListDict<Member> = {};
  constructor(private fb: FirebaseService) {
    this.fb.myMembersObservable.subscribe(
      (members) => (this.members = members)
    );
  }

  ngOnInit(): void {}

  validateMyRow(row: string[]): boolean {
    if (row.length < 5) return false;
    let [RegistrationId, date, Breakfast, Lunch, Dinner] = row;
    if (!(RegistrationId in this.members)) {
      alert(`${RegistrationId} is not a valid member id`);
      return false;
    }
    try {
      let d = new Date(date);
    } catch (err) {
      alert(`${date} is not a valid date`);
      console.error(err);
      return false;
    }

    return true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      console.log(file);

      this.fileName = file.name;
      //File reader method
      this.readFile(file);
    }
  }

  //todo extract function from the importers
  readFile(file: File, rowValidation?: (string: string[]) => boolean) {
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv = reader.result;
      // console.log(csv);
      if (typeof csv === 'string') {
        let data = csv.split(/\r*\n/);
        data = data.slice(1); //remove headers
        // console.log(data);
        data.forEach((i: string) => {
          let cells: string[] = [];
          let row = i.split(',');
          // console.log(row);
          if (rowValidation != undefined)
            if (!rowValidation(row)) {
              alert('invalid data ' + JSON.stringify(row));
              return;
            } else {
              if (!this.validateMyRow(row)) {
                alert('invalid data ' + JSON.stringify(row));
                return;
              }
            }

          row.forEach((j) => {
            cells.push(j);
          });
          this.allTextLines.push(cells);
        });
        // console.log(this.allTextLines);
        this.fb.uploadReservations(this.allTextLines);
      } else {
        alert('csv file read error');
      }
    };
  }
}
