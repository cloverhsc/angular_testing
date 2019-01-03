import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {
  readonly userUrl = 'api/users';   // url to web api

  constructor(private http: HttpClient) { }

  getUsers(): Observable<DataForm[]> {
    return this.http.get<DataForm[]>(this.userUrl)
    .pipe(
      catchError(this.handleError('getUsers'))
    ) as Observable<DataForm[]>;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

export class DataForm {
  name: string;
  id: number;
}
