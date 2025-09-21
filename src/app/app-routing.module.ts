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
import { AuthGuard } from './authentication/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuestGuard } from './authentication/guest.guard';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MovementsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'trash', component: TrashComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DisplayProfileComponent },
      { path: 'edit', component: EditProfileComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
