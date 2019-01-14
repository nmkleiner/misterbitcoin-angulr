import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BitcoinService } from '../../services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="home-page flex-column p-10 mt-20">
      <span class="capitalize white-text">hello {{user.username}}!</span>
      <span class="capitalize white-text">
        <i class="fab fa-bitcoin"></i>
            BTC/USD: {{rateToShow}}
            <i [ngClass]="arrowClasses" class="fas"></i>
         </span>
         <span class="capitalize white-text">coins in wallet: {{user.coins}}</span>
         <span class="capitalize white-text">worth: <i class="fas fa-dollar-sign"></i> {{worth}}</span>
     </div>
  `,
  styles: [`
  .home-page {
    align-items: center;
  }`]
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private bitcoinService: BitcoinService) { }
  goingUp = true
  rate = 0
  user = {
    username: '',
    coins: 0,
  }

  get rateToShow() {
    return (1/this.rate).toFixed(3)
  }
  get worth() {
    return Math.round(this.user.coins * 1/this.rate)
  }
  get arrowClasses() {
    return {
      'fa-arrow-circle-up green-text': this.goingUp,
      'fa-arrow-circle-down red-text': !this.goingUp
    }
  }


  async ngOnInit() {
    if (!this.userService.isSignedUp()) {
      this.router.navigate(['signup'])
    }
    else {
      this.user = await this.userService.getUser()
    }
    this.watchRate()
  }


  getRate = (value,oldValue) => {
    this.rate = value
    this.goingUp = (value < oldValue)
  }

  async watchRate() {
      await this.bitcoinService.watchBitcoinRate(this.getRate)
  }
}
