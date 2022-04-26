import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router, private activatedroute:ActivatedRoute) { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    password: new FormControl('', [Validators.required]),
    repeat_password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.registerForm.reset();
  }

  addRegister(){
    // this.matchesService.addVenue(this.venueForm.value).pipe().subscribe(
    //   (data: any) => {
    //   console.log('message::::', data);
    //   console.log(this.venueForm.value);
    //   this.venueForm.reset();
      
    //   },
    //   (_error: any)=>{
		// 		alert("Venue is not added");
    //     console.log(this.venueForm.value);
    //     this.venueForm.reset();
		// 	}

    // );
    
  }

}
