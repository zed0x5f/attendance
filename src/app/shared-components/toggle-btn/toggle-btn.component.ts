import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss']
})
export class ToggleBtnComponent implements OnInit {
  states = [
    'none',
    'up',
    'down'
  ]
  index=0;
  currentState=this.states[this.index];
  constructor() { }

  ngOnInit(): void {
  }

  increment(){
    this.index = (this.index + 1) % this.states.length;
  }

}
