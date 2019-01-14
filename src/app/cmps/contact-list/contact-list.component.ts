import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  template: `
  <div class="contactList flex-column align-center">
    <app-contact-preview (childEvent)="reloadContacts($event)"
    *ngFor="let contact of contactsToShow; first as first; last as last"
    [contact]="contact"
    [first]="first" [last]="last"
    ></app-contact-preview>
  </div>
  `,
  styles: []
})
export class ContactListComponent implements OnInit {
  @Input() contacts = [];
  @Output() listEvent = new EventEmitter()
  get contactsToShow() {
    return this.contacts.sort((a, b) => {
      return (a.order > b.order) ? -1 : 1
    })
  }
  constructor() { }

  ngOnInit() {
    console.log(this.contacts)
  }
  reloadContacts({ contact, num }) {
    this.listEvent.emit({ contact, num })
  }
}
