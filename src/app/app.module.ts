import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";
import { BorrowComponent } from './components/borrow/borrow.component';
import { LendComponent } from './components/lend/lend.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BorrowerDashboardComponent } from './components/borrower-dashboard/borrower-dashboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BorrowDetailComponent } from './components/borrow-detail/borrow-detail.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LenderDashboardComponent } from './components/lender-dashboard/lender-dashboard.component';
import { LenderDetailsComponent } from './components/lender-details/lender-details.component';

/* Components */


@NgModule({
  declarations: [
    AppComponent,
    BorrowComponent,
    LendComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    BorrowerDashboardComponent,
    BorrowDetailComponent,
    VerifyComponent,
    LenderDashboardComponent,
    LenderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }