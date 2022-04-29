import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

export interface Order{
  pos : number,
  id : number;
}

export interface Item_list{
  id : number,
  quantity : number
}

@Component({
  selector: 'app-currentorders',
  templateUrl: './currentorders.component.html',
  styleUrls: ['./currentorders.component.css']
})



export class CurrentordersComponent implements OnInit {

  role !: string | null;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  offline_orders : Order[] = [];

  online_orders : Order[] = [];

  offline_show_items : boolean[] = [];

  online_show_items : boolean[] = [];

  offline_items : Item_list[][] = [];

  online_items : Item_list[][] = [];

  displayColumns : string[] = ['Item','Quantity'];

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.getOfflineData();
    this.getOnlineData();
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  getOfflineData(){
    this.offline_orders.push({
      pos : 0,
      id : 1
    });
    this.offline_show_items.push(false);
  }

  getOnlineData(){
    this.online_orders.push({
      pos : 0,
      id : 2
    });
    this.online_show_items.push(false);
  }

  getOfflineItems(order : Order){
    console.log(order);
    this.offline_items[order.pos] = [];
    this.offline_items[order.pos].push({
      id : 4,
      quantity : 2
    })
  }

  getOnlineItems(order : Order){
    console.log(order);
    this.online_items[order.pos] = [];
    this.online_items[order.pos].push({
      id : 5,
      quantity : 3
    })
  }

}
