import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http'; // Import necessary modules

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaningComponent } from './pages/planing/planing.component';
import { PlaningListComponent } from './components/planing-list/planing-list.component';
import { PlaningFormComponent } from './components/planing-form/planing-form.component';
import { SubPlaningComponent } from './pages/sub-planing/sub-planing.component';
import { PlaningTableComponent } from './components/planing-table/planing-table.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PlaningComponent,
    PlaningListComponent,
    PlaningFormComponent,
    SubPlaningComponent,
    PlaningTableComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule, // Ensure HttpClientModule is imported
  ],
  providers: [
    provideHttpClient(withFetch()), // Configure HttpClient to use fetch API
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
