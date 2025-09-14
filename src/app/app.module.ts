import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryPopupComponent } from './categories/category-popup/category-popup.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementPopupComponent } from './movements/movement-popup/movement-popup.component';
import { TrashComponent } from './trash/trash.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { DisplayProfileComponent } from './profile/display-profile/display-profile.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    MovementsComponent,
    CategoryPopupComponent,
    RegisterComponent,
    LoginComponent,
    MovementPopupComponent,
    TrashComponent,
    ProfileComponent,
    EditProfileComponent,
    DisplayProfileComponent,
    SpinnerComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync('noop'),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
