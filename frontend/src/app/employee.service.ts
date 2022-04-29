import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getChefs(){
    return this.http.get(`http://localhost:8000/api/employee/chef_info`);
  }

  getWaiters(){
    return this.http.get(`http://localhost:8000/api/employee/waiter_info`);
  }

  getDeliveryPersons(){
    return this.http.get(`http://localhost:8000/api/employee/delivery_person_info`);
  }

  addChef(data:any){
    return this.http.post('http://localhost:8000/api/employee/add_chef', data);
  }

  addWaiter(data:any){
    return this.http.post('http://localhost:8000/api/employee/add_waiter', data);
  }

  addDeliveryPerson(data:any){
    return this.http.post('http://localhost:8000/api/employee/add_delivery_person', data);
  }

}
