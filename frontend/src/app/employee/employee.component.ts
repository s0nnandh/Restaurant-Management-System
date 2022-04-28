import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  sidenavWidth = 4;
  ngStyle: string | undefined;

  showchefs =false;
  showwaiters =false;
  showdeliverypersons =false;

  // chefs: any = [{name: 'x', phone_number: '83', shift_start_time: '1', shift_end_time: '2', chef_rank: 'chef', cuisine: 'italian'},];
  chefs: any;
  chefscolumn: any=['name','phone_number','shift_timings','chef_rank','cuisine'];

  waiters: any;
  waiterscolumn: any=['name','phone_number','shift_timings'];

  del_persons: any;
  del_persons_column: any=['name','phone_number','shift_timings','primary_area','average_rating'];

  constructor(private employeeService : EmployeeService, private router: Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getChefs();
    this.getWaiters();
    this.getDeliveryPersons();
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  getChefs() {
    this.employeeService.getChefs().pipe().subscribe((d: any) => {
      //console.log('chefs', d);
      this.chefs = d;
      console.log('chefs', this.chefs);
    });
  }

  getWaiters() {
    this.employeeService.getWaiters().pipe().subscribe((d: any) => {
      //console.log('chefs', d);
      this.waiters = d;
      console.log('waiters', this.waiters);
    });
  }

  getDeliveryPersons() {
    this.employeeService.getDeliveryPersons().pipe().subscribe((d: any) => {
      //console.log('chefs', d);
      this.del_persons = d;
      console.log('delivery persons', this.del_persons);
    });
  }
  

}
