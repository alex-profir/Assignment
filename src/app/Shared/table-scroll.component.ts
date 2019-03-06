import { Component, OnInit } from '@angular/core';
import { debitsAndCredits } from '../Account/debitsAndCredits';
import { element } from 'protractor';

  @Component({
  selector: 'table-scroll-y',
  templateUrl: './table-scroll-y.component.html'
  })
  export class TableScrollYComponent implements OnInit {

    elements: debitsAndCredits[] =[
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      },
      {
          "from": "Wendy",
          "description": "Diner",
          "amount": 10.50,
          "date": "2016-01-10T09:20:00.000Z"
      }];
    lenght:number = this.elements.length;
    headElements = ['Name', 'Description', 'Amount', 'Date'];

    ngOnInit() {
      for (let i = 1; i <= 15 ; i++) {
        this.elements.push({
          from: 'Name' + i , description: 'Description '+ i, amount: i, date:
            'Date ' + i
        });
      }
    }
}