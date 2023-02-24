import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  frmRegister: FormGroup;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.frmRegister = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'dateOfBirth': new FormControl(new Date()),
      'password': new FormControl(null, Validators.required),
      'gender': new FormControl(),
    })
  }

  register() {
    this.frmRegister.value.gender = parseInt(this.frmRegister.value.gender);
    this.authService.Register(this.frmRegister.value).subscribe((x: any) => {
      this.router.navigateByUrl("/login");
    })
  }

}
