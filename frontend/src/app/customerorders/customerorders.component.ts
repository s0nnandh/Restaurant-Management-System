import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute  } from '@angular/router';

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

  completedorders: any;
  incompleteorders: any;

  comordercolumn: any=['order_id', 'total_cost', 'payment_method'];
  incomordercolumn: any=['order_id', 'total_cost', 'payment_method'];

  constructor(private employeeService : EmployeeService, private router: Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    if(sessionStorage.getItem("id") != null) this.customer_id = Number(sessionStorage.getItem("id"));
    this.getCompleteOrders();
    this.getInCompleteOrders();

  }

  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }

  getCompleteOrders() {
    this.employeeService.getCustomerCompletedOrders(this.customer_id).pipe().subscribe((d: any) => {
      //console.log('chefs', d);
      this.completedorders = d;
      // console.log('chefs', this.chefs);
    });
  }

  getInCompleteOrders() {
    this.employeeService.getCustomerInCompletedOrders(this.customer_id).pipe().subscribe((d: any) => {
      //console.log('chefs', d);
      this.incompleteorders = d;
      // console.log('chefs', this.chefs);
    });
  }

}
