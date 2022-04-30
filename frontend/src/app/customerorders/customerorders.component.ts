import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.css']
})
export class CustomerordersComponent implements OnInit {

  sidenavWidth = 4;
  ngStyle: string | undefined;

  role !: string | null;
  customer_id : number = -1;

  constructor() { }

  ngOnInit(): void {

    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    if(sessionStorage.getItem("id") != null) this.customer_id = Number(sessionStorage.getItem("id"));

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
