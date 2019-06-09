import { Component, Input } from '@angular/core';


@Component({
  templateUrl: './candidates-chart.component.html',
  styleUrls: ['./candidates-chart.component.sass'],
  selector: 'candidates-chart'
})
export class CandidatesChartComponent {
  @Input() female;
  @Input() total;

}
