import { Component, OnInit } from '@angular/core';
import { debitsAndCredits } from '../Account/debitsAndCredits';

  @Component({
  selector: 'table-scroll-y',
  templateUrl: './table-scroll-y.component.html'
  })
  export class TableScrollYComponent implements OnInit {

    elements: debitsAndCredits[];
    headElements = ['Name', 'Description', 'Amount', 'Date'];

    ngOnInit() {
      for (let i = 1; i <= 15; i++) {
        this.elements.push({
          from: 'Name' + i , description: 'Description '+ i, amount: i, date:
            'Date ' + i
        });
      }
    }
}