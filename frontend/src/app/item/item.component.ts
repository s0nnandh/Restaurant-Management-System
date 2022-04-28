import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service'
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  

  constructor(private itemService : ItemService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  
}
