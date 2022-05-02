import { Component, OnInit } from '@angular/core';
import { checkin } from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Util } from 'src/app/service/util';
@Component({
  selector: 'app-attendance-export',
  templateUrl: './attendance-export.component.html',
  styleUrls: ['./attendance-export.component.scss'],
})
export class AttendanceExportComponent implements OnInit {
  constructor(private fb: FirebaseService) {}

  tendies: any[] = [];
  encodedUri: string = '';
  download: string = '';

  ngOnInit(): void {
    this.fb.attendanceObservable.subscribe((attendance: checkin) => {
      // if(typeof attendance == er)
      this.tendies = [['Date', 'memberId', 'checkin key', 'timestamp']];
      //cant think of the nesting this way currently
      for (const [dayKey, members] of Object.entries(attendance)) {
        for (const [memberIdKey, rowItemOfMember] of Object.entries(members)) {
          for (const [checkinKey, ms] of Object.entries(rowItemOfMember)) {
            this.tendies.push([dayKey, memberIdKey, checkinKey, ms]);
          }
        }
      }
      //create the encoded uri
      this.encodedUri = Util.convertArrayToEncodedUri(this.tendies);
      console.log(this.tendies);
      this.download = `${Util.getYYYY_MM_DD(new Date())}.csv`;
    });
  }

  exportClick() {
    this.downloadFile(this.tendies);
  }

  downloadFile(data: string[][], fileName?: string) {
    if (fileName == null) {
      fileName = `${Util.getYYYY_MM_DD(new Date())}.csv`;
    } else if (!fileName.endsWith('.csv')) {
      //doesnt end with csv
      fileName += '.csv';
    }

    const replacer = (key: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
