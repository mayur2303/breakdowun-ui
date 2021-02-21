import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_SESSION_ATTRIBUTE = 'authenticatedUser';
  TOKEN_KEY = 'Authorization';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  componentName: string;
  constructor(private http: HttpClient) {
  }

  login(loginData): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/signin', {
      username: loginData.username,
      password: loginData.password
    }, this.httpOptions);
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void{
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_SESSION_ATTRIBUTE);
  }

  saveUser(user): void {
    this.logout();
    sessionStorage.setItem(this.USER_SESSION_ATTRIBUTE, JSON.stringify(user));
    sessionStorage.setItem(this.TOKEN_KEY, user.token);
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE);
    if (user === null) { return false; }
    return true;
  }

  getLoggedInUserName(): string {
    const user = JSON.parse(sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE));
    if (user === null) { return ''; }
    return user.username;
  }

  getLoggedInUser(): any{
    const user = JSON.parse(sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE));
    if (user === null) { return ''; }
    return user;
  }

  getLoggedInUserRoles(): any{
    const user = JSON.parse(sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE));
    if (user === null) { return ''; }
    return user.roles;
  }

  setComponentName(compName: string): void{
    this.componentName = compName;
  }

  getComponentName(): string {
    return this.componentName;
  }


}
