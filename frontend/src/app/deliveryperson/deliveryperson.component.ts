import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-deliveryperson',
  templateUrl: './deliveryperson.component.html',
  styleUrls: ['./deliveryperson.component.css']
})
export class DeliverypersonComponent implements OnInit {

  role !: string | null;

  id! : number;

  constructor(private dataService : DataService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    console.log('id',this.id)
  }

}
