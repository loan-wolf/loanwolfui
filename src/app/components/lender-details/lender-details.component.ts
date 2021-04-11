import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowService } from 'src/app/services/borrow/borrow.service';
import { LenderService } from 'src/app/services/lender/lender.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lender-details',
  templateUrl: './lender-details.component.html',
  styleUrls: ['./lender-details.component.css']
})
export class LenderDetailsComponent {
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
  approvalStatus: any;
  lendererc20address: any;
  collateralamount: any;
  accruedinterest: any;


  constructor(private lenderService: LenderService, private route: ActivatedRoute, private router: Router, private sharedService: SharedService) {
    this.sharedService.currentMessage.subscribe(address => (this.lendererc20address = address));
    this.loanid = this.route.snapshot.paramMap.get('loanid');
    this.role = this.route.snapshot.paramMap.get('role');
    this.lenderService.getLendedDetails(this.loanid).then((val: any) => {
      this.loanamount = val.loanamount;
      this.duration = val.duration;
      this.collateral = val.collateraltoken;
      this.collateralamount = val.collateralamount;
      this.installmentinterval = val.installmentinterval;
      this.installments = val.installments;
      this.approvalStatus = val.isapproved;
      this.accruedinterest = val.accruedinterest;
    });
  }
}
