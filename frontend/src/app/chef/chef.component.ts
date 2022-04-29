import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { DataService } from '../data.service';
import { EmployeeService } from '../employee.service';



@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  role !: string | null;

  orders : number[] = [];

  show_orders : boolean[] = [];

  id! : number;
  readonly URL;

  readonly postUrl;

  constructor(private dataService : DataService, private router: Router, private activatedroute: ActivatedRoute) { 
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.URL = 'api/chef/get_chef_items/'+Number(this.id).toString();
    this.postUrl = '/api/chef/change_chef_order';
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.getData();
    this.getChefs();
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    console.log('id',this.id)
  }

  getData(){
    this.orders = [];
    this.show_orders = [];
    this.orders.push(1);
    this.orders.push(2);
    this.orders.push(3);
    this.show_orders.push(false);
    this.show_orders.push(false);
  }
  getChefs(){

    this.dataService.get(this.URL).pipe().subscribe((d :any) => {
        console.log('Chefs',d);
    });
  }

  Done(order : number){
    console.log(order);
  }

}
