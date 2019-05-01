import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountInfoComponent } from './account-info.component';
import { AccountAddComponent } from './account-add.component';
import { AccountListComponent } from './account-list.component';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'assignment',
        component: AccountInfoComponent
      },
    ]),
  ],
  declarations: [
    AccountInfoComponent,
    AccountAddComponent,
    AccountListComponent,
  ]
})
export class BalanceModule { }
