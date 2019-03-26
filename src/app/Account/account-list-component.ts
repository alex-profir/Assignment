import { Component, Input, OnChanges } from '@angular/core'
import { DebitsAndCredits } from './debitsAndCredits'
@Component({
  selector:'account-list',
  templateUrl:'./account-list-component.html',
  styleUrls:['./account-list-component.css']  
})

export class AccountListComponent{
    @Input() dataList:DebitsAndCredits[];

}