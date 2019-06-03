import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.sass'],
  selector: 'countdown'
})
export class CountdownComponent {
  @Input() seconds;
  @Output() completed = new EventEmitter<boolean>();


  constructor(private spinner: NgxSpinnerService) { }

  startCountdown(seconds) {
    if (seconds > 0) {
      this.seconds = seconds;
      /** spinner starts on init */
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 1 seconds and starts again with the next number */
        this.spinner.hide();
        this.seconds--;
        this.startCountdown(this.seconds)
      }, 1000);
      this.completed.emit(false);
    } else {
      this.completed.emit(true);
    }
  }

  ngOnInit(){
    this.startCountdown(this.seconds)
  }
}