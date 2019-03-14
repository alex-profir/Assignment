import { Component, OnInit } from '@angular/core';
import { Balance } from './Balance';
import { BalanceService } from './balance.service';
import { DebitsAndCredits } from './debitsAndCredits';
import { FormGroup ,FormBuilder, Validators, AbstractControl, ValidatorFn , FormArray} from '@angular/forms'
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
        console.log("in onInit");
        this.balanceservice.getBalance().subscribe(
            data => {
              this.balance= data;
              console.log("goodies");
          //  this.populateTestData();
            },
            error => this.errorMessage = <any>error
          );
        this.balanceForm=this.createDebits();
        /*
        this.balanceForm=this.fb.group({
          account:this.fb.group({
            name:'',
            iban:'',
            balance:''
          }),
          currency:'',
          debitsAndCredits:this.fb.array( [this.createDebits() ])
          });
        */
    }
    populateTestData(): void {
      console.log('in test data');
      this.balanceForm.patchValue({
        account:{name: this.balance.account.name , iban:this.balance.account.iban ,balance:this.balance.account.balance} ,
        currency: this.balance.currency,
      });
      this.balanceForm.setControl('description', this.fb.array(this.balance.debitsAndCredits || []));
    }
  
    createDebits():FormGroup {
      return this.fb.group({
        from:['',[Validators.required,Validators.minLength(3)]],
        description:['',[Validators.required,Validators.minLength(3)]],
        amount:[null,[Validators.required ,amountRange(0,1000)]],
        date:new Date().toJSON(),
        to:''
      });
    }
    addItem(): void {
      this.debitsAndCredits = this.balanceForm.get('debitsAndCredits') as FormArray;
      this.debitsAndCredits.push(this.createDebits());
    }
    // used only to see the data change on the webpage ( doesn't actually send it  )
    save() {
      console.log(this.balanceForm);
      console.log('Saved: ' + JSON.stringify(this.balanceForm.value));
      this.balance.debitsAndCredits.push(this.balanceForm.value);
      this.balance.account.balance+=this.balanceForm.get('amount').value;
      this.onSaveComplete();
    }
    //use this if you want to send it to the server ( note that it doens't work , yet ;) )
    saveBalance(): void {
      if (this.balanceForm.valid) {
        if (this.balanceForm.dirty) {
          
          this.balance.account.balance+=this.balanceForm.get('amount').value;
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
     // note that it should only be used to show data properly , delete after fixing whatever is going on 
      this.onSaveComplete();
    }
  
    onSaveComplete(): void {
      this.balanceForm.reset();
      this.balanceForm=this.createDebits();
    }
}