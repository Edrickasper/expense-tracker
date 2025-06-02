import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

const routes: Routes = [
  {path: 'categories', component: CategoryComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'recurring', component: TransactionsComponent},
  {path: 'trash', component: TransactionsComponent},
  {path: '', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
