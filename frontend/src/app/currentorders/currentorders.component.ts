import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MyorderComponent } from '../myorder/myorder.component';

export interface Order{
  order_id : string,
  total_cost : number,
  payment_method : string,
  order_mode : string,
  status : string,
  table_id : number,
  placing_time : string,
  customer_id : number,
  delivery_area : number,
  delivery_person_id : number,
  chef_id : number,
  delivery_rating : number,
  order_date : number,
  order_rating : string
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

  prep_orders : Order[] = [];

  offline_orders : Order[] = [];

  online_orders : Order[] = [];

  prep_show_items : boolean[] = [];

  offline_show_items : boolean[] = [];

  online_show_items : boolean[] = [];

  

  // readonly itemUrl;

  readonly orderUrl;
  readonly offUrl;
  readonly onUrl;
  

  constructor(private dataService : DataService, public dialog : MatDialog) { 
    // this.itemUrl = 'api/order/get_order_items/';
    this.orderUrl = 'api/order/get_all_orders';
    this.offUrl = 'api/order/get_offline_orders';
    this.onUrl = 'api/order/get_online_orders';
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.getPrepData();
    this.getOfflineData();
    this.getOnlineData();
  }

  getPrepData(){
    this.prep_orders = [];
    this.prep_show_items = [];
    this.dataService.get(this.orderUrl).pipe().subscribe(
      (res : any) => {
        // console.log(res);
        for(let x of res){
          // console.log(x)
          this.prep_show_items.push(false);
          this.prep_orders.push(x);
        }
        console.log('data',this.prep_orders)
      }
    )
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
    this.offline_orders = [];
    this.offline_show_items = [];
    this.dataService.get(this.offUrl).pipe().subscribe(
      (res : any) => {
        // console.log(res);
        for(let x of res){
          // console.log(x)
          this.offline_show_items.push(false);
          this.offline_orders.push(x);
        }
        console.log('data',this.offline_orders);
      }
    )
  }

  getOnlineData(){
    this.online_orders = [];
    this.online_show_items = [];
    this.dataService.get(this.onUrl).pipe().subscribe(
      (res : any) => {
        // console.log(res);
        for(let x of res){
          // console.log(x)
          this.online_show_items.push(false);
          this.online_orders.push(x);
        }
        console.log('data',this.online_orders);
      }
    )
  }

  getOrder(order : Order){
    console.log(order);
    const dialogRef = this.dialog.open(
      MyorderComponent,
      {
        width : '800px',
        // height : '800px',
        data : order
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('My Order Dialog is Closed');
        // this.getPrepData();
        this.getOfflineData();
        // this.getOnlineData();
        // if(order.status === 'Ordered'){
        //   this.prep_show_items[i] = !this.prep_show_items[i];
        // }
        // else if(order.status === 'Prepared' && order.order_mode === 'Online'){
        //   this.prep_show_items[i] = !this.prep_show_items[i];
        // }
      }
    );
  }

}
