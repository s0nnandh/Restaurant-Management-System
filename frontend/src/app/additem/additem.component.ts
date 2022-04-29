import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService } from '../data.service';

export interface Ingr{
  ingredient : string,
  quantity : number
}

export interface AddItem{
  name : string,
  category : string,
  cost : number,
  availability : boolean,
  is_veg : boolean,
  item_ingredients : Ingr[]
}


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  role !: string | null;

  sidenavWidth = 4;
  ngStyle: string | undefined;

  k!: FormArray;

  readonly Url;

  readonly addUrl;

  searchkey1! : string;

  searchkey2! : string;

  ingredients : string[] = [];
  
  // ItemForm! : FormGroup;
  // ingrForm = 

  ItemForm = new FormGroup(
    { 
      name: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      category: new FormControl('', [Validators.required]),
      isVeg: new FormControl('', [Validators.required]),
      avail: new FormControl('',[Validators.required]),
      ingredients: new FormArray([]),
    }
  );

  constructor(private dataService : DataService) { 
    this.addItem();
    this.Url = 'api/ingredient/ingredient_info';
    this.addUrl = 'api/item/add_item'
    this.getIngredients()
  }

  getIngredients(){
    this.dataService.get(this.Url).pipe().subscribe(
      (res : any) => {
        console.log(res);
        for(let x of res){
          // console.log(x)
          this.ingredients.push(x.name)
        }

      }
    )
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("role") != null) this.role = sessionStorage.getItem("role");
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
    // console.log(this.ItemForm.value)
    var x = this.ItemForm.value;
    console.log(x)
    var ingrs : Ingr[] = [];
    for(let y of x.ingredients){
      ingrs.push(y)
    }
    var z = false,k = false;
    if(x.isVeg == 'Veg')z = true;
    if(x.avail == 'Available')k = true;
    // console.log(ingrs)
    let a : AddItem = {
      name : x.name,
      cost : x.cost,
      category : x.category,
      item_ingredients : x.ingredients,
      is_veg : z,
      availability : k
    };
    this.dataService.post(this.addUrl,a).subscribe(
      (res) => {
        console.log(res);
      }
    );
    console.log(a);
    // this.ItemForm.reset();
  }
  
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
}