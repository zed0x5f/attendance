import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
type ToggleState = {
  direction: string;
  class: string;
};

const stater = (name: string, ngclass: string) => {
  return {
    direction: name,
    class: ngclass,
  };
};
@Component({
  selector: 'toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss'],
})
export class ToggleBtnComponent implements OnInit {
  states = [
    stater('none', 'bi bi-arrow-down-up'),
    stater('desc', 'bi bi-sort-alpha-down'),
    stater('asc', 'bi bi-sort-alpha-up'),
  ];
  @Output() sortDirection = new EventEmitter<string>();
  index = 0;
  constructor() {}

  ngOnInit(): void {}

  increment() {
    this.index = (this.index + 1) % this.states.length;
    this.sortDirection.emit(this.states[this.index].direction);
  }
}
