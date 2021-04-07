import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowService } from 'src/app/services/borrow/borrow.service';
import { SharedService } from 'src/app/services/shared.service';
import Web3 from 'web3';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  address: any;
  form: FormGroup;
  loanWolfSCAbi: any;
  tokens = ['ETH', 'LINK', 'DAI', 'USDT', 'USDC', 'DAI']
  email: any;
  collateralamount: any;
  collateraltoken: any;
  fullname: any;
  passportid: any;
  monthlysalary: any;
  monthlyspendings: any;
  paymentcontractaddress: any;
  ethaddress: any;
  tokenType: any;
  loanDuration: any;
  loanAmount: any;
  erc20address: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private sharedService: SharedService,
    private router: Router, private borrowService: BorrowService) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      address: ['', Validators.required],
      passportid: ['', Validators.required],
      fullname: ['', Validators.required],
      collateraltoken: ['', Validators.required],
      loanduration: ['', Validators.required],
      collateralamount: [''],
      loanamount: ['', Validators.required],
      monthlysalary: ['', Validators.required],
      monthlyspendings: ['', Validators.required],
      paymentcontractaddress: ['', Validators.required],
      ethaddress: [''],
      tokentype: ['ETH']
    });
  }

  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(address => (this.ethaddress = address));
    // this.httpClient.get("assets/scAbis.json").subscribe((data: any) => {
    //   this.loanWolfSCAbi = data.loanWolfSCAbi;
    // })
  }

  onSubmit() {
    if (this.form.valid) {
      try {
        this.email = this.form.get('email')?.value;
        this.collateralamount = this.form.get('collateralamount')?.value;
        this.collateraltoken = this.form.get('collateraltoken')?.value;
        this.fullname = this.form.get('fullname')?.value;
        this.passportid = this.form.get('passportid')?.value;
        this.address = this.form.get('address')?.value;
        this.monthlysalary = this.form.get('monthlysalary')?.value;
        this.monthlyspendings = this.form.get('monthlyspendings')?.value;
        this.paymentcontractaddress = this.form.get('paymentcontractaddress')?.value;
        if (!this.form.get('erc20address')?.value) { this.erc20address = this.ethaddress }
        else { this.erc20address = this.form.get('erc20address')?.value; }
        this.tokenType = this.form.get('tokentype')?.value;
        this.loanDuration = this.form.get('loanduration')?.value;
        this.loanAmount = this.form.get('loanamount')?.value;

        var web3: any = new Web3(window.web3.currentProvider);
        const contractInstance = new web3.eth.Contract(this.loanWolfSCAbi, "");

      } catch (err) { }
      this.applyLoan({
        "tokentype": this.tokenType,
        "duration": this.loanDuration,
        "loanamount": this.loanAmount,
        "collateraltoken": this.collateraltoken,
        "collateralamount": this.collateralamount,
        "loanid": "loan3",
        "fullname": this.fullname,
        "email": this.email,
        "address": this.address,
        "passportid": this.passportid,
        "monthlysalary": this.monthlysalary,
        "monthlyspending": this.monthlyspendings,
        "paymentcontractaddress": this.paymentcontractaddress,
        "erc20address": this.erc20address
      })
      this.router.navigate(['/bdashboard', this.erc20address]);
    }


  }


  async applyLoan(data: any) {
    const val = await this.borrowService.createLoan(data);
  }


}
