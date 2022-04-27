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

  chefForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    shift_start_time: new FormControl('', [Validators.required]),
    shift_end_time: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    cuisine: new FormControl('', [Validators.required]),
  });

  waiterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    shift_start_time: new FormControl('', [Validators.required]),
    shift_end_time: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });

  deliverypersonForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    shift_start_time: new FormControl('', [Validators.required]),
    shift_end_time: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    primary_delivery_area: new FormControl('', [Validators.required]),
  });

  constructor(private employeeService : EmployeeService, private router: Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.chefForm.reset();
    this.waiterForm.reset();
    this.deliverypersonForm.reset();
  }

  addChef(){
    console.log(this.chefForm);
  }

  addWaiter(){

  }

  addDeliveryPerson(){
    
  }

}
