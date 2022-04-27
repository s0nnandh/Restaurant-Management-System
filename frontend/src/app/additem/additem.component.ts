import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  k!: FormArray;
  // ItemForm! : FormGroup;
  ingrForm = new FormGroup(
    {
      ingredient : new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    }
  )

  ItemForm = new FormGroup(
    { 
      name: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      category: new FormControl('', [Validators.required]),
      isVeg: new FormControl('', [Validators.required]),
      ingredients: new FormArray([],[Validators.required]),
    }
  );

  constructor() { 
    // this.addItem();
  }

  ngOnInit(): void {
    this.ItemForm.reset();
  }
  addItem(){
    this.k = this.ItemForm.get('ingredients') as FormArray;
    this.k.push(this.ingrForm);
  }

  newItem(){
    console.log("rAJESH");
  }

}