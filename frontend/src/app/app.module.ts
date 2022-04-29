import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './material/material.module';
// import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { ItemComponent } from './item/item.component';
import { AdditemComponent } from './additem/additem.component';
import { BooktableComponent } from './booktable/booktable.component';
import { FreetableComponent } from './freetable/freetable.component';
import { TablesComponent } from './tables/tables.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderComponent } from './order/order.component';
import { CurrentordersComponent } from './currentorders/currentorders.component';
import { ChefComponent } from './chef/chef.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    AddemployeeComponent,
    AdditemComponent,
    BooktableComponent,
    FreetableComponent,
    TablesComponent,
    IngredientComponent,
    ItemComponent,
    AdditemComponent,
    OrderComponent,
    CurrentordersComponent,
    ChefComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,    
    MatExpansionModule,
    MatSlideToggleModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
