import { Component, OnInit } from '@angular/core';
import { deleteApp } from 'firebase/app';
import { combineLatest } from 'rxjs';
import {
  Checkin,
  FireBaseListDict,
  MealCount,
  MealTimes,
  Member,
  Reservations,
  A_Tendies,
  Totals,
} from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Util } from 'src/app/service/util';

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

      let [memb, attend, reservations] = values;
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
        let empty = {
          b: 0,
          l: 0,
          d: 0,
          none: 0,
        };

        this.totals.push({
          nrg: Util.clone(empty),
          staff: Util.clone(empty),
          volunteer: Util.clone(empty),
          kid: Util.clone(empty),
        });
      }); //end of for loop

      this.members = memb;
      this.attendance = attend;
      // this.reservations = reservations;
      for (const [key, mMember] of Object.entries(memb)) {
        let personRow: A_Tendies = {
          name: mMember.firstName + ' ' + mMember.lastName,
          tendies: [],
        };

        this.datesToShow.forEach((d: any, todaysIndex: number) => {
          //each day

          let checkin = attend[d][key];
          if (checkin) {
            let counter: MealCount = {
              b: 0,
              l: 0,
              d: 0,
              none: 0,
            };
            let checks = [];
            for (const [key, value] of Object.entries(checkin)) {
              let mDate = new Date();
              mDate.setTime(value);
              // const { b, l, d } = this.mealtimes[todaysIndex];

              for (const [mealCodeKey, mealTime] of Object.entries(
                this.mealtimes[todaysIndex]
              )) {
                if (
                  Util.determinWhichMealCheckedInto(mealTime, new Date(value))
                ) {
                  counter[mealCodeKey as keyof MealCount] += 1;
                }
              }
              checks.push(
                `${mDate.getHours()}:${mDate.getMinutes()}:${mDate.getSeconds()}`
              );
            }
            personRow.tendies.push(
              JSON.stringify(counter) + JSON.stringify(checks)
            );
            let totRef =
              this.totals[todaysIndex][
                mMember.personType.toLocaleLowerCase() as keyof Totals
              ];
            totRef.b += counter.b;
            totRef.l += counter.l;
            totRef.d += counter.d;
          } else {
            //else checkin
            personRow.tendies.push(['no show']);
          }
        });
        this.attendDanceToShow.push(personRow);
      }
    });
  }

  getMC(foo: MealCount, index: string) {
    return foo[index as keyof MealCount];
  }
}
