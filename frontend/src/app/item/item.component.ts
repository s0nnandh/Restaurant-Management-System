import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service'
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  role !: string | null;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  // items: any;
  // categories:any;
  menu: any;
  itemsscolumn: any=['item_name','name','is_veg','cost','availability'];

  constructor(private itemService : ItemService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.getItems();
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  getItems(){
    this.itemService.getItems().pipe().subscribe((data: any) => {
      //console.log('chefs', d);
      // this.categories = data.categories;
      // console.log('categories', this.categories);
      // this.items = data.items;
      // console.log('items', this.items);
      this.menu = data;
      console.log('items', this.menu);
    });
  }

  
}
