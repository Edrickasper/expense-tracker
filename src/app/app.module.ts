import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddTransactionComponent } from './transactions/add-transaction/add-transaction.component';
import { TransactionService } from './transactions/transaction.service';
import { CategoryService } from './category/category.service';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationService } from './authentication/authentication.service';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey:  /* API key */,
  authDomain: "transaction-manager-ae91b.firebaseapp.com",
  projectId: "transaction-manager-ae91b",
  storageBucket: "transaction-manager-ae91b.firebasestorage.app",
  messagingSenderId: "918381907162",
  appId: "1:918381907162:web:e1cf8e746bdd90797429e3"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    TransactionsComponent,
    AddTransactionComponent,
    AddCategoryComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    TransactionService,
    CategoryService,
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AuthenticationService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
