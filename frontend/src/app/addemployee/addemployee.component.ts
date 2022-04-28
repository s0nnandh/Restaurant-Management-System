import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  sidenavWidth = 4;
  ngStyle: string | undefined;

  chefForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    cuisine: new FormControl('', [Validators.required]),
    chef_rank: new FormControl('', [Validators.required]),
  });

  waiterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });

  // , Validators.pattern("^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$")

  deliverypersonForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    primary_area: new FormControl('', [Validators.required]),
  });

  constructor(private employeeService : EmployeeService, private router: Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.chefForm.reset();
    this.waiterForm.reset();
    this.deliverypersonForm.reset();
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  addChef(){
    //console.log(this.chefForm);
    
      this.employeeService.addChef(this.chefForm.value).pipe().subscribe(
        (data: any) => {
        alert("Chef got added");
        console.log('message::::', data);
        console.log(this.chefForm.value);
        this.chefForm.reset();
        
        },
        (_error: any)=>{
          alert("Chef is not added");
          console.log(this.chefForm.value);
          this.chefForm.reset();
        }
  
      );
    
  }

  addWaiter(){

    this.employeeService.addWaiter(this.waiterForm.value).pipe().subscribe(
      (data: any) => {
      alert("Waiter got added");
      console.log('message::::', data);
      console.log(this.waiterForm.value);
      this.waiterForm.reset();
      
      },
      (_error: any)=>{
        alert("Waiter is not added");
        console.log(this.waiterForm.value);
        this.waiterForm.reset();
      }

    );

  }

  addDeliveryPerson(){
    this.employeeService.addDeliveryPerson(this.deliverypersonForm.value).pipe().subscribe(
      (data: any) => {
      alert("Delivery Person got added");
      console.log('message::::', data);
      console.log(this.deliverypersonForm.value);
      this.deliverypersonForm.reset();
      
      },
      (_error: any)=>{
        alert("Delivery Person is not added");
        console.log(this.deliverypersonForm.value);
        this.deliverypersonForm.reset();
      }

    );
  }

}
