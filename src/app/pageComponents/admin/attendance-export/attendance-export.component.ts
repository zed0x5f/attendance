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
      console.log(this.tendies);
    });
  }
}
