import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './pages/review/review.component';
import { CreateReviewComponent } from './components/createReview/createReview.component';
import { EditplanningComponent } from './components/editplanning/editplanning.component';
import { GoogleMapsModule } from "@angular/google-maps";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { SubplanningformComponent } from './components/subplanningform/subplanningform.component';
import { FilterPlanOntimesPipe } from './components/planing-table/filter-plan-ontimes.pipe';
import { GoogleMapsComponent } from './google-maps/google-maps.component';

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
    ReviewComponent,
    CreateReviewComponent,
    EditplanningComponent,
    SubplanningformComponent,
    FilterPlanOntimesPipe,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule ,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule, // Ensure HttpClientModule is imported
  ],
  providers: [
    provideHttpClient(withFetch()), // Configure HttpClient to use fetch API
    provideClientHydration(), provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
