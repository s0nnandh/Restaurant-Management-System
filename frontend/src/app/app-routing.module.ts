import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { ItemComponent } from './item/item.component';
import { AdditemComponent } from './additem/additem.component';
import { TablesComponent } from './tables/tables.component';
import { OrderComponent } from './order/order.component';
import { CurrentordersComponent } from './currentorders/currentorders.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChefComponent } from './chef/chef.component';
import { DeliverypersonComponent } from './deliveryperson/deliveryperson.component';
import { Auth1Guard } from './services/auth1.guard';
import { Auth2Guard } from './services/auth2.guard';
import { Auth3Guard } from './services/auth3.guard';
import { Auth4Guard } from './services/auth4.guard';
import { Auth5Guard } from './services/auth5.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : 'login',component:LoginComponent },
  {path : 'employee',component:EmployeeComponent, canActivate:[Auth1Guard]},
  {path : 'addemployee',component:AddemployeeComponent, canActivate:[Auth1Guard]},
  {path : 'ingredient',component:IngredientComponent, canActivate:[Auth1Guard]},
  {path : 'item',component:ItemComponent, canActivate:[Auth1Guard]},
  {path : 'additem',component:AdditemComponent, canActivate:[Auth1Guard]},
  { path : 'tables', component : TablesComponent, canActivate:[Auth2Guard]},
  { path : 'order', component : OrderComponent, canActivate:[Auth3Guard]},
  { path : 'current', component : CurrentordersComponent, canActivate:[Auth1Guard]},
  { path : 'analytics', component : AnalyticsComponent, canActivate:[Auth1Guard]},
  { path : 'chef/:id', component : ChefComponent , canActivate:[Auth4Guard]},
  { path : 'delivery/:id', component : DeliverypersonComponent , canActivate:[Auth5Guard]},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
