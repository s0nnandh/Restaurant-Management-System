import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getIngredients(){
    return this.http.get(`http://localhost:8000/api/ingredient/ingredient_info`);
  }

  addIngredient(data:any){
    return this.http.post('http://localhost:8000/api/ingredient/add_ingredient', data);
  }

}
