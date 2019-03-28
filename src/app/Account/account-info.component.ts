import { Component, OnInit } from '@angular/core';
import { Balance } from './Balance';
import { BalanceService } from '../services/balance.service';
@Component({
  selector: 'account-root',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})


export class AccountInfoComponent implements OnInit {
  errorMessage = '';
  allGood = true;
  isCredit = true;

  constructor(private balanceservice: BalanceService) {


  }
  balance: Balance;
  ngOnInit(): void {
    console.log('in onInit');
    this.getBalance();
  }
  onNotify(message: string): void {
    if (message) {
      this.errorMessage = message;
    } else {
      this.getBalance();
    }
  }
  getBalance(): void {
    for (let i = 1; i <= 3; i++) {
      this.balanceservice.getBalance().subscribe(
        data => {
          this.balance = data;
          console.log('goodies');
          this.errorMessage = '';
        },
        error => {
          if (this.balance) {
            this.errorMessage = '';
          } else {
            this.errorMessage = <any>error;
          }
          this.allGood = false;
        }
      );
    }
  }

}
