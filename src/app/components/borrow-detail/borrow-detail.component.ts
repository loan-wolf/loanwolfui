import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowService } from 'src/app/services/borrow/borrow.service';

@Component({
  selector: 'app-borrow-detail',
  templateUrl: './borrow-detail.component.html',
  styleUrls: ['./borrow-detail.component.css']
})
export class BorrowDetailComponent implements OnInit {
  loanid: any;
  loanamount: any;
  duration: any;
  collateral: any;
  installmentinterval: any;
  installments: any;
  apr: any;
  score: any;
  repaidprincipal: any;
  outstandingprincipal: any;
  role: string | null;


  constructor(private borrowService: BorrowService, private route: ActivatedRoute, private router: Router) {
    this.loanid = this.route.snapshot.paramMap.get('loanid');
    this.role = this.route.snapshot.paramMap.get('role');
    this.borrowService.getLoan(this.loanid).then((val: any) => {
      this.loanamount = val[0].loanamount;
      this.duration = val[0].duration;
      this.collateral = val[0].collateraltoken;
      this.installmentinterval = val[0].installmentinterval;
      this.installments = val[0].installments;
    });
    this.apr = '10%';
    this.score = 10;
  }

  ngOnInit(): void {
  }

}
