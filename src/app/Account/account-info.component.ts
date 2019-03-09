import { Component, OnInit } from '@angular/core';
import { Balance } from './Balance';
import { BalanceService } from './balance.service';
import { DebitsAndCredits } from './debitsAndCredits';
import { FormGroup ,FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms'


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
    debitsInput:DebitsAndCredits;
    ngOnInit():void{
        console.log("in onInit");
        this.balanceForm=this.fb.group({
          amount:this.fb.group({
            name:'',//data.account.name,
            iban:'',//data.account.iban,
            balance:null//data.account.balance
          }),
          currency:null,//data.currency,
          debitsAndCredits:this.fb.group({
            from:['',[Validators.required,Validators.minLength(3)]],
            description:['',[Validators.required,Validators.minLength(3)]],
            amount:[null,amountRange(0,1000)],
            date:new Date().toJSON(),
          })
        });
        this.balanceservice.getBalance().subscribe(
            data => {
              this.balance= data;
              console.log("goodies");
              this.updateForm(data);
            },
            error => this.errorMessage = <any>error
          );
    }
    updateForm(data:Balance):void{
       
    }
    get debitsAndCredits(): FormArray {
      return <FormArray>this.balanceForm.get('tags');
    }
    save(): void {
      if (this.balanceForm.valid) {
        if (this.balanceForm.dirty) {
          const p = { ...this.balance, ...this.balanceForm.value };
            this.balanceservice.updateProduct(p)
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
    }
    onSaveComplete(): void {
      // Reset the form to clear the flags
      this.balanceForm.reset();
      //this.router.navigate(['/products']);
    }
  
}