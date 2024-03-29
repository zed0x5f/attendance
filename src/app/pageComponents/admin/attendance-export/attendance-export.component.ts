import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, concatMap, forkJoin, of, zip } from 'rxjs';
import { Checkin, FireBaseListDict, Member } from 'src/app/models/types';
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
  members: FireBaseListDict<Member> = {};
  tempAttendance: Checkin = {};
  ngOnInit(): void {
    //dont ask me why use combinelatest over forkjoin idk what the take(1) realy does
    combineLatest([
      this.fb.myMembersObservable,
      this.fb.attendanceObservable,
    ]).subscribe((zipped) => {
      const [members, attendance] = zipped;
      console.log('fork value', zipped);
      this.tenderLoin(attendance, members);
    });
  }

  tenderLoin(attendance: Checkin, argMembers: FireBaseListDict<Member>) {
    // if(typeof attendance == er)
    this.tempAttendance = attendance;
    this.tendies = [
      [
        'Date',
        'memberId',
        'checkin key',
        'timestamp',
        'Date',
        'Hours',
        'Minutes',
        'Seconds',
        'Full Name',
        'FirstName',
        'LastName',
      ],
    ];
    //cant think of the nesting this way currently
    for (const [dayKey, members] of Object.entries(attendance)) {
      for (const [memberIdKey, rowItemOfMember] of Object.entries(members)) {
        for (const [checkinKey, ms] of Object.entries(rowItemOfMember)) {
          try {
            const { firstName, lastName } = argMembers[memberIdKey];
            let day = new Date(ms);
            this.tendies.push([
              dayKey,
              memberIdKey,
              checkinKey,
              ms,
              day.toDateString(),
              day.getHours(),
              day.getMinutes(),
              day.getSeconds(),
              `${firstName} ${lastName}`,
              firstName,
              lastName,
            ]);
          } catch (err) {
            console.log('memberId', memberIdKey, 'member', rowItemOfMember);
            console.log(err);
          }
        }
      }
    }
    //create the encoded uri
    console.log(this.tendies);
  }
}
