import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';



@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  orders : number[] = [];

  show_orders : boolean[] = [];

  id! : number;

  constructor(private dataService : DataService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    console.log('id',this.id)
  }

  getData(){
    this.orders = [];
    this.show_orders = [];
    this.orders.push(1);
    this.orders.push(2);
    this.show_orders.push(false);
    this.show_orders.push(false);
  }

  Done(order : number){
    console.log(order);
  }

}
