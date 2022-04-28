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
  // ingrForm = 

  ItemForm = new FormGroup(
    { 
      name: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      category: new FormControl('', [Validators.required]),
      isVeg: new FormControl('', [Validators.required]),
      ingredients: new FormArray([]),
    }
  );

  constructor() { 
    this.addItem();
  }

  ngOnInit(): void {
    this.ItemForm.reset();
  }
  addItem(){
    this.k = this.ItemForm.get('ingredients') as FormArray;
    this.k.push(new FormGroup(
      {
        ingredient : new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
      }
    ));
  }

  iterator(){
    this.k = this.ItemForm.get('ingredients') as FormArray;
    return this.k.controls;
  }

  newItem(){
    console.log(this.ItemForm)
    console.log("rAJESH");
    this.ItemForm.reset();
  }

}