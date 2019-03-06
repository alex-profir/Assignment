import { Component, OnInit } from '@angular/core';
import { Balance } from './Balance';
import  {BalanceService } from './balance.service';

@Component({
    selector:'info-root',
    templateUrl:'./account-info.component.html'
})
export class AccountInfoComponent implements OnInit {
    balance :Balance;
    errorMessage = '';
    constructor(private balanceservice: BalanceService) {

    }
    ngOnInit():void{
        console.log("in onInit")
        this.balanceservice.getBalance().subscribe(
            balance => {
              this.balance = balance;
              console.log("goodies");
            },
            error => this.errorMessage = <any>error
          );
    }
}