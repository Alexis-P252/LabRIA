import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post(environment.api_url + "Authenticate/login/",
    {
      username: username,
      password: password
    },
    {
      headers: this.headers
    });
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    return localStorage.getItem('user');
  }
}
