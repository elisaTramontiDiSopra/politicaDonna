import { FireServiceProvider } from './../../../services/firebase.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.sass'],
})
export class AdminEditComponent {
  
  mon = [];
  tue = [];
  wed = [];
  thu = [];
  fri = [];
  sat = [];
  sun = [];

  //used to create a ngfor loop for the weekly schedules
  week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  selectedTab = 'mon';


  allTasks = [
    {
      name: "step1", img: "/images/default_pin.jpg", steps: [
        { name: "step1", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
        {
          name: "step1", img: "/images/default_pin.jpg", steps: [
            { name: "step1", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
            { name: "step1", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
          ], done: false, skipped: false, selected: false, completed: false
        },
        { name: "step1", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
        { name: "step1", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
      ], done: false, skipped: false, selected: false, completed: false
    },
    { name: "step2", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step3", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step4", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },

    { name: "step2", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step3", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step4", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },

    { name: "step2", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step3", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step4", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },

    { name: "step2", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step3", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step4", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },

    { name: "step2", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step3", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step4", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },

    { name: "step2", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step3", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step4", img: "/images/default_pin.jpg", steps: [], done: false, skipped: false, selected: false, completed: false },
  ];

  constructor(private apiFirebase: FireServiceProvider) { }

  saveSchedule() {
    let weeklySchedule = {
      mon: this.mon,
      tue: this.tue,
      wed: this.wed,
      thu: this.thu,
      fri: this.fri,
      sat: this.sat,
      sun: this.sun
    };
    this.apiFirebase.saveSchedule(weeklySchedule).then(r => console.log("Schedule saving: OK")) //
  }

  ngOnInit() {
    this.apiFirebase.getSchedule().subscribe(res => {
      if (res.exists) {
        let wholeSchedule = res.data();
        console.log(wholeSchedule);
        this.mon = wholeSchedule.mon;
        this.tue = wholeSchedule.tue;
        this.wed = wholeSchedule.wed;
        this.thu = wholeSchedule.thu;
        this.fri = wholeSchedule.fri;
        this.sat = wholeSchedule.sat;
        this.sun = wholeSchedule.sun;
      } else {
        console.log("No such document!");
      }
    });
  }

}
