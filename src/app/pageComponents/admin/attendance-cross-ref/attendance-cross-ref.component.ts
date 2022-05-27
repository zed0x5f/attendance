import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import {
  FireBaseListDict,
  Member,
  Checkin,
  Reservations,
  MealCount,
  MealTimes,
  A_Tendies,
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
  attendDanceToShow: A_Tendies[] = [];
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

      let [membs, attend, reservations] = values;
      this.members = membs;
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
      for (const [id, member] of Object.entries(membs)) {
        let cols: any[] = [];
        this.datesToShow.forEach((d, todaysIndex) => {
          let counter: MealCount = {
            b: 0,
            l: 0,
            d: 0,
            none: 0,
          };
          // const dateKey = Util.getYYYY_MM_DD(new Date(d))
          //we loop over each column and fill it with data we need
          let at = attend[d as keyof Checkin][id];
          if (at) {
            //get attends and format
            for (const [k, v] of Object.entries(at)) {
              for (const [mealCodeKey, mealTime] of Object.entries(
                this.mealtimes[todaysIndex]
              )) {
                if (Util.determinWhichMealCheckedInto(mealTime, new Date(v))) {
                  counter[mealCodeKey as keyof MealCount] += 1;
                }
              }
            }
          }
          let resCount: MealCount;
          let reservationDay = reservations[d as keyof Reservations];
          if (reservationDay && id in reservationDay) {
            resCount = { ...reservationDay[id], none: 0 };
          } else {
            if (member.personType == 'volunteer') {
              resCount = {
                b: 1,
                l: 1,
                d: 1,
                none: 0,
              };
            } else
              resCount = {
                b: NaN,
                l: NaN,
                d: NaN,
                none: 0,
              };
          }
          let classes: any[] = [];
          const compare = (a: any, b: any) => parseInt(a) - parseInt(b);

          cols.push({
            count: counter,
            reservations: resCount,
            classes: {
              b: compare(counter.b, resCount.b),
              l: compare(counter.l, resCount.l),
              d: compare(counter.d, resCount.d),
            },
          });
        });

        member.fullName =
          member.firstName.trim() + ' ' + member.lastName.trim();
        this.attendDanceToShow.push({
          self: member,
          tendies: cols,
        });
      }
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

  isNan(input:number):boolean{
    return isNaN(input);
  }
}
