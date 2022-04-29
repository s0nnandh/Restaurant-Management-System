import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  register(data:any){
    return this.http.post('http://localhost:8000/api/auth/register', data);
  }

  login(data:any){
    return this.http.post('http://localhost:8000/api/auth/login', data);
  }

}
