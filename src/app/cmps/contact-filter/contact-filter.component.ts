import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-filter',
  template: `
    <div class="contactFilter mb-10">
      <input type="text"
      [(ngModel)]="filter"
      (input)="setFilter()"
      placeholder="search"
      />
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
