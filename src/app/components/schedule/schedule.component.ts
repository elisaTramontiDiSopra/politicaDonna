import { Component, Input } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: "schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.sass"],
})
export class ScheduleComponent {
  @Input() day;
  @Input() tasks;
  @Input() addList;

  constructor(private translateService: TranslateService) {}

  ngOnInit() { }

}
