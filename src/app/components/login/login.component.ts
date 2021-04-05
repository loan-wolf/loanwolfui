import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    console.log("Into the Login component")
  }

  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("Form", this.form);
    if (this.form.valid) {
      try {
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        this.router.navigate(['/home']);
      } catch (err) {
      }
    } else {

    }
  }

}
