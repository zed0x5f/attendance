import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import {
  Checkin,
  FireBaseListDict,
  Member,
  Reservations,
} from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Util } from 'src/app/service/util';

type Tendies = {
  name: String;
  tendies: any[];
};

type MealTime = {
  b: Date;
  l: Date;
  d: Date;
};

type Tots = {
  staff: number;
  volunteer: number;
  nrg: number;
};
@Component({
  selector: 'app-attendance-review',
  templateUrl: './attendance-review.component.html',
  styleUrls: ['./attendance-review.component.scss'],
})
export class AttendanceReviewComponent implements OnInit {
  constructor(private fb: FirebaseService) {}

  members: FireBaseListDict<Member> = {};
  attendance: Checkin = {};
  reservations: Reservations = {};
  datesToShow: string[] = [];
  mealtimes: MealTime[] = [];
  attendDanceToShow: Tendies[] = [];
  totals: Tots[] = [];

  ngOnInit(): void {
    combineLatest([
      this.fb.myMembersObservable,
      this.fb.attendanceObservable,
      this.fb.reservationsObservable,
    ]).subscribe((values) => {
      let [memb, attend, reservations] = values;
      this.datesToShow = Object.keys(attend);
      //TODO pull meal data here
      this.datesToShow.forEach((e) => {
        //TODO add this to util function
        let thisDay = Util.getDateYYYY_MM_DD(e);

        let bld = [
          [8, 30],
          [12, 30],
          [5, 30],
        ].map((timeS) => {
          const [h, m] = timeS;
          thisDay.setHours(h, m);
          return thisDay;
        });

        this.mealtimes.push({
          b: bld[0],
          l: bld[1],
          d: bld[2],
        });
      });

      this.members = memb;
      this.attendance = attend;
      this.reservations = reservations;
      for (const [key, mMember] of Object.entries(memb)) {
        let masTemp: Tendies = {
          name: mMember.firstName + ' ' + mMember.lastName,
          tendies: [],
        };

        this.datesToShow.forEach((d: any) => {
          //each day
          

          let checkin = attend[d][key];
          if (checkin) {
            let checks = [];
            for (const [key, value] of Object.entries(checkin)) {
              let mDate = new Date();
              mDate.setTime(value);
              checks.push(
                `day${mDate.getDate()}:${mDate.getHours()}:${mDate.getMinutes()}:${mDate.getSeconds()}`
              );
            }
            masTemp.tendies.push(JSON.stringify(checks));
          } else {
            masTemp.tendies.push(['no show']);
          }
        });
        this.attendDanceToShow.push(masTemp);
      }
    });
  }
}
