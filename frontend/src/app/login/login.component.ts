// import { Component, OnInit } from '@angular/core';
// import { WebRequestService } from '../Services/web-request.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  role: string = "";
  id: number = 0;
  // x: string = "";

  constructor(private loginService : LoginService,private fb: FormBuilder,private router: Router, private activatedroute:ActivatedRoute) { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]),
    locality: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{2}[0-9]{3}$")]),
  });

  loginForm = new FormGroup({
    phone_number: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  // , Validators.pattern("^\([0-9]{3}\)\\s{1}[0-9]{3}\-[0-9]{4}$")

  ngOnInit(): void {
    this.registerForm.reset();
    sessionStorage.clear();
  }

  
  addRegister(){

    this.loginService.register(this.registerForm.value).pipe().subscribe(
      (data: any) => {
      alert("Registered");
      console.log('message::::', data);
      console.log(this.registerForm.value);
      this.registerForm.reset();
      
      },
      (_error: any)=>{
				alert("Register Failed\n Enter credentials correctly");
        console.log(this.registerForm.value);
        this.registerForm.reset();
			}

    );
    
  }

  login(){

    this.loginService.login(this.loginForm.value).pipe().subscribe(
      (data: any) => {
      
      if(data.login === "true"){
        alert("Logged in as "+data.role);
        console.log('message::::', data);
        console.log(this.registerForm.value);
        sessionStorage.setItem("is_logged",data.login);
        sessionStorage.setItem("role",data.role);
        sessionStorage.setItem("id",data.id);
        this.role=data.role;
        this.id = data.id;
        // if(sessionStorage.getItem("x")==null){
        //   console.log("yes, x is null");
        // }
        this.navigate();
      }
      else{
        alert("Login Failed\n Enter credentials correctly");
        console.log(this.loginForm.value);
      }

      this.loginForm.reset();
      
      },
      (_error: any)=>{
				alert("Login Failed\n Enter credentials correctly");
        console.log(this.loginForm.value);
        this.loginForm.reset();
			}

    );

  }

  navigate(){
    if(this.role === "Manager") this.router.navigate(['/employee']);
    else if(this.role === "Waiter") this.router.navigate(['/tables']);
    else if(this.role === "Chef") this.router.navigate(['/chef/'+this.id]);
    else if(this.role === "Delivery-Person") this.router.navigate(['/deliveryperson/'+this.id]);
    else if(this.role === "Customer") this.router.navigate(['/order']);
    else this.router.navigate(['/login']);
  }


}
