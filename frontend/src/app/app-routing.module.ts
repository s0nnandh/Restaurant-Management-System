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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : 'login',component:LoginComponent },
  {path : 'employee',component:EmployeeComponent},
  {path : 'addemployee',component:AddemployeeComponent},
  {path : 'ingredient',component:IngredientComponent},
  {path : 'item',component:ItemComponent},
  {path : 'additem',component:AdditemComponent},
  { path : 'tables', component : TablesComponent},
  { path : 'order', component : OrderComponent},
  { path : 'current', component : CurrentordersComponent},
  { path : 'analytics', component : AnalyticsComponent},
  { path : 'chef/:id', component : ChefComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
