import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
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

  readonly URL;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  constructor(private dataService : DataService) { 
    this.URL = 'api/item/item_info';
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
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
}