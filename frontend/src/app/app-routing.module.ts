import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AdditemComponent } from './additem/additem.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path :'login',component:LoginComponent },
  {path : 'employee',component:EmployeeComponent},
  {path : 'addemployee',component:AddemployeeComponent},
  {path : 'ingredient',component:IngredientComponent},
  {path : 'additem',component:AdditemComponent},

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
