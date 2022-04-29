import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly URL;

  constructor(private http : HttpClient) { 
    this.URL = 'http://localhost:8000';
  }

  get(uri : string){

    return this.http.get<Map<string,string>[]>(`${this.URL}/${uri}`);

  }

}
