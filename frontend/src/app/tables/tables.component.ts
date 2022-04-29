import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Table } from '../table';
import { BooktableComponent } from '../booktable/booktable.component';
import { FreetableComponent } from '../freetable/freetable.component';


export interface BookData {
  table_id : number
}

export interface FreeData {
  table_id : number,
  order_id : number
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})


export class TablesComponent implements OnInit {


  sidenavWidth = 4;
  ngStyle: string | undefined;

  freeTables : Table[] = [];
  busyTables : Table[] = [];


  

  displayedColumns: string[] = ['position', 'id'];

  constructor(private dataService : DataService, private router: Router, private activatedroute:ActivatedRoute, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  getData(){
    this.freeTables.push(new Table(1,1));
    this.busyTables.push(new Table(1,2));
     // make an api call to get Tables 
  }

  bookTable(row : Table) : void{
    console.log('booking : ',row);
    const dialogRef = this.dialog.open(
      BooktableComponent,
      {
        width : '800px',
        data : {
          table_id : row.id
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Book Dialog is Closed');
      }
    );

  }

  unBook(row : Table){
    console.log('freeing : ',row);
    const dialogRef = this.dialog.open(
      FreetableComponent,
      {
        width : '800px',
        data : {
          table_id : row.id,
          order_id : 1000
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Free Dialog is Closed');
      }
    );
  }

}
