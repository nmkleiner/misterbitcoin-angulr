import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import * as moment from 'moment';

// import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-contact-details',
  template: `
    <div class="contact-details">
      <a routerLink="/contact/edit" [queryParams]="{id : contact._id}">
        <button><i class="far fa-edit"></i></button>
      </a>
      <div class="wrapper">
        <img class="circle" [src]="contact.pic" />
        <span class="bold">{{contact.name}}</span>
        <span class="bold">{{contact.email}}</span>
        <span class="bold">{{contact.phone}}</span>
        <form (submit)="transferToContact($event)">
          <label>
            Pay {{contact.name}}<br/>
            <input type="number"
            min="0"
            [(ngModel)]="coinsToTransfer"
            name="coinsToTransfer"
            #name="ngModel"
            />
          </label>
          <button type="submit">Transfer</button>
        </form>
        <div *ngIf="contact.transfers.length" >
          <h3>Transfers</h3>
          <div *ngFor="let transfer of contact.transfers" >
            <span>Transferred {{transfer.amount}} coins</span><br/>
            <span>at: {{moment(transfer.timeStamp).format('DD/MM HH:mm')}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-details {
      padding: 10px;
      background: white;
      color: black;
      border: 2px solid black;
      display: flex;
      flex-direction: column;
      width: 40%;
      margin: 20px auto;

    }
    .contact-details>a{
      align-self: flex-end;
    }
    .contact-details .wrapper{
      align-self: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `]
})
export class ContactDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
     private contactService: ContactService,
      private userService: UserService) { }

  contact = { _id:'', name: '', email: '', phone: '', pic: '', transfers: [] }
  user = {username: ''}
  coinsToTransfer = 0
  moment = moment
  ngOnInit() {
    this.getUser()
    this.route.queryParams
      .subscribe(params => {
        this.getContact(params.id)
      });
  }
  transferToContact(ev) {
    ev.preventDefault();
    const transfer = {amount: this.coinsToTransfer, from: this.user.username, timeStamp: moment()}
    this.contact.transfers.push(transfer)
    this.contactService.updateContact(this.contact)
  }
  async getContact(contactId) {
    this.contact = await this.contactService.getContactById(contactId)
  }
  async getUser() {
    this.user = await this.userService.getUser()
  }

}



