import { Component, Input, Output } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from "events";


@Component({
  selector: "year-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.sass"],
})
export class SliderComponent {
  @Input() min;
  @Input() max;
  @Output() currentYear = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log()
  }



}
