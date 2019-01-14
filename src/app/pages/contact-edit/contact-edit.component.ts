import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-edit',
  template: `
    <div class="contact-edit" *ngIf="contact._id">
      <form (submit)="submit()" class="flex-column">
        <label>Name: <input type="text" [(ngModel)]="contact.name" name="name" #name="ngModel" /></label>
        <label>Email: <input type="text" [(ngModel)]="contact.email" name="email" #name="ngModel"/></label>
        <label>Phone: <input type="text" [(ngModel)]="contact.phone" name="phone" #name="ngModel"/></label>
        <button type="submit">save</button>
      </form>
    </div>
  `,


// <input type="number"
//             min="0"
//             [(ngModel)]="coinsToTransfer"
//             name="coinsToTransfer"
//             #name="ngModel"
//             />
  styles: [`
    .contact-edit {
      padding: 10px;
      background: white;
      color: black;
      border: 2px solid black;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40%;
      margin: 20px auto;
    }
    .contact-edit input {
      margin: 0 0 10px 0;
    }
  `]
})
export class ContactEditComponent implements OnInit {
  constructor(private route: ActivatedRoute,
     private contactService: ContactService,
     private router: Router) { }

  contact = { _id:'', name: '', email: '', phone: '', pic: '' }
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.getContact(params.id)
      });

  }

  async getContact(contactId) {
    this.contact = await this.contactService.getContactById(contactId)
  }
  submit() {
    this.contactService.updateContact(this.contact)
    const route = '/contact/;contact?id=' + this.contact._id
    this.router.navigateByUrl(`/contact/contact?id=${this.contact._id}`)
  }
}
