import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  address: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private sharedService: SharedService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      address: ['', Validators.required],
      passportid: ['', Validators.required],
      fullname: ['', Validators.required],
      collateraltoken: [''],
      loanduration: ['', Validators.required],
      collateralamount: [''],
      loanamount: [''],
      monthlysalary: ['', Validators.required],
      monthlyspendings: ['', Validators.required],
      paymentcontractaddress: ['', Validators.required],
      ethaddress: ['']
    });
  }

  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(address => (this.address = address));
  }

  onSubmit() {
    if (this.form.valid) {
      try {
        const email = this.form.get('email')?.value;
        const collateraltoken = this.form.get('collateraltoken')?.value;
        const fullname = this.form.get('fullname')?.value;
        const passportid = this.form.get('passportid')?.value;
        const address = this.form.get('address')?.value;
        const collateralamount = this.form.get('collateralamount')?.value;
        const monthlysalary = this.form.get('monthlysalary')?.value;
        const monthlyspendings = this.form.get('monthlyspendings')?.value;
        const paymentcontractaddress = this.form.get('paymentcontractaddress')?.value;
        const ethaddress = this.form.get('ethaddress')?.value;
        this.router.navigate(['/dashboard']);
      } catch (err) {

      }
    } else {

    }
  }


}
