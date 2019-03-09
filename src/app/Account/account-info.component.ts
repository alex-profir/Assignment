import { Component, OnInit } from '@angular/core';
import { Balance } from './Balance';
import { BalanceService } from './balance.service';
import { DebitsAndCredits } from './debitsAndCredits';
import { FormGroup ,FormBuilder, Validators, AbstractControl, ValidatorFn , FormArray} from '@angular/forms'


function amountRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
    selector:'info-root',
    templateUrl:'./account-info.component.html'
})



export class AccountInfoComponent implements OnInit {
    balanceForm:FormGroup;
    utc = new Date().toJSON();
    errorMessage = '';
    constructor(private balanceservice: BalanceService,
                private fb:FormBuilder) {
      
    }
    balance :Balance;
    debitsAndCredits: FormArray;
    ngOnInit():void{
        console.log("in onInit")
        this.balanceservice.getBalance().subscribe(
            data => {
              this.balance= data;
              console.log("goodies");
            },
            error => this.errorMessage = <any>error
          );
        this.balanceForm=this.fb.group({
          account:this.fb.group({
            name:'',
            iban:'',
            balance:''
          }),
          currency:'',
          debitsAndCredits:this.fb.array( [this.createDebits() ])
          });
    }
    createDebits():FormGroup {
      return this.fb.group({
        from:['',[Validators.required,Validators.minLength(3)]],
        description:['',[Validators.required,Validators.minLength(3)]],
        amount:[null,amountRange(0,1000)],
        date:new Date().toJSON()
      });
    }
  
    save() {
      console.log(this.balanceForm);
      console.log('Saved: ' + JSON.stringify(this.balanceForm.value));
    }
}