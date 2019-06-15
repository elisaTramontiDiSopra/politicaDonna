import { Component, Input, OnInit } from '@angular/core';
import { elementStylingApply } from '@angular/core/src/render3';

@Component({
  templateUrl: './town-grid.component.html',
  styleUrls: ['./town-grid.component.sass'],
  selector: 'town-grid',
})
export class TownGridComponent implements OnInit {
  @Input() elected;

  public numberOfColumns = 18;
  //public numberOfElementsForColumn = 12;
  public numberOfElementsForColumn = 6;
  public arrayGrid = [];

  ngOnInit() {
    //console.log(this.elected)
    let copyElected = this.elected;
    let objectLength = Object.keys(this.elected).length;
    let startingPoint = 0;

    let objectTurnedArray = [];
    Object.keys(copyElected).map(function (key) {
      objectTurnedArray.push(copyElected[key]);
    })
    //console.log(objectTurnedArray);

    for (let i = startingPoint; i < objectLength; i += this.numberOfElementsForColumn) {
      let sliced= [];
      sliced = objectTurnedArray.slice(startingPoint, startingPoint + this.numberOfElementsForColumn);
      this.arrayGrid.push(sliced);
      startingPoint +=this.numberOfElementsForColumn;
      console.log(this.arrayGrid);
    }

  }
}
