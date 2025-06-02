import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { MovementsComponent } from './movements/movements.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { TrashComponent } from './trash/trash.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { DisplayProfileComponent } from './profile/display-profile/display-profile.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'movements', component: MovementsComponent },
  { path: 'trash', component: TrashComponent },
  { path: '', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', component: DisplayProfileComponent },
      { path: 'edit', component: EditProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
