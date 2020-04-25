import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  b_url = `http://localhost:3000/`;
  cty_url = `http://localhost:3000/cities`;

  public register(regform) {
    return this.http.post(`${this.b_url}register`, regform);
  }

  public userLogin(credentials) {
    return this.http.post(`${this.b_url}userlogin`, credentials);
  }

  public getUserDetails(token) {
    return this.http.post(`${this.b_url}userdetails`, {token: token});
  }

  public getAllCities() {
    return this.http.get(`${this.cty_url}`);
  }
}
