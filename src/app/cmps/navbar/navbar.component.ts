import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <header class="flex space-between">
    <a routerLink=""><h3 class="capitalize pointer">mister bitcoin</h3></a>
    <nav class="flex">
      <a class="justify-self-end" routerLink="/contact"><i class="fas fa-list-ul"></i></a>
      <a routerLink="/statistic"><i class="fas fa-chart-line"></i></a>
    </nav>
  </header>
  `,
  styles: [
    `header {
    background: teal;
  }`,`
  nav {
    display: flex;
  }`,`
  header a {
    padding:10px;
    font-size: 26px;
  }
  `
]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
