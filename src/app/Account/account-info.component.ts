import { Component, OnInit } from '@angular/core';
import { Balance } from './Balance';
import { BalanceService } from '../services/balance.service';
import { DebitsAndCredits } from './debitsAndCredits';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


function amountRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  selector: 'info-root',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})



export class AccountInfoComponent implements OnInit {
  balanceForm: FormGroup;
  utc = new Date().toJSON();
  errorMessage = '';
  isCredit = true;

  constructor(private balanceservice: BalanceService,
              private fb: FormBuilder) {


  }
  balance: Balance;
  ngOnInit(): void {
    console.log('in onInit');
    for (let i = 1; i < 3; i++) {
      this.balanceservice.getBalance().subscribe(
        data => {
          this.balance = data;
          console.log('goodies');
          //  this.populateTestData();
        },
        error => this.errorMessage = <any>error
      );
    }
    this.balanceForm = this.createDebits();
    this.balanceForm.get('to').valueChanges.subscribe(
     () => this.setType()
    );


  }
  setDebitData(): void {
    const aux: string = this.balanceForm.get('from').value;
    this.balanceForm.patchValue({
      from: '',
      to: aux
    });
  }
  setCreditData(): void {
    this.balanceForm.patchValue({
      to: ''
    });
  }
  createDebits(): FormGroup {
    return this.fb.group({
      from: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required, amountRange(0, 1000)]],
      date: new Date().toJSON(),
      to: 'credit'// note that it's used only for choices , after it's value will be either the 'from' string or undefined
    });
  }
  // used only to see the data change on the webpage ( doesn't actually send it  )
  save() {
    console.log(this.balanceForm);
    console.log('Saved: ' + JSON.stringify(this.balanceForm.value));
    this.balance.debitsAndCredits.push(this.balanceForm.value);
    this.balance.account.balance += this.balanceForm.get('amount').value;
    this.onSaveComplete();
  }
  // use this if you want to send it to the server ( note that it doens't work , yet ;) )
  saveBalance(): void {
    if (this.balanceForm.valid) {
      if (this.balanceForm.dirty) {
        if (!this.isCredit) {
          this.setDebitData();
        } else {
          this.setCreditData();
        }
        if (this.balanceForm.get('from').value) {
          this.balance.account.balance += this.balanceForm.get('amount').value;
        } else {
          this.balance.account.balance -= this.balanceForm.get('amount').value;
        }
        this.balance.debitsAndCredits.push(this.balanceForm.value);
        const p = this.balanceForm.value;
        this.balanceservice.updateBalance(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
    this.onSaveComplete();
  }

  onSaveComplete(): void {
    this.balanceForm.reset();
    this.balanceForm = this.createDebits();
  }
  setType(): void {
    this.isCredit = !this.isCredit;
  }
}