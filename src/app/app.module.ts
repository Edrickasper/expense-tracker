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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryPopupComponent } from './categories/category-popup/category-popup.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { CategoryComponent } from './categories/category/category.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementComponent } from './movements/movement/movement.component';
import { MovementPopupComponent } from './movements/movement-popup/movement-popup.component';
import { TrashComponent } from './trash/trash.component';
import { RestorePopupComponent } from './trash/restore-popup/restore-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { DisplayProfileComponent } from './profile/display-profile/display-profile.component';
import { SpinnerComponent } from './spinner/spinner.component';

const firebaseConfig = {
  apiKey: 'AIzaSyAlLdQGuzevgfJiJ-32vFyeevwdAjm11_w',
  authDomain: 'transaction-manager-ae91b.firebaseapp.com',
  projectId: 'transaction-manager-ae91b',
  storageBucket: 'transaction-manager-ae91b.firebasestorage.app',
  messagingSenderId: '918381907162',
  appId: '1:918381907162:web:e1cf8e746bdd90797429e3',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    MovementsComponent,
    MovementComponent,
    CategoryPopupComponent,
    RegisterComponent,
    LoginComponent,
    MovementPopupComponent,
    CategoryComponent,
    TrashComponent,
    RestorePopupComponent,
    ProfileComponent,
    EditProfileComponent,
    DisplayProfileComponent,
    SpinnerComponent,
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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync('noop'),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
