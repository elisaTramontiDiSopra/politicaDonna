import { Component, Input } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: "task-bar",
  templateUrl: "./task-bar.component.html",
  styleUrls: ["./task-bar.component.sass"],
})
export class TaskBarComponent {
  @Input() tasks;
  @Input() moveUpDown;
  @Input() addButton;         //to add the + button
  @Input() addList;
  @Input() deleteButton;      //to add the - button
  @Input() subTaskButton;
  @Input() isSubtask;         //to controll subtask css classes

  showSubtask = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    console.log(this.tasks)
  }

  move(task, i, direction) {
    let tempTask = task;
    let tempShowSubtask = this.showSubtask[i];
    this.tasks.splice(i, 1); //remove task
    this.showSubtask.splice(i, 1); //since move it's active only on the daily schedule, when I move up and down I also move the showSubtask value
    if(direction === "up") {
      this.tasks.splice(i-1, 0, tempTask);
      this.showSubtask.splice(i-1, 0, tempShowSubtask);
    } else {
      this.tasks.splice(i+1, 0, tempTask);
      this.showSubtask.splice(i+1, 0, tempShowSubtask);
    }
  }

  addTask(task, i) {
    console.log(this.addList);
    this.addList.push(task);
    this.tasks.splice(i, 1);
    console.log(task);
    //add eventual subtask false value
    /* if (task.steps.length > 0) {
      this.showSubtask.push(false);
      console.log(this.showSubtask);
    } */
    if (task.steps.length > 0) {
      task.subtasks = false;
    }
  }
  removeTask(task, i) {
    this.tasks.splice(i, 1);
    this.addList.push(task);
    if (task.steps.length > 0) {
      this.showSubtask.splice(i, 1);
      console.log(this.showSubtask);
    }
  }
  showSubtasks(task, i) {
    if(task.showSubtasks) {
      task.showSubtasks = !task.showSubtasks
    } else {task.showSubtasks = true}
    console.log(task); /*
    this.showSubtask[i] === !this.showSubtask[i]
    console.log(this.showSubtask); */
  }
  makeSubtask(task, i) {

  }
}

