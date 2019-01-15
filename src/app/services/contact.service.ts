import { Injectable } from '@angular/core';
import storageService from './storage.service';
import utilService from './util.service';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  key = 'contacts'
  getContactById(id) {
    const contacts = storageService.loadFromStorage(this.key)
    const contact = contacts.find(contact => contact._id === id)
    return Promise.resolve(contact)
  }

  getContacts(filter = null) {
    let contacts = storageService.loadFromStorage(this.key)
    if (contacts) this.contactsDB = contacts
    else {
        contacts = this.contactsDB
        storageService.saveToStorage(this.key,contacts)
    }
    if (filter === null) {
      return Promise.resolve(contacts)
    }
    return Promise.resolve(contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())))
  }


  saveContact(contact) {
    const picNum = Math.round(Math.random() * 90)
    const pic = 'https://randomuser.me/api/portraits/thumb/men/' + picNum + '.jpg'
    contact = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        pic,
        _id: contact._id,
        transfers: [],
        order: contact.order
    }
    console.log('contact saving:',contact)
    if (!contact._id) {
        contact._id = utilService.makeId(6)
        this.contactsDB.push(contact)
    } else {
        const idx = this.contactsDB.findIndex(cont => cont._id === contact._id)
        this.contactsDB.splice(idx,1,contact)
    }
    storageService.saveToStorage(this.key,this.contactsDB)
    return Promise.resolve()
  }

  updateContact(updatedContact) {
    if (!updatedContact._id) updatedContact._id = utilService.makeId(6)
    const idx = this.contactsDB.findIndex((contact) => contact._id === updatedContact._id)
    this.contactsDB.splice(idx,1,updatedContact)
    storageService.saveToStorage(this.key,this.contactsDB)
    return Promise.resolve()
  }

  contactsDB = [{
    _id: '123123',
    name: 'Yossi Buzaglo',
    pic: 'https://randomuser.me/api/portraits/thumb/men/22.jpg',
    email: 'yoss@gmail.com',
    phone: '054-2345678',
    transfers: [],
    order: 1
  },
  {
    _id: '32321321',
    name: 'Valeria Rodriguez',
    pic: 'https://randomuser.me/api/portraits/thumb/women/22.jpg',
    email: 'valerodriguez@gmail.com',
    phone: '054-23487658',
    transfers: [],
    order: 2
  },
  {
    _id: '457457',
    name: 'Avner Eshta\'ol',
    pic: 'https://randomuser.me/api/portraits/thumb/men/23.jpg',
    email: 'avneresh@gmail.com',
    phone: '054-2365478',
    transfers: [],
    order: 3
  },
  {
    _id: '85786',
    name: 'Bugo Laritzki',
    pic: 'https://randomuser.me/api/portraits/thumb/men/25.jpg',
    email: 'bugolar@gmail.com',
    phone: '054-4325678',
    transfers: [],
    order: 4
  }
]
}







