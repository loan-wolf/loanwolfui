import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      address: ['', Validators.required],
      passportid: ['', Validators.required],
      fullname: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("Into the Register component")
  }

  onSubmit() {
    if (this.form.valid) {
      try {
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        const fullname = this.form.get('fullname')?.value;
        const passportid = this.form.get('passportid')?.value;
        const address = this.form.get('address')?.value;
        this.router.navigate(['/login']);
      } catch (err) {
        
      }
    } else {

    }
  }

}
