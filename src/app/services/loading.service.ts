import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private subject = new Subject;
  private loadingStatus = false;

  loading() {
    return this.subject.asObservable();
  }

  start() {
    this.loadingStatus = true;
    this.informSubscribers();
  }

  stop() {
    this.loadingStatus = false;
    this.informSubscribers();
  }

  private informSubscribers() {
    this.subject.next(this.loadingStatus);
  }

}
