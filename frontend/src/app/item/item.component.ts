import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service'
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  sidenavWidth = 4;
  ngStyle: string | undefined;

  constructor(private itemService : ItemService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  
}
