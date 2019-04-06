import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weight-loss-modal',
  templateUrl: './weight-loss-modal.component.html',
  styleUrls: ['./weight-loss-modal.component.css']
})
export class WeightLossModalComponent {

  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}  

@Component({
  selector: 'modal-content',
  templateUrl: '../modal-content/modal-content.component.html'
})

export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}
  
  open() {
    const modalRef = this.modalService.open(WeightLossModalComponent);
    modalRef.componentInstance.name = 'World';
  }
}
