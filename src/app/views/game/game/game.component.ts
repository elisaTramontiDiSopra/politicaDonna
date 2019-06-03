import { Component } from '@angular/core';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
  public startGame = false;

  goblinFoes = [
    { x: 38, y: 36, width: 8, layer: "layer00" },
    { x: 45, y: 16, width: 12, layer: "layer01" },
    { x: 73, y: 14, width: 15, layer: "layer01" },
    { x: 1, y: 13, width: 14, layer: "layer01" },
    { x: 26, y: 10, width: 18, layer: "layer03" }
  ];

  imageFolderName  = "hit-mall";
  images = this.goblinFoes;

  constructor() {}

  checkCountdown(event) {
    if (event === true) {
      this.startGame = true;
    }
  }

  ngOnInit() {}
}
