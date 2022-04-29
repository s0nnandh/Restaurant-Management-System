import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-deliveryperson',
  templateUrl: './deliveryperson.component.html',
  styleUrls: ['./deliveryperson.component.css']
})
export class DeliverypersonComponent implements OnInit {

  role !: string | null;

  orders : number[] = [];

  show_orders : boolean[] = [];

  locality : string[] = [];

  city : string[] = [];

  pincode : string[] = [];

  id! : number;

  readonly Url;

  readonly postUrl;

  constructor(private dataService : DataService, private router: Router, private activatedroute: ActivatedRoute) { 
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.Url = 'api/delivery_person/get_dp_items/' + Number(this.id).toString();
    this.postUrl = 'api/delivery_person/change_dp_order';
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.getData();
    console.log('id',this.id)
  }
  getData(){
    this.orders = [];
    this.show_orders = [];
    this.dataService.get(this.Url).pipe().subscribe(
      (res : any) => {
        // console.log(res)
        for(let x of res){
          // console.log(x)
          this.orders.push(x.order_id);
          this.show_orders.push(false);
          this.locality.push(x.locality);
          this.city.push(x.city);
          this.pincode.push(x.pincode);
        }
      }
    )
  }


  Done(order : number){
    console.log(order);
    const x = {
      delivery_person_id : this.id,
      order_id : order
    };
    this.dataService.post(this.postUrl,x).subscribe(
      (res : any) => {
        console.log(res);
        this.getData();
      }
    )
    
  }
}
