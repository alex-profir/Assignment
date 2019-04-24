import { Component, Input } from '@angular/core';
import { DebitsAndCredits } from './debitsAndCredits';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {

  constructor() { }

  @Input() dataList: DebitsAndCredits[];

}
