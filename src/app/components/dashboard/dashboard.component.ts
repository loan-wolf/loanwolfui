import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  displayedColumns: string[] = ['loanId', 'amount', 'duration', 'collateral', 'score', 'getdetails'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRecord(element: any) {
    console.log("Details", element);
  }

}

/* Static data */
export interface PeriodicElement {
  amount: string;
  loanId: number;
  duration: number;
  collateral: string;
  score?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { loanId: 1, amount: '10eth', duration: 12, collateral: '1000link', score:'1' },
  { loanId: 2, amount: '5eth', duration: 4.0026, collateral: '100band',score:'3' },
  { loanId: 3, amount: '2eth', duration: 6.941, collateral: '100link',score:'4' },
  { loanId: 4, amount: '7.5eth', duration: 9.0122, collateral: '10link',score:'9' },
  { loanId: 5, amount: '1eth', duration: 10.811, collateral: '10link',score:'10' },
  { loanId: 6, amount: '12eth', duration: 12.0107, collateral: '10link',score:'5' },
  { loanId: 7, amount: '5eth', duration: 14.0067, collateral: '10link',score:'0' },
  { loanId: 8, amount: '9eth', duration: 15.9994, collateral: '10link',score:'12' },
  { loanId: 9, amount: '9eth', duration: 18.9984, collateral: '10link',score:'7' },
  { loanId: 10, amount: '9eth', duration: 40.078, collateral: '10link',score:'8' },
];

