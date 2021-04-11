import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowService } from 'src/app/services/borrow/borrow.service';
import { LenderService } from 'src/app/services/lender/lender.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.css']
})
export class LenderDashboardComponent implements OnInit {

  erc20address: any;
  data: any;
  ELEMENT_DATA: any;
  displayedColumns: string[];
  dataSource: any;
  constructor(private lenderService: LenderService, private route: ActivatedRoute, private router: Router) {
    this.erc20address = this.route.snapshot.paramMap.get('hash');
    this.displayedColumns = ['loanid', 'loanamount', 'duration', 'collateraltoken', 'collateralamount', 'getdetails'];
    this.data = this.lenderService.getAllLendedLoans(this.erc20address).then(val => {
      this.ELEMENT_DATA = val;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });

  }

  ngOnInit(): void {
  }

  getRecord(element: any) {
    console.log("Details", element);
    this.router.navigate(['/ldetails', element.loanid]);
  }

}
