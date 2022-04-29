import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  role !: string | null;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
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
