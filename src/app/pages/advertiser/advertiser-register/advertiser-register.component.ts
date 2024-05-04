import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { DriverService } from '../../../services/driver.service';
import { VehicleService } from '../../../services/vehicle.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advertiser-register',
  templateUrl: './advertiser-register.component.html',
  styleUrl: './advertiser-register.component.css',
})
export class AdvertiserRegisterComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  roleUrl: string = '';

  images: any = [];
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    middleName: new FormControl(),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    suffixName: new FormControl(''),
    dateOfBirth: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('ADVERTISER', [Validators.required]),
  });

  constructor(
    private userSrv: UserService,
    private driverSrv: DriverService,
    private vehicleSrv: VehicleService
  ) {}

  ngOnInit() {
    this.isAuthenticated();
    this.isOTPVerified();
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  isOTPVerified() {
    const otpVerified = localStorage.getItem('otpVerified');
    if (otpVerified !== null) {
      this.router.navigateByUrl('/advertiser/register');
    } else {
      this.router.navigateByUrl('/advertiser/otp-send?page=register');
    }
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/advertiser/dashboard');
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  submit() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      // here potentially add some visual feedback for a user
      console.log('Please fill all the required fields');
      this.toastr.error('Please fill all the required fields');
      return;
    }

    this.userSrv.onRegister(this.registerForm.value).subscribe(
      (userRes: any) => {
        console.log('userRes: ', userRes);

        if (userRes?.data?.user) {
          this.toastr.success('New advertiser registered successfully.');
          this.router.navigateByUrl('/advertiser/login');
        } else {
          console.error('Error registering user');
        }
      },
      (userError: any) => {
        console.error('Error registering user: ', userError);
        this.toastr.error(userError?.error?.message);
      }
    );
  }
}
