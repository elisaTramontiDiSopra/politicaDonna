import { Component } from '@angular/core';

@Component({
  templateUrl: './char.component.html',
  styleUrls: ['./char.component.sass']
})
export class CharComponent {
  char = {
    class: "wizard", level: 4, name: "Julian",
    dexterity: 5, strenght: 4, knowledge: 1,
    pet: false, petName: "Aris", petRace: "dragon",
  }
  constructor(
  ) {
  }
}
