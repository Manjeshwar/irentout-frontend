import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CapacityComponent } from 'src/app/product/collection/filter/capacity/capacity.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  b_url = `http://localhost:3000/`;
  cty_url = `http://localhost:3000/cities`;
  users_url = `http://localhost:3000/users`;

  public register(regform) {
    return this.http.post(`${this.b_url}register`, regform);
  }

  updatePassword(id: string, data) {
    const url = `${this.users_url}/update`;
    data['id'] = id;
    return this.http.put(url, data);
  }

  checkmailidexists(email) {
    const url = `${this.users_url}/checkemail/${email}`;
    return this.http.get(url);
  }

  public userLogin(credentials) {
    return this.http.post(`${this.b_url}userlogin`, credentials);
  }

  public getFullUserDetails() {
    return this.http.get(this.users_url);
  }

  public getUserDetails(token) {
    return this.http.post(`${this.b_url}userdetails`, {token: token});
  }

  public getUserDetailsByUid(id) {
    return this.http.get(`${this.b_url}userdetails`, id);
  }

  public getHash(paramVal) {
    return this.http.post(`${this.b_url}payments`, paramVal);
  }

  public getAllCities() {
    return this.http.get(`${this.cty_url}`);
  }

  public initiateTransaction(formval) {
    return this.http.post(`${this.b_url}payments/saveorder`, formval);
  }

  public updateTransaction(formval) {
    return this.http.post(`${this.b_url}payments/updateorder`, formval);
  }

  public deleteTransaction(txnid) {
    return this.http.post(`${this.b_url}payments/deleteorder`, txnid);
  }

  public ordDetails(txnid) {
    return this.http.get(`${this.b_url}products/ordDetails/${txnid}`);
  }

  public forgotMail(email,city) {
    const uri = `${this.b_url}forgotpassword/send`;
    const obj = {
      email: email,
      city:city
    };
    console.log(obj);
    return this.http.post(uri, obj);
  }

  isTimeValid(tokenTime, currentTime) {
    let diff = (tokenTime.getTime() - currentTime.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  public checkMailLinkValidity(tokenValue) {
    const currentTime = new Date();
    const year = tokenValue.slice(0, 4);
    let month = tokenValue.slice(4, 6);
    month = parseInt(month);
    let date = tokenValue.slice(6, 8);
    date = parseInt(date);
    const hours = parseInt(tokenValue.slice(8, 10));
    const minutes = parseInt(tokenValue.slice(10, 12));
    const sec = parseInt(tokenValue.slice(12, 14));
    const tokenDate = `${year}-${month}-${date} ${hours}:${minutes}:${sec}`;

    const dbTime = new Date(tokenDate);

    const tokenDetail = {
      valid : false,
      time: 0
    };

    tokenDetail['valid'] = (this.isTimeValid(dbTime, currentTime) >= 10) ? false : true;
    tokenDetail['time'] = this.isTimeValid(dbTime, currentTime);

    return tokenDetail;

  }
}
