import { Injectable } from '@angular/core';

@Injectable()
export class TimingService {
  public startTime;
  public endTime;
  public timing;

  startTimer() {
    this.timing = 0;
    this.startTime = new Date();
  }

  endTimer() {
    this.endTime = new Date();
    this.timing = new Date(this.endTime - this.startTime);
    return this.timing;
  }


}
