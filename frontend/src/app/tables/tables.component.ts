import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Table } from '../table';
import { BooktableComponent } from '../booktable/booktable.component';
import { FreetableComponent } from '../freetable/freetable.component';


export interface BookData {
  table_id : number,
  occupancy : number
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

  role !: string | null;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  freeTables : Table[] = [];
  busyTables : Table[] = [];

  readonly freeUrl;
  readonly busyUrl ;

  displayedColumns: string[] = ['position', 'id'];

  constructor(private dataService : DataService, private router: Router, private activatedroute:ActivatedRoute, public dialog : MatDialog) {
    this.freeUrl = 'api/table/free_tables';
    this.busyUrl = 'api/table/booked_tables';
   }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
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
    // this.freeTables.push(new Table(1,1));
    this.dataService.get(this.freeUrl).pipe().subscribe(
      (res : any) => {
        // console.log(res);
        for(let x in res){
          console.log(res[x])
          this.freeTables.push({
            position : Number(x),
            id : Number(res[x].table_id),
            capacity : Number(res[x].capacity)
          });
        }
        console.log('hhello',this.freeTables.length);
      }
    )
    
    this.dataService.get(this.busyUrl).pipe().subscribe(
      (res : any) => {
        // console.log(res);
        for(let x in res){
          console.log(res[x])
          this.busyTables.push({
            position : Number(x),
            id : Number(res[x].table_id),
            capacity : Number(res[x].capacity)
          });
        }
        console.log('hhello',this.busyTables.length);
      }
    )

    // for(let x in this.freeTables){
    //   console.log('damn',x)
    //   console.log(this.freeTables[x])
    // }
    // this.busyTables.push(new Table(1,2,1));
     // make an api call to get Tables 
  }

  bookTable(row : Table) : void{
    console.log('booking : ',row);
    const dialogRef = this.dialog.open(
      BooktableComponent,
      {
        width : '800px',
        data : {
          table_id : row.id,
          occupancy : row.capacity
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
