import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BalanceModule } from './balance/balance.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SnekComponent } from './snek/snek.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SnekComponent
  ], 
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path : 'welcome' , component: WelcomeComponent },
      { path : 'snek' , component: SnekComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    BalanceModule

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
