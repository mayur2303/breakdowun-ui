import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {
  }

  saveBDForm(bdForm): Observable<any> {
    return this.http.post('http://localhost:8080/breakdown/createSlip', bdForm, this.httpOptions);
  }

  /*getAllBDSlip(): Observable<any> {
    return this.http.get('http://localhost:8080/breakdown/all');
  }*/

}
