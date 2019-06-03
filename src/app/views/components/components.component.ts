import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.sass']
})
export class ComponentsComponent {
  @ViewChild('myModal') public myModal: ModalDirective;
  date: Date = new Date();

  constructor(
    private toaster: ToastrService
  ) {
  }

  openModal() {
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }

  showToaster() {
    this.toaster.error('Errore');
  }
}
