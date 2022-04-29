import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { BookData } from '../tables/tables.component';

@Component({
  selector: 'app-booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})
export class BooktableComponent implements OnInit {

  occupancy! : number;

  id! : number;

  constructor(private dataService : DataService, private router: Router, private route:ActivatedRoute,
      @Inject(MAT_DIALOG_DATA)
      public data : BookData) { }

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
  }

  getData(){
    this.occupancy = 100;
    console.log('The id recieved : ',this.data.table_id);
  }

  addOrder(){
    console.log("Order Works");
    this.router.navigate(['/order']);
  }

}
