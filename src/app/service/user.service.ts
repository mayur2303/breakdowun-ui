import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {
  }

  saveUser(userFrom): Observable<any> {
    return this.http.post('http://localhost:8080/user/createUser', userFrom, this.httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/user/all');
  }

  getAllRoles(): Observable<any> {
    return this.http.get('http://localhost:8080/role/all');
  }
}
