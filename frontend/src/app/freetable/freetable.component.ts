import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { FreeData } from '../tables/tables.component';

@Component({
  selector: 'app-freetable',
  templateUrl: './freetable.component.html',
  styleUrls: ['./freetable.component.css']
})
export class FreetableComponent implements OnInit {

  total! : number;

  id! : number;

  constructor(private dataService : DataService, private router: Router, private route:ActivatedRoute, public dialogRef : MatDialogRef<FreetableComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data : FreeData) { }

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
  }

  getData(){
    this.total = 1000;
    console.log('data',this.data);
  }

  Pay(){
    console.log('Pay Works')
  }

}
