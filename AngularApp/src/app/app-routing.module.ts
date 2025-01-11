import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {CustomerComponent} from './customer/customer.component';
import {BillComponent} from './bill/bill.component';

const routes: Routes = [
  {path:"product",component:ProductComponent},
  {path:"customer",component:CustomerComponent},
  { path: 'bill/:id', component: BillComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
