import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { AdditemComponent } from './additem/additem.component';
import { BooktableComponent } from './booktable/booktable.component';
import { FreetableComponent } from './freetable/freetable.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path :'login',component:LoginComponent },
  {path : 'employee',component:EmployeeComponent},
  {path : 'addemployee',component:AddemployeeComponent},
  {path : 'additem',component:AdditemComponent},
  { path : 'tables', component : TablesComponent},
  { path : 'book/:id', component : BooktableComponent},
  { path : 'free/:id', component : FreetableComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
