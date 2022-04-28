import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})
export class BooktableComponent implements OnInit {

  occupancy! : number;

  id! : number;

  constructor(private dataService : DataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
  }

  getData(){
    this.occupancy = 100;
  }

  addOrder(){
    console.log("Order Works");
  }

}
