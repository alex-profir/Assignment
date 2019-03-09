import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


import { Balance } from './Balance';
import { DebitsAndCredits } from './debitsAndCredits';

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
    updateProduct(product: Balance): Observable<Balance> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.productUrl}`;
      return this.http.put<Balance>(url, product, { headers: headers })
        .pipe(
          tap(() => console.log('updateProduct: ')),
          // Return the product on an update
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