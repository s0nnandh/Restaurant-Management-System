import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


export interface Item{
  id1 : number,
  id2  : number,
  name : string,
  price : number,
  quantity : number
};

export interface category_item{
    category : string,
    item : Item
};

export interface MyItem{
  item_id : string,
  quantity : number
}

export interface MyOrder{
  total_cost : number,
  payment_method : string,
  order_mode : string,
  table_id : number,
  placing_time : string,
  customer_id : number,
  order_date : string,
  order_items : MyItem[]
}



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  role !: string | null;

  items : Item[][] = [];

  categories : string[] = [];

  total : number = 0;

  cnt : number = -1;

  customer_id : number = -1;

  table_id : number = -1;

  payment_method! : string;

  readonly URL;

  readonly postUrl;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  constructor(private dataService : DataService, private route : ActivatedRoute) { 
    this.URL = 'api/item/item_info';
    this.postUrl = 'api/order/place_order';
  }

  ngOnInit(): void {
    console.log('date',(new Date()).getMinutes().toString());
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    if(sessionStorage.getItem("id") != null) this.customer_id = Number(sessionStorage.getItem("id"));
    // this.table_id = Number(this.route.snapshot.paramMap.get("id"));
    if(sessionStorage.getItem("table_id") != null)this.table_id = Number(sessionStorage.getItem("table_id"));
    else this.table_id = -1;
    this.getData()

  }

  getData(){

    // this.items.push({
    //   id : 0,
    //   name : 'Hello',
    //   price : 1,
    //   quantity : 0
    // })

    this.dataService.get(this.URL).pipe().subscribe(
      (res : any) => {
        for(let x in res){
          console.log(res[x])
          this.categories.push(res[x].category)
          this.items.push([]);
          this.cnt = -1;
          for(let y in res[x].items){
            // console.log(res[x].items[y])
            if(res[x].items[y].availability == false)continue;
            this.cnt++;
            this.items[Number(x)].push({
                id1 : Number(x),
                id2 : this.cnt,
                name : res[x].items[y].item_name,
                price : Number(res[x].items[y].cost),
                quantity : 0
              }
            )
          }
        }
      }
    )

  }

  ItemIncrease(row : Item){
    this.items[row.id1][row.id2].quantity++;
    this.total += this.items[row.id1][row.id2].price;
  }

  ItemDecrease(row : Item){
    if (this.items[row.id1][row.id2].quantity > 0) {
      this.items[row.id1][row.id2].quantity--;
      this.total -= this.items[row.id1][row.id2].price;
    }
  }

  
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }

  PlaceOrder(){
    var x = new Date();
    var ord;
    if(this.table_id == -1)ord = 'Online';
    else ord = 'Offline';
    let myitems : MyItem[] = [];
    for(let x in this.items){
      for(let y in this.items[x]){
        if(this.items[x][y].quantity > 0){
          myitems.push({
            item_id : this.items[x][y].name,
            quantity : this.items[x][y].quantity
          })
        }
      }
    }
    let a : MyOrder = {
      customer_id : this.customer_id,
      total_cost : this.total,
      table_id : this.table_id,
      order_mode : ord,    
      placing_time : x.getHours().toString() + ":" + x.getMinutes().toString() + ":" + x.getSeconds().toString(),
      order_date : x.getFullYear() + "-" + x.getMonth().toString() + "-" + x.getDate().toString(),
      order_items : myitems,
      payment_method : this.payment_method
    }
    console.log(a)

    this.dataService.post(this.postUrl,a).subscribe(
      (res) => {
        console.log(res);
      }
    );
    
  }

}