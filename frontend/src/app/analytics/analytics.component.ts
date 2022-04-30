import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartConfiguration, ChartOptions, ChartType, ChartData } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  role !: string | null;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  rush:any;
  rushhours: number[]=[];
  radius: number[]=[];
  // readonly Url;
  ids : Map<string,number> = new Map<string,number>();
  ingredients : string[] = [];

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

  dayKForm = new FormGroup({
    day: new FormControl('', [Validators.required]),
    k: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
  });

  ingredientKForm = new FormGroup({
    ingredient: new FormControl('', [Validators.required]),
    k: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
  });

  topdayKdishes:any;
  topdayKdishescolumn: any=['dish_rank','item_id','item_name'];

  topingredientKdishes:any;
  topingredientKdishescolumn: any=['item_id','item_name','ordered_quantity'];

  constructor(private dataService : DataService, private employeeService : EmployeeService, private router: Router, private activatedroute:ActivatedRoute) {
    // this.Url = 'api/ingredient/ingredient_info';
    // this.getIngredients();
   }

  ngOnInit(): void {
    // this.topdayKdishes.reset();
    // this.topingredientKdishes.reset();
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
    this.getRushHours();
    this.getIngredients();
    
  }

  getIngredients(){
    this.employeeService.getIngredients().pipe().subscribe(
      (res : any) => {
        console.log(res);
        for(let x of res){
          // console.log(x)
          this.ids.set(x.name,x.ingredient_id);
          this.ingredients.push(x.name)
        }

      }
    )
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
      console.log('chefs', d);
      this.rush = d;
      // console.log('chefs', this.chefs);
      for(var i=0;i<d.length;i++){
        this.rushhours.push(d[i].peak_hour);
        console.log(d[i].peak_hours);
        this.radius.push(5);
      }
      console.log('rushhours', this.rushhours);
      console.log('labels', this.labels);
      this.lineChartData = {
        datasets:[
          {
            data:this.rushhours,
            label:"Peak Hours",
            pointRadius:this.radius,
          },
          
        ],
        labels: this.labels
      }


    });
  }

  getTopdishesbyDay(){

    this.employeeService.getTopdishesbyDay(this.dayKForm.value.day, this.dayKForm.value.k).pipe().subscribe((d: any) => {

      this.topdayKdishes =d;


    });

    

  }

  getTopdishesbyIngredients(){

    var x = this.ingredientKForm.value;
    this.employeeService.getTopdishesbyIngredients(Number(this.ids.get(x.ingredient)), x.k).pipe().subscribe((d: any) => {

      this.topingredientKdishes =d;


    });

    

  }


}
