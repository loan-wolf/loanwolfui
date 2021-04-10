import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BorrowService } from 'src/app/services/borrow/borrow.service';

@Component({
  selector: 'app-borrower-dashboard',
  templateUrl: './borrower-dashboard.component.html',
  styleUrls: ['./borrower-dashboard.component.css']
})
export class BorrowerDashboardComponent implements OnInit {
  erc20address: any;
  data: any;
  ELEMENT_DATA: any;
  displayedColumns: string[];
  dataSource: any;
  constructor(private borrowService: BorrowService, private route: ActivatedRoute, private router: Router) {
    this.erc20address = this.route.snapshot.paramMap.get('hash');
    console.log("Jaisa", this.erc20address);
    this.displayedColumns = ['loanid', 'loanamount', 'duration', 'collateraltoken', 'score', 'apr', 'getdetails'];
    this.data = this.borrowService.getAllLoans(this.erc20address).then(val => {
      this.ELEMENT_DATA = val;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });

  }


  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;



  ngOnInit() {

  }


  getRecord(element: any) {
    console.log("Details", element);
    this.router.navigate(['/bdetails', element.loanid,'borrower']);
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




