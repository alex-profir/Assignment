import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { BalanceService } from '../services/balance.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function amountRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  selector: 'account-add',
  templateUrl: 'account-add-component.html',
  styleUrls: ['./account-add-component.css']
})

export class AccountAddComponent implements OnInit{
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  isCredit = true;
  errorMessage = '';
  balanceForm: FormGroup;

  constructor(private balanceservice: BalanceService,
    private fb: FormBuilder) {

  }
  ngOnInit(){
    this.balanceForm = this.createDebits();
  }
  setDebitData(): void {
    const aux: string = this.balanceForm.get('from').value;
    this.balanceForm.patchValue({
      from: '',
      to: aux
    });
    this.isCredit = false;
  }
  setCreditData(): void {
    this.balanceForm.patchValue({
      to: ''
    });
    this.isCredit = true;
  }
  patchErrorData(): void {
    if (this.isCredit) {
      this.balanceForm.patchValue({
        to: 'credit'
      });
      this.isCredit = true;
    }
    else {
      const aux = this.balanceForm.get('to').value;
      this.balanceForm.patchValue({
        from: aux,
        to: 'debit'
      });
      this.isCredit = false;
    }


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
  saveBalance(): void {
    if (this.balanceForm.valid) {
      if (this.balanceForm.dirty) {
        if (!this.isCredit) {
          this.setDebitData();
        } else {
          this.setCreditData();
        }
        const p = this.balanceForm.value;
        this.balanceservice.updateBalance(p).subscribe(
          () => this.onSaveComplete(),
          (error: any) => {
            this.errorMessage = <any>error;
            this.patchErrorData();
          }
        );
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  onSaveComplete(): void {
    this.errorMessage = '';
    this.balanceForm.reset();
    this.balanceForm = this.createDebits();
    this.balanceForm.get('to').valueChanges.subscribe(
      () => this.setType()
    );
    this.isCredit = true;
    this.onClick();
  }
  setType(): void {
    this.isCredit = !this.isCredit;
  }
  onClick() {
    this.notify.emit(this.errorMessage);
  }
}