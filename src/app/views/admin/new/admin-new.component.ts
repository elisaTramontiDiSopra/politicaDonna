import { Component } from '@angular/core';
import { FireServiceProvider } from '../../../services/firebase.service';

@Component({
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.sass'],

})
export class AdminNewComponent {
  selectedTab = 'mon';
  mondayTasks = [
    { name: "step1", img: "image", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step2", img: "image", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step3", img: "image", steps: [], done: false, skipped: false, selected: false, completed: false },
    { name: "step4", img: "image", steps: [], done: false, skipped: false, selected: false, completed: false },
  ];


  steps = [];
  task = { name: "", img: "/images/default_pin.jpg", steps: this.steps, done: false, skipped: false, selected: false, completed: false };
  allTasks = {};
  allTaskLength;
  imagePreview;

  constructor(private apiFirebase: FireServiceProvider) { }
  move(task, i, direction) {
    let tempTask = task;
    this.mondayTasks.splice(i, 1); //remove task
    if (direction === "up") {
      this.mondayTasks.splice(i - 1, 0, tempTask);
    } else {
      this.mondayTasks.splice(i + 1, 0, tempTask);
    }
  }

  uploadImage(event) {
    console.log(event);
    this.apiFirebase.uploadPicture(event).then(s => {
      console.log(s)
    });
    //this.apiFirebase.uploadPicture(event).snapshotChanges().subscribe(s => console.log(s));
    //to show the image preview
    /* if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      console.log(file)
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
      this.task.img = this.imagePreview;
      console.log(this.task)
    }; */
    //this.task.img = 
  }

  saveTask() {
    console.log(this.allTaskLength);
    //if the first object of the array is compleated it means the array has just one object
    this.allTaskLength = parseInt(this.allTaskLength) + 1;

    this.allTasks[this.allTaskLength] = this.task;
    console.log(this.allTasks);
    let isItThisTheFirst;
    if (this.allTaskLength === 1) {
      isItThisTheFirst = true
    } else {
      isItThisTheFirst = false
    }
    console.log(isItThisTheFirst);
    this.apiFirebase.saveTask(this.allTasks, isItThisTheFirst).then(r => {
      console.log("Task saving: OK");
      this.task = { name: "", img: "", steps: this.steps, done: false, skipped: false, selected: false, completed: false };;
      this.loadTasks();
    })
  }

  loadTasks() {
    this.apiFirebase.getTasks().subscribe(res => {
      if (res.exists) {
        this.allTasks = res.data();
        this.allTaskLength = Object.keys(this.allTasks).length;
        console.log(this.allTaskLength);
        //console.log(res.data());
      } else {
        this.allTaskLength = 0;
        console.log("No such document!");
      }
    });
  }

  ngOnInit() {
    this.loadTasks();
    //console.log(this.allTasks)
  }


}
