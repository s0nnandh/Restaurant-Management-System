import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service'
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  showaddingre = false;
  ingredients: any;
  ingredientscolumn: any=['id','name','quantity_remaining', 'change_quantity'];

  ingreForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private itemService : ItemService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ingreForm.reset();
    this.getIngredients();
  }

  getIngredients(){
    this.itemService.getIngredients().pipe().subscribe((d: any) => {
      //console.log('chefs', d);
      this.ingredients = d;
      console.log('ingredients', this.ingredients);
    });
  }

  addIngredient(){
    
  }


}
