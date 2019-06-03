import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './screens-overlay.component.html',
  styleUrls: ['./screens-overlay.component.sass'],
  selector: 'screens-overlay'
})
export class OverlayScreensComponent {
  @Input() screen;
  @ViewChild('winModal') public winModal: ModalDirective;
  @ViewChild('loseModal') public loseModal: ModalDirective;
  @ViewChild('endModal') public endModal: ModalDirective;

  constructor() {}

  ngOnInit() {
    if (this.screen === "won") {this.endModal.show()}
  }
}
