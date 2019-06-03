import { Component, ViewChild } from "@angular/core";
import { FireServiceProvider } from "../../services/firebase.service";

@Component({
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.sass"]
})
export class CalendarComponent {
  today = "mon";
  weekData;
  data = [
    {
      name: "School",
      img: "image",
      done: false,
      skipped: false,
      completed: false,
      steps: [
        {
          name: "Bus stop",
          img: "image",
          done: false,
          skipped: false,
          completed: false,
          steps: []
        },
        {
          name: "Bus",
          img: "image",
          done: false,
          skipped: false,
          completed: false,
          steps: [
            {
              name: "Go to the stop",
              img: "image",
              done: false,
              skipped: false,
              steps: []
            },
            {
              name: "Wait 4 bus",
              img: "image",
              done: false,
              skipped: false,
              steps: []
            }
          ]
        },
        {
          name: "Sit on bus",
          img: "image",
          done: false,
          skipped: false,
          steps: []
        }
      ]
    },
    {
      name: "step 2",
      img: "image",
      steps: [],
      done: false,
      skipped: false,
      selected: false,
      completed: false
    },
    {
      name: "step 3",
      img: "image",
      steps: [],
      done: false,
      skipped: false,
      selected: false,
      completed: false
    }
  ];

  constructor(private apiFirebase: FireServiceProvider) {

  }
  ngOnInit() {
    //get today value and visualize the calendar accordingly
    let todayDate = new Date();
    /* this.apiFirebase.getSchedule().subscribe(doc => {
      if (doc.exists) {
        this.data = doc.data();
        console.log(this.data)
        //console.log("Document data:", doc.data());
      } else {
        console.log("C'è qualcosa che non va con l'uid nel recupero della schedule");
      }
    }); */

    switch (todayDate.getDay()) {
      case 0:
        this.today = 'sun';
        break;
      case 1:
        this.today = 'mon';
        break
      case 2:
        this.today = 'tue';
        break
      case 3:
        this.today = 'wed';
        break
      case 4:
        this.today = 'thu';
        break
      case 5:
        this.today = 'fri';
        break
      case 6:
        this.today = 'sat';
        break;
    };
    this.apiFirebase.getSchedule().subscribe(res => {
      if (res.exists) {
        this.weekData = res.data();
        //this.data = this.weekData[this.today];
      } else {
        console.log("No such document!");
      }
    });
  }

  selectDay(day) {
    this.today = day;
    this.data = this.weekData[this.today];
  }
}
