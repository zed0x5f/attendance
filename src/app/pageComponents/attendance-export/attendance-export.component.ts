import { Component, OnInit } from '@angular/core';
import { CsvExporterService } from 'src/app/service/csv-exporter.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-attendance-export',
  templateUrl: './attendance-export.component.html',
  styleUrls: ['./attendance-export.component.scss'],
})
export class AttendanceExportComponent implements OnInit {
  constructor(private cs: CsvExporterService, private fb: FirebaseService) {}

  tendies:any[] = [];
  ngOnInit(): void {
    this.fb.attendanceObservable.subscribe((attendance) => {
      // if(typeof attendance == er)
      this.tendies = [];

      for (const dayKey in attendance) {
        for (const memberKey in attendance[dayKey]) {
          for (const checkinKey in attendance[dayKey][memberKey]) {
            this.tendies.push([
              dayKey,
              memberKey,
              checkinKey,
              attendance[dayKey!][memberKey!][checkinKey!],
            ]);
          }
        }
      }
      //cant think of the nesting this way currently
      for (const [dayKey, member] of Object.entries(attendance)) {
        for (const [Key, DateValue] of Object.entries(member)) {
          for (const [key, DateValue] of Object.entries(attendance)) {
          }
        }
      }
    });
  }
}
