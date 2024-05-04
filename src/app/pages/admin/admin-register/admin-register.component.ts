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
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css',
})
export class AdminRegisterComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  roleUrl: string = '';

  images: any = [];
  registerForm = new FormGroup({
    firstName: new FormControl('test fn', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('testln', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateOfBirth: new FormControl('1993-09-12', [Validators.required]),
    addressLine1: new FormControl('addr 1', [Validators.required]),
    addressLine2: new FormControl(''),
    city: new FormControl('city', [
      Validators.required,
      Validators.minLength(3),
    ]),
    state: new FormControl('state', [
      Validators.required,
      Validators.minLength(3),
    ]),
    country: new FormControl('country', [
      Validators.required,
      Validators.minLength(3),
    ]),
    zipCode: new FormControl('zipCode', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('admin+1@screenzads.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('ADMIN', [Validators.required]),
  });

  constructor(
    private userSrv: UserService,
    private driverSrv: DriverService,
    private vehicleSrv: VehicleService
  ) {}

  ngOnInit() {
    this.isAuthenticated();
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  isUserFormFieldsNotEmpty(): boolean {
    const controls = this.registerForm.controls;
    // Check if all form fields from 'firstName' to 'role' are not empty
    return (
      controls['firstName'].value !== '' &&
      controls['lastName'].value !== '' &&
      controls['dateOfBirth'].value !== '' &&
      controls['addressLine1'].value !== '' &&
      controls['city'].value !== '' &&
      controls['state'].value !== '' &&
      controls['country'].value !== '' &&
      controls['zipCode'].value !== '' &&
      controls['email'].value !== '' &&
      controls['password'].value !== '' &&
      controls['confirmPassword'].value !== '' &&
      controls['role'].value !== ''
    );
  }

  isUserFormPasswordNotEqual(): boolean {
    const controls = this.registerForm.controls;
    // Check if all form fields from 'firstName' to 'role' are not empty
    return controls['password'].value !== controls['confirmPassword'].value;
  }

  submit() {
    console.log(this.registerForm.value);

    const isNotEmpty = this.isUserFormFieldsNotEmpty();
    const isNotPasswordEqual = this.isUserFormPasswordNotEqual();

    if (isNotPasswordEqual) {
      console.log('isNotPasswordEqual');
      this.toastr.error('Password not equal to confirm password!');
      window.scrollTo(0, 0);
      return;
    }

    if (!isNotEmpty) {
      console.log('!isNotEmpty');
      this.toastr.error('Please fill all the required fields');
      window.scrollTo(0, 0);
      return;
    }

    if (this.registerForm.invalid) {
      // here potentially add some visual feedback for a user
      console.log('Please fill all the required fields');
      this.toastr.error('Please fill all the required fields');
      window.scrollTo(0, 0);
      return;
    }

    this.userSrv.onRegister(this.registerForm.value).subscribe(
      (userRes: any) => {
        console.log('userRes: ', userRes);

        if (userRes?.data?.user) {
          this.toastr.success('New admin registered successfully');
          this.router.navigateByUrl('/admin/login');
        } else {
          console.error('Error registering user');
        }
      },
      (userError: any) => {
        console.error('Error registering user: ', userError);

        let errorMessage = 'An error occurred during registration.';

        // Check if there's a custom error message from the server
        if (userError?.error?.message) {
          errorMessage = userError.error.message;
        } else if (userError?.error?.error_description) {
          // If using OAuth or similar, error messages might be in error_description
          errorMessage = userError.error.error_description;
        }

        this.toastr.error(errorMessage);
      }
    );

    window.scrollTo(0, 0);
  }
}
