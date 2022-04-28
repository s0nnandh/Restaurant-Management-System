import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-freetable',
  templateUrl: './freetable.component.html',
  styleUrls: ['./freetable.component.css']
})
export class FreetableComponent implements OnInit {

  total! : number;

  id! : number;

  constructor(private dataService : DataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
  }

  getData(){
    this.total = 1000;
  }

  Pay(){
    console.log('Pay Works')
  }

}
