import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowService } from 'src/app/services/borrow/borrow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  data: any;
  ELEMENT_DATA: any;
  displayedColumns: string[];
  dataSource: any;

  constructor(private borrowService: BorrowService, private route: ActivatedRoute, private router: Router) {
    this.displayedColumns = ['loanid', 'loanamount', 'duration', 'collateraltoken', 'score', 'apr', 'getdetails'];
    this.data = this.borrowService.getUnApprovedLoans().then(val => {
      this.ELEMENT_DATA = val;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  ngOnInit() {

  }

  getRecord(element: any) {
    console.log("Details", element);
    this.router.navigate(['/bdetails', element.loanid,'lender']);
  }

}

/* Static data */
export interface PeriodicElement {
  loanamount: string;
  loanid: string;
  duration: number;
  collateraltoken: string;
  collateralamount?: number;
  score?: string;
}


