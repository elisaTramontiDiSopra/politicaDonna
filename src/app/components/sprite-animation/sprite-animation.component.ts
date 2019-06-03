import { Component, Input, Output, EventEmitter } from "@angular/core";
import { url } from "inspector";
import { Observable } from "../../../../node_modules/rxjs";


@Component({
  selector: "sprite-animation",
  templateUrl: "./sprite-animation.component.html",
  styleUrls: ["./sprite-animation.component.sass"],
})
export class SpriteAnimation {
  @Input() image;
  @Input() singleImageHeight; //it's also the total image height cause the sprite is horizontal
  @Input() singleImageWidth; //just the single "frame" width
  @Input() totalImageWidth; //the whole image width
  @Input() scale; //scaledown to match the original image parallax effect. is passed as percentage
  @Input() frameDuration; //in milliseconds
  @Input() numberOfFrames;
  @Input() type; //fadeSprite
  @Output() completed = new EventEmitter<boolean>();

  sprite;
  position = 0;
  currentFrame = 0;
  lastFrame = false //needed to fade out the last frame

  constructor() { }

  //animation where the frames fade one into the other
  fadeSpriteAnimation() {

      /* document.getElementById("sprite").style.backgroundPosition = this.position + 'px 0px';
      setTimeout(() => {
        this.currentFrame++;
        this.fadeSpriteAnimation();
        this.position = this.position - this.singleImageWidth;
      }, this.frameDuration); */
    
    if (this.currentFrame <= this.numberOfFrames) {
      this.sprite.style.backgroundPosition = this.position + 'px 0px';
      setTimeout(() => {
        this.currentFrame++;
        this.fadeSpriteAnimation();
        this.position = this.position - this.singleImageWidth;
      }, this.frameDuration);
    } else {
      this.fadeOutAnimation();
    };
  }

  fadeOutAnimation() {
    let timingOfLastFrame = (this.frameDuration/1000)*5;
    this.lastFrame = true;
    this.sprite.style.webkitTransition = "opacity " + timingOfLastFrame + "s";
    this.sprite.style.transition = "opacity " + timingOfLastFrame + "s"; 
    //wait the time of the last frame, then reset everything
    setTimeout(() => {
      this.currentFrame++;
      this.position = this.position - this.singleImageWidth;
      this.lastFrame = false;
      this.completed.emit(true); //say the animation is over
    }, 5000);
  }

  ngOnInit() {
    this.completed.emit(false); //the animation is not done yet, so completed = false
    //set the basics features for the sprite div
    this.position = this.totalImageWidth;
    this.scale = 0.01 * this.scale;
    console.log(this.singleImageWidth);
    console.log(this.singleImageHeight);
    this.sprite = document.getElementById("sprite");
    this.sprite.style.width = (this.singleImageWidth * this.scale) + "px";
    this.sprite.style.height = (this.singleImageHeight * this.scale) + "px";
    this.sprite.style.backgroundImage = 'url(' + this.image + ')';
    this.sprite.style.transform = 'scale(' + this.scale + ')';
    switch (this.type) {
      case "fadeSprite":
        this.fadeSpriteAnimation();
    }
  }

}
