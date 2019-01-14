import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-contact-page',
  template: `
  <a routerLink="/contact/edit">
    <button>
      <i class="fas fa-plus"></i>
    </button>
  </a>
  <div class="wrapper flex-column align-center">
    <app-contact-filter (onFilter)="setFilter($event)"></app-contact-filter>
    <app-contact-list (listEvent)="changeContactOrder($event)" [contacts]="contacts"></app-contact-list>
  </div>
  `,
  styles: []
})
export class ContactPageComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private contactService: ContactService) { }
  contacts = []

  async ngOnInit() {
    if (!this.userService.isSignedUp()) {
      this.router.navigate(['signup'])
    }
    this.getContacts()
  }
  async getContacts() {
    console.log('getcontacts')
    this.contacts = await this.contactService.getContacts()
  }
  changeContactOrder({ contact, num }) {
    if(num === -1 && contact.order === 1 ||
      num === 1 && contact.order === this.contacts.length
      ) return
      const currOrder = contact.order
      const nextContact = this.contacts.find(contact => contact.order === currOrder + num)
      contact.order += num
      nextContact.order -= num

    this.contactService.updateContact(contact)
    this.contactService.updateContact(nextContact)
    this.getContacts()
  }
  async setFilter(filter) {
    this.contacts = await this.contactService.getContacts(filter)
  }

}
