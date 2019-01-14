import { Injectable } from '@angular/core';
import storageService from './storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  key = 'bitcoinUser'
  signup(username) {
      const user = {
          username,
          coins: 100
      }
      storageService.saveToStorage(this.key,user)
  }

  isSignedUp() {
      return !!storageService.loadFromStorage(this.key)
  }

  getUser() {
      return Promise.resolve(storageService.loadFromStorage(this.key))
  }

}





