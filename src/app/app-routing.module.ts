import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorrowDetailComponent } from './components/borrow-detail/borrow-detail.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { BorrowerDashboardComponent } from './components/borrower-dashboard/borrower-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LendComponent } from './components/lend/lend.component';
import { LenderDashboardComponent } from './components/lender-dashboard/lender-dashboard.component';
import { LenderDetailsComponent } from './components/lender-details/lender-details.component';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'borrow', component: BorrowComponent },
  { path: 'lend', component: LendComponent },
  { path: 'bdashboard/:hash', component: BorrowerDashboardComponent },
  { path: 'bdetails/:loanid/:role', component: BorrowDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'ldashboard/:hash', component: LenderDashboardComponent },
  { path: 'ldetails/:loanid', component: LenderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
