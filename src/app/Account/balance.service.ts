import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


import { Balance } from './Balance';

@Injectable({
  providedIn: 'root'
})

export class BalanceService {
    private productUrl = 'api/result.json';

   constructor(private http: HttpClient) { }
  
    getBalance(): Observable<Balance> {
      return this.http.get<Balance>(this.productUrl).pipe(
        tap(data => console.log('we did it')),
        catchError(this.handleError)
      );
    }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}