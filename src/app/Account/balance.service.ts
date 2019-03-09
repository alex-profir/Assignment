import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


import { Balance } from './Balance';

@Injectable({
  providedIn: 'root'
})

export class BalanceService {
    private productUrl = 'http://localhost:8080/api/balance';

   constructor(private http: HttpClient) { }
  
    getBalance(): Observable<Balance> {
      return this.http.get<Balance>(this.productUrl).pipe(
        tap(data => console.log('we did it')),
        catchError(this.handleError)
      );
    }
    updateProduct(product: Balance): Observable<Balance> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<Balance>(this.productUrl, product, { headers: headers })
        .pipe(
          tap(() => console.log('updateProduct: ')),
          map(() => product),
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