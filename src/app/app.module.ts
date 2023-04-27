import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentSnapshot } from 'firebase/firestore';
// import { AngularFirestoreModule } from "@angular/fire/firestore";
import {  AngularFirestore } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AngularFireModule } from "@angular/fire";
import 'firebase/firestore';
// import { AngularFirestoreModule } from "@angular/fire/firestore";
// import { environment } from "../environments/environment";
// import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { FirestoreModule, initializeFirestore , getFirestore, provideFirestore } from "@angular/fire/firestore";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from "src/environments/environment.development";
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule } from '@angular/forms';
import { initializeApp ,provideFirebaseApp, getApp } from '@angular/fire/app';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // provideFirebaseApp(() => initializeApp({ ... })),
    // provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }