import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-console-checkin',
  templateUrl: './console-checkin.component.html',
  styleUrls: ['./console-checkin.component.scss'],
})
export class ConsoleCheckinComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  value = '';
  update(value: string) {
    this.value = value;
  }
}
