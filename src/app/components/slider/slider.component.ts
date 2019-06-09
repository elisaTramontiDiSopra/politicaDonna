import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "year-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.sass"],
})

export class SliderComponent {
  @Input() min;
  @Input() max;
  @Input() currentYear;
  @Output() selectedYear = new EventEmitter();

}
