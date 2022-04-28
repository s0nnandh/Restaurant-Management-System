import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  freeTables! : Array<number>;
  busyTables! : Array<number>;

  constructor(private dataService : DataService, private router: Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){

  }

}
