import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  title = 'misterbitcoin';

  constructor(private userService : UserService,
    private router: Router) {}
  ngOnInit(): void {
    if (!this.userService.isSignedUp()) {
      this.router.navigate(['signup'])
    }
  }
}


