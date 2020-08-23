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
    return this.http.get(`${this.users_url}/getUserInfo/${id}`);
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
      city: city
    };
    return this.http.post(uri, obj);
  }

  public checkMailLinkValidity(tokenValue) {
    const uri = `${this.b_url}forgotpassword/check/${tokenValue}`;
    return this.http.get(uri);
  }

  public getAddress(uid) {
    const url = `${this.users_url}/address/${uid}`;
    return this.http.get(url);
  }

  public addUpdateAddress(uid, address) {
    const url = `${this.users_url}/updateaddress/${uid}`;
    const data = {address}
    return this.http.put(url, data);
  }

  public getBillAddress(uid) {
    const url = `${this.users_url}/billingaddress/${uid}`;
    return this.http.get(url);
  }

  public addUpdateBillAddress(uid, address) {
    const url = `${this.users_url}/updatebilladdress/${uid}`;
    const data = {address}
    return this.http.put(url, data);
  }

  public deleteAddress(id){
    const url = `${this.users_url}/deleteaddress/${id}`;
    return this.http.delete(url);
  }
}
