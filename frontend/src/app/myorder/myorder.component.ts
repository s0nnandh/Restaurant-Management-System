import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../currentorders/currentorders.component';
import { DataService } from '../data.service';

export interface Item{
  item_id : number,
  item_quantity : number,
  item_name : string
}

export interface Employee{
  id : number,
  name : string
}

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  readonly Url;

  items : Item[] = [];

  displayColumns : string[] = ['item_id','item_name','item_quantity'];

  status! : string; 

  order_mode! : string;

  chef! : string;

  dp! : string;

  chefs : Employee[] = [];

  dpersons : Employee[] = [];

  readonly chefUrl;

  readonly dpUrl;

  readonly postUrl;

  constructor(private dataService : DataService, private router: Router, private route: ActivatedRoute,public dialogRef : MatDialogRef<MyorderComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data : Order) { 
      this.Url = 'api/order/get_order_items/' + Number(data.order_id).toString();
      this.status = data.status;
      this.order_mode = data.order_mode;
      this.chefUrl = 'api/employee/chef_names';
      this.dpUrl = 'api/employee/delivery_person_names';
      this.postUrl = 'api/manager/mark_completed';

    }

  ngOnInit(): void {
    this.getItems();
    this.getChefs();
    this.getDps();
  }

  getChefs(){
    this.dataService.get(this.chefUrl).pipe().subscribe(
      (res : any)=> {
        for(let x of res){
          console.log(x)
          this.chefs.push(x)
        }
      }
    )
  }

  getDps(){
    this.dataService.get(this.dpUrl).pipe().subscribe(
      (res : any) => {
        for(let x of res){
          this.dpersons.push(x)
        }
      }
    )
  }

  getItems(){
    this.dataService.get(this.Url).pipe().subscribe(
      (res : any) => {
        console.log(res);
        for(let x of res){
          console.log(x)
          this.items.push(x);
        }
      }
    );
    console.log('data',this.items)
  }

  Update(){
    this.dataService.post(this.postUrl,{
      order_id : this.data.order_id
    }).pipe().subscribe(
      (res : any) => {
        console.log('res',res)
      }
    )
  }

}
