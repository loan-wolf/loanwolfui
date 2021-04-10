import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  form: FormGroup;
  name = '0xdsahfjkhasfdas';
  email = '0xd1ahfjkhasfdas';
  passportid = '0xd1ahfjkhasfdas';
  monthlyincome: any;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      passportid: ['', Validators.required],
      monthlyincome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  verify() {
    console.log("Verification is in progress");
  }

}
