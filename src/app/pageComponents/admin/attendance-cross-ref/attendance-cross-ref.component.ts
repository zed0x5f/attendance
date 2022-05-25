import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import {
  FireBaseListDict,
  Member,
  Checkin,
  Reservations,
  MealCount,
  MealTimes,
  Tendies,
  Totals,
} from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Util } from 'src/app/service/util';

@Component({
  selector: 'app-attendance-cross-ref',
  templateUrl: './attendance-cross-ref.component.html',
  styleUrls: ['./attendance-cross-ref.component.scss'],
})
export class AttendanceCrossRefComponent implements OnInit {
  constructor(private fb: FirebaseService) {}

  members: FireBaseListDict<Member> = {};
  attendance: Checkin = {};
  reservations: Reservations = {};
  datesToShow: string[] = [];
  mealtimes: MealTimes[] = [];
  attendDanceToShow: Tendies[] = [];
  totals: Totals[] = [];

  ngOnInit(): void {
    combineLatest([
      this.fb.myMembersObservable,
      this.fb.attendanceObservable,
      this.fb.reservationsObservable,
    ]).subscribe((values) => {
      //Clear out arrays
      this.mealtimes = [];
      this.attendDanceToShow = [];
      this.totals = [];

      let [memb, attend, reservations] = values;
      this.members = memb;
      this.attendance = attend;
      this.reservations = reservations;
      this.datesToShow = Object.keys(attend);

      //TODO pull meal data here
      this.datesToShow.forEach((e) => {
        //TODO add this to util function
        let thisDay = Util.getDateYYYY_MM_DD(e);

        let bld = [
          [8, 30],
          [12, 30],
          [17, 30],
        ].map((timeS) => {
          const [h, m] = timeS;
          let ref = new Date(thisDay);
          ref.setHours(h, m);
          return ref;
        });

        let todaysMealTime = {
          b: bld[0],
          l: bld[1],
          d: bld[2],
        };
        this.mealtimes.push(todaysMealTime);
        
      }); //end of for loop
    });
  }

  determinWhichMealCheckedInto(
    MealTime: Date,
    checkin: Date,
    deltaTime?: Date
  ): Boolean {
    if (deltaTime == undefined) {
      deltaTime = new Date();
      deltaTime.setHours(1);
      deltaTime.setMinutes(30);
    }
    let tm = new Date(checkin);
    tm.setHours(MealTime.getHours(), MealTime.getMinutes());
    return Math.abs(tm.getTime() - checkin.getTime()) <= 2 * 60 * 60 * 1000;
  }

  getMC(foo: MealCount, index: string) {
    return foo[index as keyof MealCount];
  }
}
