import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-filter',
  template: `
    <div class="contactFilter">
      <input type="text" [(ngModel)]="filter" (input)="setFilter()"/>
    </div>
  `,
  styles: []
})
export class ContactFilterComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }

  filter = ''
  @Output() onFilter = new EventEmitter();
  setFilter() {
    this.onFilter.emit(this.filter);
  }
}
