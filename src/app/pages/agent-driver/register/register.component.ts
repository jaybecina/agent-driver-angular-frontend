import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { DriverService } from '../../../services/driver.service';
import { VehicleService } from '../../../services/vehicle.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  currentStep: number = 0;

  roleUrl: string = '';

  imagesArr: File[] = [];
  previewImages: any = [];

  registerForm = new FormGroup({
    firstName: new FormControl('test fn', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('testln', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateOfBirth: new FormControl('1991-09-12', [Validators.required]),
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
    email: new FormControl('jay+driver+image1@screenzads.com', [
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
    role: new FormControl('AGENT_DRIVER', [Validators.required]),

    // Driver Section
    dl: new FormControl('12111', [
      Validators.required,
      Validators.minLength(3),
    ]),
    ssn: new FormControl('2222', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lp: new FormControl('license plate num', [
      Validators.required,
      Validators.minLength(3),
    ]),
    driveHours: new FormControl('8', [Validators.required]),
    employedDC: new FormControl(),
    preferredLoc: new FormControl('prefloc', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateRegistered: new FormControl(new Date(), [Validators.required]),

    // Vehicle Section
    vehicleMake: new FormControl('vmake', [
      Validators.required,
      Validators.minLength(3),
    ]),
    vehicleModel: new FormControl('vmodel', [
      Validators.required,
      Validators.minLength(3),
    ]),
    vehicleYear: new FormControl('2024', [
      Validators.required,
      Validators.minLength(3),
    ]),
    images: new FormControl(null, [Validators.required]),
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

  isOTPVerified() {
    const otpVerified = localStorage.getItem('otpVerified');
    if (otpVerified !== null) {
      this.router.navigateByUrl('/agent-driver/register');
    } else {
      this.router.navigateByUrl('/agent-driver/otp-send?page=register');
    }
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/agent-driver/dashboard');
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
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

  previousStep(event: Event) {
    event.preventDefault();

    if (this.currentStep === 1) {
      console.log('previousStep');
      this.currentStep = 0;
    }

    window.scrollTo(0, 0);
  }

  nextStep(event: Event) {
    event.preventDefault();

    const isNotEmpty = this.isUserFormFieldsNotEmpty();
    const isNotPasswordEqual = this.isUserFormPasswordNotEqual();

    if (isNotPasswordEqual) {
      console.log('nextStep false');
      this.toastr.error('Password not equal to confirm password!');
      return;
    }

    if (isNotEmpty && this.currentStep === 0) {
      console.log('nextStep true');
      this.currentStep = 1;
    } else {
      console.log('nextStep false');
      this.toastr.error('Please fill all the required fields');
      return;
    }

    window.scrollTo(0, 0);
  }

  onImagesSelect(imagesData: any) {
    // Handle the image data here
    console.log('Received images from upload-images component:', imagesData);
    this.registerForm.patchValue({
      images: imagesData,
    });

    this.imagesArr = imagesData;
  }

  submit() {
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      // here potentially add some visual feedback for a user
      console.log('Please fill all the required fields');
      this.toastr.error('Please fill all the required fields');
      window.scrollTo(0, 0);
      return;
    }

    /** Upload Images merge form group data with image */
    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(this.registerForm.controls).forEach((key) => {
      const controlValue = this.registerForm.get(key)?.value;
      formData.append(key, controlValue);
    });

    console.log('submit this.imagesData: ', this.imagesArr);

    this.imagesArr.forEach((image) => {
      console.log('image: ', image);
      formData.append('imagesSource', image);
    });

    console.log('formData: ', formData);
    /** End Upload Images merge form group data with image */

    // Create user payload
    const userPayload: any = {
      firstName: formData.get('firstName'), // Extract DL from FormData or other form fields
      lastName: formData.get('lastName'),
      dateOfBirth: formData.get('dateOfBirth'),
      addressLine1: formData.get('addressLine1'),
      addressLine2: formData.get('addressLine2'),
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      zipCode: formData.get('zipCode'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      role: formData.get('role'),
    };

    this.userSrv.onRegister(userPayload).subscribe(
      (userRes: any) => {
        console.log('userRes: ', userRes);

        if (userRes?.data?.user) {
          // Create driver payload
          formData.append('userId', userRes.data.user.id);

          this.driverSrv.onCreateDriver(formData).subscribe(
            (driverRes: any) => {
              console.log('driverRes: ', driverRes);

              if (driverRes?.data?.driver) {
                const vehiclePayload: any = {
                  driverId: driverRes.data.driver.id, // Extract DL from FormData or other form fields
                  vehicleMake: formData.get('vehicleMake'),
                  vehicleModel: formData.get('vehicleModel'),
                  vehicleYear: formData.get('vehicleYear'),
                };

                this.vehicleSrv.onCreateVehicle(vehiclePayload).subscribe(
                  (vehicleRes: any) => {
                    console.log('vehicleRes: ', vehicleRes);

                    if (vehicleRes?.data?.vehicle) {
                      this.driverSrv
                        .onEmailCreatedDriver(userRes?.data?.user?.id)
                        .subscribe(
                          (emailCreatedDriverRes: any) => {
                            console.log(
                              'emailCreatedDriverRes: ',
                              emailCreatedDriverRes
                            );

                            console.log('success');
                            this.toastr.success(
                              'New agent driver registered successfully. Please check daily your email for approval of your account.'
                            );
                            this.router.navigateByUrl('/agent-driver/login');
                          },
                          (vehicleError: any) => {
                            console.error(
                              'Error registering user: ',
                              vehicleError
                            );

                            let errorMessage =
                              'An error occurred during registration.';

                            // Check if there's a custom error message from the server
                            if (vehicleError?.error?.message) {
                              errorMessage = vehicleError.error.message;
                            } else if (vehicleError?.error?.error_description) {
                              // If using OAuth or similar, error messages might be in error_description
                              errorMessage =
                                vehicleError.error.error_description;
                            }

                            this.toastr.error(errorMessage);
                          }
                        );
                    } else {
                      console.error('Error creating vehicle');
                    }
                  },
                  (vehicleError: any) => {
                    console.error('Error registering user: ', vehicleError);

                    let errorMessage = 'An error occurred during registration.';

                    // Check if there's a custom error message from the server
                    if (vehicleError?.error?.message) {
                      errorMessage = vehicleError.error.message;
                    } else if (vehicleError?.error?.error_description) {
                      // If using OAuth or similar, error messages might be in error_description
                      errorMessage = vehicleError.error.error_description;
                    }

                    this.toastr.error(errorMessage);
                  }
                );
              } else {
                console.error('Error registering driver');
              }
            },
            (driverError: any) => {
              console.error('Error registering user: ', driverError);

              let errorMessage = 'An error occurred during registration.';

              // Check if there's a custom error message from the server
              if (driverError?.error?.message) {
                errorMessage = driverError.error.message;
              } else if (driverError?.error?.error_description) {
                // If using OAuth or similar, error messages might be in error_description
                errorMessage = driverError.error.error_description;
              }

              this.toastr.error(errorMessage);
            }
          );
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
