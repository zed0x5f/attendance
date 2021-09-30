import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-meal-attendance',
  templateUrl: './meal-attendance.component.html',
  styleUrls: ['./meal-attendance.component.scss']
})
export class MealAttendanceComponent implements OnInit {
  math = Math;
  //Go Ahead
  makeMyDay(p1:string,p2:string){
    return {
      date:p1,
      activityDay:p2
    };
  }

  constructor(private fb:FormBuilder) { }
  displayNewName = false;
  listOfNames:string[] = [
    "name 1",
    "name 2"
  ];

  listOfDays = [
    this.makeMyDay("7/10/2021","Rodeo Day"),
    this.makeMyDay("7/11/2021","Activity Day 1"),  
    this.makeMyDay("7/12/2021","Activity Day 2"),
    this.makeMyDay("7/13/2021","Activity Day 3"),
  ]

  form = this.fb.group({
    nameList:[''],
    fName:[""],
    lName:[""],
    bld:this.fb.array([])
  })
  
  ngOnInit(): void {
    //add controls for each day
    this.listOfDays.forEach(e=>{
      for(var i = 0; i < 3; i++)
        this.bld.push(this.fb.control(false));
    });
  }

  toggleDay(offset:any){
    this.listOfDays.forEach((e,i)=>{
      let checkBox = this.bld.at(i*3+offset);
      checkBox.setValue(!checkBox.value);
    });
  }

  get bld() {
    return this.form.get('bld') as FormArray;
  }

  onSubmit(){

  }
}
