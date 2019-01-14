import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../services/contact.service';
@Component({
  selector: 'app-contact-preview',
  template: `
    <div class="contactPreview flex align-center space-between">
      <img class="circle" [src]="contact.pic" />
      <div>{{contact.name}}</div>
      <div class="flex-column">
        <button *ngIf="!first" (click)="changeOrder($event,1)">
          <i class="fas fa-arrow-up"></i>
        </button>
        <button *ngIf="!last" (click)="changeOrder($event,-1)">
          <i class="fas fa-arrow-down"></i>
        </button>
        <a routerLink="contact"
          [queryParams]="{ id: contact._id}"
          >
          details
        </a>
      </div>
    </div>
  `,
  styles: [`
  .contactPreview{
    background: white;
    color: black;
    padding: 10px;
    font-weight: 600;
    border: 2px solid black;
    width: 250px;
    margin-bottom: 10px;
  }
  .contactPreview a {
    color: gray;
    cursor: pointer;
  }
  .contactPreview button {
    background: black;
    color: white;
    border-radius: 20px;
    cursor: pointer;
  }

  `]
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact = {_id: '', name: '', pic: '', order: null};
  @Input() first = Boolean
  @Input() last = Boolean
  @Output() childEvent = new EventEmitter()
  constructor(private contactService : ContactService) { }

  ngOnInit() {
  }
  changeOrder(ev,num) {
    ev.stopPropagation();
    this.childEvent.emit({contact: this.contact, num})
  }
}
