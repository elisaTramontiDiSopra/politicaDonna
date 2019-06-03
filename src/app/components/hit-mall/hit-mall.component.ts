import { Component, Input, ViewChild } from '@angular/core';
import { simpleFadeIn } from './../../utils/animations';
import * as _ from "underscore";
import { Observable } from '../../../../node_modules/rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  templateUrl: './hit-mall.component.html',
  styleUrls: ['./hit-mall.component.sass'],
  selector: 'hit-mall',
  animations: [simpleFadeIn]
})
export class HitMallComponent {
  @Input() imageFolderName;
  @Input() images;
  @ViewChild('endModal') public endModal: ModalDirective;

  //imageFolderName = "hit-mall";
  img00; img01; img02; img03; imgFoe; puffGif;

  foes = [
    { x: 38, y: 36, width: 8, layer: "layer00" },
    { x: 45, y: 16, width: 12, layer: "layer01" },
    { x: 73, y: 14, width: 15, layer: "layer01" },
    { x: 1, y: 13, width: 14, layer: "layer01" },
    { x: 26, y: 10, width: 18, layer: "layer03" }
  ];

  level = 4;
  timing = 2;

  layer01 = true; layer02 = true; //layer00 = bg, layer04 = ground

  //var for handling foes appearing one after another trough the game
  foesNumber;
  randomFoes = [];
  private foeCounter = 0;
  foeIndex = new BehaviorSubject(this.foeCounter);
  timeOutToReset;

  //points and game result
  points = 0;
  gameResult = null;

  //puff animation vars
  showPuffAnimation = true;
  puff = {x: 0, y: 0, scale: 100,
          frameDuration: 1000, frameNumber: 4,
          singleImageWidth: 610, singleImageHeight: 640, totalFrameWidth: 2440, 
        }

  constructor(private router: Router, ) { }

  setTimingAndfoesNumber(level) {
    this.timing = 8000 / level;
    this.foesNumber = 2 * level;
    //set invisible levels
    switch (level) {
      case 1:
        this.layer01 = false;
        this.layer02 = false;
      case 2:
        this.layer01 = true;
        this.layer02 = false;
      case 3:
        this.layer01 = true;
        this.layer02 = true;
    }
  }
  setAssetsBasedOnLevel(level) {
    this.setTimingAndfoesNumber(level);
    //randomly select an item from the foe array for foesNumber times
    //and make it not visible at first
    const randomFoeObservable = new Observable((observer) => {
      for (let i = 0; i < this.foesNumber; i++) {
        let randomElement = this.foes[Math.floor(Math.random() * this.foes.length)];
        randomElement["visible"] = false;
        randomElement["puffVisible"] = false;
        this.randomFoes.push(randomElement);
        //make sure is not like the last one selected
        /* if (this.randomFoes.length > 1 && randomElement.x !== this.randomFoes[this.randomFoes.length - 1].x) {
          randomElement["visible"] = false;
          randomElement["puffVisible"] = false;
          this.randomFoes.push(randomElement);
        } else {
          let randomElement = this.foes[Math.floor(Math.random() * this.foes.length)];
        } */
      }
      // observable execution
      observer.next(this.randomFoes)
      observer.complete()
    });
    randomFoeObservable.subscribe(() => {
      //when the random array is ready make the first element visible and start the sequence
      this.randomFoes[0].visible = true;
      this.nextFoe(false);
    });
  }

  nextFoe(clickedValue) {
    //count the points only if the function is fired from a clic on the foe
    if (clickedValue === true) { this.points++ };
    //reset the timeout timer
    clearTimeout(this.timeOutToReset);
    //hide previous monster and show the next if it's not the last element on the array, otherwise just stop
    if (this.foeCounter < this.foesNumber - 1) {
      this.randomFoes[this.foeCounter].visible = false;
      //this.randomFoes[this.foeCounter].vispuffVisible = true;
      
      this.foeCounter++;
      this.randomFoes[this.foeCounter].visible = true;
      this.foeIndex.next(this.foeCounter);
      this.timeOutToReset = setTimeout(() => { this.nextFoe(false) }, this.timing);
    } else if (this.foeCounter = this.foesNumber - 1) {
      //if we're on the last element, stop and visualize the final screen based on the points
      this.foeIndex.complete();
      if (this.points >= (this.foesNumber / 2) + 1) {
        this.gameResult = "won";
        this.endModal.show();
        setTimeout(() => {
          this.router.navigate(['/game'])
        }, 3000);
      } else {
        this.gameResult = "lost"
      }
    }
  }
  visulizePuff(foe) { 
    console.log("start puff");
    this.showPuffAnimation = true;
    let timeToFinishAnimation = this.puff.frameDuration * this.puff.frameNumber
    //this.nextFoe(true);
    console.log(foe.width);
    //set the puff gif dimensions and properties
    this.puff.x = foe.x;
    this.puff.y = foe.y;
    this.puff.scale = foe.width;

    setTimeout(() => {
      //this.showPuffAnimation = false;
      
      console.log("end puff");
      //foe.visible = false;
      //this.nextFoe(true);
    }, timeToFinishAnimation);
  }

  /* checkPuffSprite(event, foe) {
    console.log(foe);
    console.log(event);
    if (event === true) {
      //if the animation is done we don't need to see it anymore
      this.showPuffAnimation = false;
      foe.puffVisible = false;
    }
  } */

  ngOnInit() {
    //set the images bg
    this.img00 = "/images/" + this.imageFolderName + "/00_layer.png";
    this.img01 = "/images/" + this.imageFolderName + "/01_layer.png";
    this.img02 = "/images/" + this.imageFolderName + "/02_layer.png";
    this.img03 = "/images/" + this.imageFolderName + "/03_layer.png";
    this.imgFoe = "/images/" + this.imageFolderName + "/foe.png";
    this.puffGif = "/images/" + this.imageFolderName + "/puffAnimation.png";
    //set layers visibility
    this.setAssetsBasedOnLevel(this.level);
  }

}
