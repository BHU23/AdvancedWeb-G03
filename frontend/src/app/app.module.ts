import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
    PlaningTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
