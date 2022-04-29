import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartConfiguration, ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  role !: string | null;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  rushhours:any;

  labels: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  
  public lineChartData: ChartConfiguration['data'] | undefined;
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      x: {
        title:{
          display:true,
          text:'Day'
        }
      },
      y:{
        title:{
          display:true,
          text:'Peak Hours'
        }
      }
      }

  };
  public lineChartType: ChartType = 'line';

  constructor(private employeeService : EmployeeService, private router: Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.getRushHours();
  }

  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }

  getRushHours() {
    this.employeeService.getRushHours().pipe().subscribe((d: any) => {
      //console.log('chefs', d);
      this.rushhours = d;
      // console.log('chefs', this.chefs);

      // this.lineChartData = {
      //   datasets:[
      //     {
      //       data:this.team1_runs,
      //       label:this.match_info.team1_name,
      //       pointRadius:this.team1_wkts,
      //     },
          
      //   ],
      //   labels: this.labels
      // }


    });
  }


}
