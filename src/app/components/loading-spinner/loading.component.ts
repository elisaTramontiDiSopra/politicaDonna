import { Component } from '@angular/core';
import { LoadingService } from 'app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})

export class LoadingComponent {
  spinnerVisible = false;
  private loadingSubscription: Subscription;
  spinnerAdd: boolean;
  spinnerRemove: boolean;
  showSpinner: boolean;
  private animationRunning: boolean;

  constructor(loadingService: LoadingService) {
    this.loadingSubscription = loadingService.loading().subscribe((status) => {
      this.setSpinnerStatus(status);
    })
  }

  private safelyRemoveSpinner() {
    if (this.animationRunning) {
      setTimeout(() => { this.safelyRemoveSpinner() }, 400);
    } else {
      this.spinnerRemove = true;
      setTimeout(() => {
        this.spinnerVisible = false;
      }, 200);
    }
  }

  private setSpinnerStatus(newStatus) {
    if (newStatus) {
      this.spinnerVisible = true;
      this.spinnerAdd = true;
      this.spinnerRemove = false;
      this.animationRunning = true;
      setTimeout(() => {
        this.animationRunning = false;
      }, 1000);
    } else {
      this.safelyRemoveSpinner();
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
